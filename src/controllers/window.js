import { BrowserWindow, ipcMain as ipc, screen } from 'electron'

/*
 * A window controller provides the data for and manages a on-screen window.
 * The idea is to subclass this for specific windows you wish to show.
 */
export default class {
  /*
   * Generally you want to override this contructor. Your constructor should
   * call use `super` to initialize the window as well as register any events
   * handlers that the view emits.
   *
   * The `view` is a React component that controls how the data is presented.
   * The `view_opts` directly correspond to Electron's BrowserWindow options.
   */
  constructor(view_name, view_opts={}) {
    let defaults = { 'icon': `${__dirname}/../icon.png`, 'center': true }
    view_opts = Object.assign({}, defaults, view_opts)
    this.view_name = view_name

    // Center is broken on Linux. Hack as a workaround.
    // https://github.com/electron/electron/issues/3490#issuecomment-255568418
    if( view_opts['center'] ) {
      view_opts['center'] = null
      if( !view_opts['width'] ) view_opts['width'] = 800;
      if( !view_opts['height'] ) view_opts['height'] = 600;
      let bounds = screen.getPrimaryDisplay().bounds;
      view_opts['x'] = bounds.x + ((bounds.width - view_opts['width']) / 2);
      view_opts['y'] = bounds.y + ((bounds.height - view_opts['height']) / 2);
    }

    this.view = new BrowserWindow(view_opts)
    this.view.setMenu(null) // No window uses this. May make it optional later

    ipc.once(`window:rendered:${this.view.id}`, () => this.ready())
    this.view.webContents.on('did-finish-load', event => {
      this.view.webContents.send('window:render', this.view_name)
    })
    this.view.loadURL(`file://${__dirname}/../views/window.html`)
  }

  /*
   * A callback once the view has been loaded. This will allow you to pull data
   * and assign it to the view via `set_state`.
   */
  ready() {}

  /*
   * The view will emit events based to have the controller update the data
   * in the view. This allows the controller to indicate the events it can
   * handle. If the event is emitted a method by the same name in this object
   * will handle the event.
   *
   * This is usually called in the subclass constructor to initalize the event
   * handlers. Multiple events can be registered in one call.
   */
  handle(...events) {
    events.forEach((event) => {
      ipc.on(`${this.view_name}:${event}`, (e, ...args) => this[`on_${event}`](...args))
    })
  }

  /*
   * Generally the controller uses `set_state` to update the view with new data,
   * but if you need to communicate outside of the normal React flow to the view
   * this allows you to send an arbitrary message.
   */
  send(event, ...args) { this.view.webContents.send(`${this.view_name}:${event}`, ...args) }

  // Updates the React state with the provided data which will update the view
  set_state(state) { this.view.webContents.send('window:set-state', state) }
}
