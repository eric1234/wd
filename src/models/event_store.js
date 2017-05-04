import Storage from 'nedb'

export default class {
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

  has_events(date) {
    return new Promise((resolve, reject) => {
      this.events_for(date).then((events) => resolve(events.length > 0)).catch(reject)
    })
  }
}
