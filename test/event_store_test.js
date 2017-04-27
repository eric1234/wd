import test from 'ava'
import tk from 'timekeeper'

import Db from '../src/models/event_store'

test('insert', t => {
  let db = new Db()

  tk.freeze(new Date(2017, 4, 24, 7))
  db.insert_activity('email')

  tk.freeze(new Date(2017, 4, 24, 7, 30))
  db.insert_activity('wd development')

  tk.freeze(new Date(2017, 4, 24, 11, 15))
  db.insert_idle()

  tk.freeze(new Date(2017, 4, 24, 12, 30))
  db.insert_activity('wd development')

  tk.freeze(new Date(2017, 4, 24, 16, 30))
  db.insert_idle()

  tk.reset()

  return db.events_for(new Date(2017, 4, 24)).then(events => {
    t.is(events.length, 5)

    t.is(events[0]['type'], 'activity')
    t.is(events[0]['value'], 'email')
    t.deepEqual(events[0]['created_at'], new Date(2017, 4, 24, 7))

    t.is(events[1]['type'], 'activity')
    t.is(events[1]['value'], 'wd development')
    t.deepEqual(events[1]['created_at'], new Date(2017, 4, 24, 7, 30))

    t.is(events[2]['type'], 'idle')
    t.deepEqual(events[2]['created_at'], new Date(2017, 4, 24, 11, 15))

    t.is(events[3]['type'], 'activity')
    t.is(events[3]['value'], 'wd development')
    t.deepEqual(events[3]['created_at'], new Date(2017, 4, 24, 12, 30))

    t.is(events[4]['type'], 'idle')
    t.deepEqual(events[4]['created_at'], new Date(2017, 4, 24, 16, 30))
  })
})

test('last activity is empty string if no activity', t => {
  let db = new Db()

  return db.last_activity().then(activity => {
    t.is(activity, '')
  })
})

test('last activity is most recent item if activity', t => {
  let db = new Db()

  tk.freeze(new Date(2017, 4, 22, 7))
  db.insert_activity('email')

  tk.freeze(new Date(2017, 4, 23, 7))
  db.insert_activity('wd development')

  return db.last_activity().then(activity => {
    t.is(activity, 'wd development')
  })
})

test('activity retrieval', t => {
  let db = new Db()

  tk.freeze(new Date(2017, 4, 22, 7))
  db.insert_activity('email')

  tk.freeze(new Date(2017, 4, 23, 7))
  db.insert_activity('wd development')

  tk.freeze(new Date(2017, 4, 24, 7))
  db.insert_activity('cat videos')

  return db.events_for(new Date(2017, 4, 23)).then(events => {
    t.is(events.length, 1)

    t.is(events[0]['type'], 'activity')
    t.is(events[0]['value'], 'wd development')
    t.deepEqual(events[0]['created_at'], new Date(2017, 4, 23, 7))
  });
})
