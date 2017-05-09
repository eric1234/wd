import Storage from 'nedb'

export class EventStore {
  constructor(file=null) {
    this.storage = new Storage({
      filename: file,
      autoload: true
    })
  }

  insert_activity(value) {
    this.storage.insert({
      type: 'activity',
      value: value,
      created_at: new Date()
    })
  }

  insert_idle() {
    this.storage.insert({type: 'idle', created_at: new Date()})
  }

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

export let event_store = new EventStore(`${data_dir}/wd_events.db`)
