import test from 'ava'
import tk from 'timekeeper'
import report from '../src/models/report'

test('creating sessions from events', t => {
  let events = [
    {type: 'activity', value: 'email', created_at: new Date(2017, 4, 27, 9)},
    {type: 'activity', value: 'meeting', created_at: new Date(2017, 4, 27, 10)},
    {type: 'idle', created_at: new Date(2017, 4, 27, 11, 30)},
  ]
  t.deepEqual(report(events), {email: 3600, meeting: 5400})
})

test('merge multiple sessions of the same activity', t => {
  let events = [
    {type: 'activity', value: 'email', created_at: new Date(2017, 4, 27, 9)},
    {type: 'activity', value: 'email', created_at: new Date(2017, 4, 27, 10)},
    {type: 'idle', created_at: new Date(2017, 4, 27, 11, 30)},
  ]
  t.is(report(events)['email'], 9000)
})

test('skips time due to idle', t => {
  let events = [
    {type: 'activity', value: 'email', created_at: new Date(2017, 4, 27, 9)},
    {type: 'idle', created_at: new Date(2017, 4, 27, 9, 30)},
    {type: 'activity', value: 'meeting', created_at: new Date(2017, 4, 27, 10)},
    {type: 'idle', created_at: new Date(2017, 4, 27, 11, 30)},
  ]
  t.deepEqual(report(events), {email: 1800, meeting: 5400})
})

test('can handle idle start', t => {
  let events = [
    {type: 'idle', created_at: new Date(2017, 4, 27, 8)},
    {type: 'activity', value: 'email', created_at: new Date(2017, 4, 27, 9)},
    {type: 'idle', created_at: new Date(2017, 4, 27, 10)},
  ]
  t.deepEqual(report(events), {email: 3600})
})

test('lack of ending idle makes last event 0 time but still there if past date', t => {
  let events = [
    {type: 'activity', value: 'email', created_at: new Date(2017, 4, 26, 9)},
    {type: 'activity', value: 'meeting', created_at: new Date(2017, 4, 26, 10)},
  ]
  t.deepEqual(report(events), {email: 3600, meeting: 0})
})

test('lack of ending idle makes last event time now if current date', t => {
  tk.freeze(new Date(2017, 4, 27, 12))
  let events = [
    {type: 'activity', value: 'email', created_at: new Date(2017, 4, 27, 9)},
    {type: 'activity', value: 'meeting', created_at: new Date(2017, 4, 27, 10)},
  ]
  t.deepEqual(report(events), {email: 3600, meeting: 7200})
  tk.reset()
})
