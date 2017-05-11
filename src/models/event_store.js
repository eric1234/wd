import Storage from 'nedb'

/*
 * Provides access to insert and query the data store for activity events.
 * An abstraction over nedb to hide the storage implementation details.
 *
 * NOTE: The app uses a singleton instance of this (defined below). The only
 * reason the class is exposed is for automated testing. I.E. the application
 * should not be creating ad-hoc instances of this model. Use the singleton
 * provided.
 */
export class EventStore {

  /*
   * Intialize an instance against the given file. The file is optional and if
   * not provided will use an in-memory database useful for testing
   */
  constructor(file=null) {
    this.storage = new Storage({filename: file, autoload: true})
    this.compact()
  }

  // Indicate the activity the user is currently doing
  insert_activity(value) {
    this.storage.insert({
      type: 'activity',
      value: value,
      created_at: new Date()
    })
  }

  // Indicates the user is now idle
  insert_idle() {
    this.storage.insert({type: 'idle', created_at: new Date()})
  }

  // Get the last activity of the user. Result returned as a promise
  last_activity() {
    return new Promise((resolve, reject) => {
      let cursor = this.storage.find({type: 'activity'}).sort({'created_at': -1}).limit(1)
      cursor.exec((err, docs) => {
        if( err )
          reject(err)
        else
          if( docs.length == 0 )
            resolve('')
          else
            resolve(docs[0]['value'])
      })
    })
  }

  // Get all events (activity and idle) for the given day. Result is a promise
  events_for(date) {
    let start = new Date(date.getTime())
    start.setHours(0, 0, 0, 0)

    let end = new Date(date.getTime())
    end.setHours(23, 59, 59, 59)

    let query = {'created_at': {'$gte': start, '$lte': end}}
    let cursor = this.storage.find(query).sort({'created_at': 1})
    return new Promise((resolve, reject) => {
      cursor.exec((err, docs) => err ? reject(err) : resolve(docs))
    })
  }

  /*
   * Get the most recent activities (5 by default) that start with the given
   * prefix. The result is a promise.
   */
  recent(prefix, limit=5) {
    // NOTE: We don't use NeDB's LIMIT as it lacks a DISTINCT operator. Since
    // We are filtering and only keep a few days of values it's ok to just load
    // them all and filter here.
    let query = {'type': 'activity', 'value': {$regex: new RegExp(`^${prefix}`)}}
    let cursor = this.storage.find(query, {'value': 1}).sort({'created_at': -1})

    return new Promise((resolve, reject) => {
      cursor.exec((err, docs) => {
        if( err ) return reject(err)

        let results = new Set()
        docs.some(doc => {
          results.add(doc['value'])
          if( results.size >= limit ) {
            resolve(Array.from(results))
            return true
          }
        })
        resolve(Array.from(results))
      })
    })
  }

  /*
   * Removes historical activity records no longer needed. This isn't used
   * explicitly in the application and is just exposed for testing purposes.
   * It is automatically called whenever the data store is loaded.
   */
  compact() {
    let old = new Date()
    old.setHours(0, 0, 0, 0)
    old.setDate(old.getDate() - 10)
    return new Promise((resolve, reject) => {
      this.storage.remove({'created_at': {'$lt': old}}, {multi: true}, (err, removed) => {
        err ? reject(err) : resolve(removed)
      })
    })
  }
}

// http://stackoverflow.com/a/26227660/120067
let data_dir =
  // Windows
  process.env.APPDATA ||
  (
    process.platform == 'darwin' ?
      // Mac
      process.env.HOME + '/Library/Preferences' :

      // Linux
      process.env.HOME + "/.local/share"
  )

// The singleton instance of the data store used by the reset of the app.
export let event_store = new EventStore(`${data_dir}/wd_events.db`)
