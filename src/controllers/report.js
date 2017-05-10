import Window from './window'
import { event_store } from '../models/event_store'
import report from '../models/report'

export default class extends Window {
  constructor() {
    super({
      view: './report', title: 'Time Spent', center: true,
      backgroundColor: '#F1EEF2', icon: `${__dirname}/icon.png`,
    })
    this.setMenu(null)
    this.receive('report:go', this.go)
  }

  initialize() {
    this.current = new Date();
    this.load()
  }

  go(offset) {
    this.current = this.date_offset(offset)
    this.load()
  }

  load() {
    event_store.events_for(this.current).then((events) => {
      let activities = report(events)
      let total_time = Object.values(activities).reduce((total, duration) => total + duration, 0)
      this.setState({
        activities: activities,
        total_time: total_time,
        date: this.current,
        has_next: !this.is_today()
      })
    })
  }

  date_offset(offset) {
    let one_day = 24 * 60 * 60 * 1000
    return new Date(this.current.getTime() + offset * one_day);
  }

  is_today() {
    let today = new Date()
    today.setHours(0,0,0,0)
    return this.current >= today
  }
}
