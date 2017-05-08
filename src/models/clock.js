const minutes = 60*1000

export default class {
  constructor(minutes) {
    this.interval = minutes * 60 * 1000
  }

  start(when_complete) {
    this.reset()
    this.timer = setTimeout(when_complete, this.interval)
  }

  reset() {
    if( this.timer ) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
