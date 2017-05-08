import { app, Menu, Tray } from 'electron'
import { prompt } from './prompt'
import Report from './report'

class _Tray extends Tray {
  constructor() {
    super(`${__dirname}/../icon.png`)
    this.on('click', () => prompt.ask())
    this.setContextMenu(Menu.buildFromTemplate([
      { label: 'Update', click: () => prompt.ask() },
      { label: 'Report', click: () => new Report() },
      { label: 'Exit', role: 'quit' },
    ]))
  }
}

export let tray
app.on('ready', () => tray = new _Tray())
