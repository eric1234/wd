import Window from './window'
import { event_store } from '../models/event_store'
import report from '../models/report'

// A window to show a report of time spent
export default class extends Window {
  // Builds a new window to show the time
  constructor() {
    super('report', { title: 'Time Spent', backgroundColor: 'white' })
    this.handle('go')
  }

  // Initialize to today and load the data
  ready() {
    this.current = new Date();
    this._load()
  }

  // The view has requested we move by the given offset. Reconfigure and load
  // the new data.
  on_go(offset) {
    this.current = this._date_offset(offset)
    this._load()
  }

  _load() {
    event_store.events_for(this.current).then((events) => {
      let activities = report(events)
      let total_time = Object.values(activities).reduce((total, duration) => total + duration, 0)
      this.set_state({
        activities: activities,
        total_time: total_time,
        date: this.current,
        has_next: !this._is_today()
      })
    })
  }

  _date_offset(offset) {
    let one_day = 24 * 60 * 60 * 1000
    return new Date(this.current.getTime() + offset * one_day);
  }

  _is_today() {
    let today = new Date()
    today.setHours(0,0,0,0)
    return this.current >= today
  }
}
