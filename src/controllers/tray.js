import { Menu, Tray } from 'electron'
import { prompt } from './prompt'
import Report from './report'

/*
 * Construct a tray icon which then become the launch point for the rest of the
 * application. Expected to only be called once during boot.
 */
export default function() {
  let tray = new Tray(`${__dirname}/../icon.png`)
  tray.on('click', () => prompt.ask())
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Update', click: () => prompt.ask() },
    { label: 'Report', click: () => new Report() },
    { label: 'Exit', role: 'quit' },
  ]))
}
