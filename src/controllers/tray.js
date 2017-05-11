// NOTE: This module export any variable. Just importing it will activate the
// single instance which is entirely self-managed

import { Menu, Tray, app } from 'electron'
import { prompt } from './prompt'
import Report from './report'

// Builds tray object
function build() {
  let tray = new Tray(`${__dirname}/../icon.png`)
  tray.on('click', () => prompt.ask())
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Update', click: () => prompt.ask() },
    { label: 'Report', click: () => new Report() },
    { label: 'Exit', role: 'quit' },
  ]))
  return tray
}

// When app is loaded initialize and store outside of callback to preview GC
let tray
app.on('ready', () => tray = build())
