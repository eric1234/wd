import { app, ipcMain as ipc } from 'electron'
import Window from './window'
import { event_store } from '../models/event_store/instance'
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
  }

  initialize() {
    event_store.events_for(new Date()).then(events => this.setState({events: report(events)}))
  }
}
