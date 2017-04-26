import { app, ipcMain as ipc } from 'electron'
import Window from './window'

export default class extends Window {
  constructor() {
    super({
      path: './report_ui',
      title: 'Time Spent',
      backgroundColor: '#F1EEF2',
      icon: `${__dirname}/icon.png`,
    })
    this.setMenu(null)
  }
}
