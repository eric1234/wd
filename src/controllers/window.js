import { BrowserWindow, ipcMain as ipc, screen } from 'electron'

export default class extends BrowserWindow {
  constructor(options={}) {
    // Center is broken on Linux. Hack as a workaround.
    // https://github.com/electron/electron/issues/3490#issuecomment-255568418
    if( options['center'] ) {
      options['center'] = null
      if( !options['width'] ) options['width'] = 800;
      if( !options['height'] ) options['height'] = 600;
      let bounds = screen.getPrimaryDisplay().bounds;
      options['x'] = bounds.x + ((bounds.width - options['width']) / 2);
      options['y'] = bounds.y + ((bounds.height - options['height']) / 2);
    }

    super(options)

    ipc.once(`window:rendered:${this.id}`, () => this.initialize() )
    this.webContents.on('did-finish-load', event => {
      this.webContents.send('window:render', options['view'])
    })
    this.loadURL(`file://${__dirname}/../views/window.html`)
  }

  initialize() {}

  receive(event, handler) {
    ipc.on(event, (event, ...args) => handler.bind(this)(...args))
  }

  setState(state) {
    this.webContents.send('window:set-state', state)
  }
}
