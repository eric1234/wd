import Window from './window'
import { event_store } from '../models/event_store'
import report from '../models/report'

export default class extends Window {
  constructor() {
    super({
      view: './report',
      title: 'Time Spent',
      backgroundColor: '#F1EEF2',
      icon: `${__dirname}/icon.png`,
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
    let today = new Date();
    today.setHours(0,0,0,0)
    event_store.events_for(this.current).then((events_today) => {
      this.setState({
        events: report(events_today),
        date: this.current,
        has_next: this.current < today
      })
    })
  }

  date_offset(offset) {
    let one_day = 24 * 60 * 60 * 1000
    return new Date(this.current.getTime() + offset * one_day);
  }
}
