const minutes = 60*1000

/*
 * Basically an OO-wrapper for `setTimeout`. Is designed to prevent overlapping
 * timers on the same clock instance and easy canceling of a timer
 */
export default class {
  /*
   * Constructs a timer clock for a specific purpose. Operates on minutes
   * instead of ms as that is the time scale this app operates in. Helps avoid
   * a bit of math elsewhere
   */
  constructor(minutes) { this.interval = minutes * 60 * 1000 }

  /*
   * Starts the clock timer. When it goes off the given callback is executed.
   * If the timer had a previous callback pending that is cancelled to prevent
   * overlapping timers around the same purpose.
   */
  start(when_complete) {
    this.reset()
    this.timer = setTimeout(when_complete, this.interval)
  }

  /*
   * Stops any existing pending callback if registered. If not is a no-op so
   * safe to call.
   */
  reset() {
    if( this.timer ) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
