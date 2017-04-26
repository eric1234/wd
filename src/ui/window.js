import { BrowserWindow } from 'electron'

export default class extends BrowserWindow {
  constructor(options={}) {
    super(options)

    this.webContents.on('did-finish-load', (event) => {
      let script = `render('${options['path']}')`
      this.webContents.executeJavaScript(script).then(() => { this.emit('loaded') })
    })
    this.loadURL(`file://${__dirname}/container.html`)
  }
}
