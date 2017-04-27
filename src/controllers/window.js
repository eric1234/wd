import { BrowserWindow, ipcMain as ipc } from 'electron'

export default class extends BrowserWindow {
  constructor(options={}) {
    super(options)

    ipc.once(`window:rendered:${this.id}`, () => this.initialize() )
    this.webContents.on('did-finish-load', event => {
      this.webContents.send('window:render', options['view'])
    })
    this.loadURL(`file://${__dirname}/window.html`)
  }

  initialize() {}

  setState(state) {
    this.webContents.send('window:set-state', state)
  }
}
