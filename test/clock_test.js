import test from 'ava'
import Clock from '../src/models/clock'

// To keep test fast have the timer be a 1/10th of a second
test.beforeEach(t => t.context.clock = new Clock(1/60/10));

test.cb('it will call callback when complete', (t) => {
  let start = new Date()
  t.context.clock.start(() => {
    let finish = new Date()
    t.true(finish - start >= 100)
    t.end()
  })
})

test.cb('it will cancel previous callback if new clock started', (t) => {
  let callbacks_run = 0
  t.context.clock.start(() => callbacks_run++)
  t.context.clock.start(() => callbacks_run++)
  setTimeout(() => {
    t.is(callbacks_run, 1)
    t.end()
  }, 300)
})

test.cb('it can cancel callback before it times out', (t) => {
  let callbacks_run = 0
  t.context.clock.start(() => callbacks_run++)
  t.context.clock.reset()
  setTimeout(() => {
    t.is(callbacks_run, 0)
    t.end()
  }, 300)
})
