import { app, screen } from 'electron'
import Window from './window'
import { event_store } from '../models/event_store/instance'
import Clock from '../models/clock'

class Prompt extends Window {
  constructor() {
    const window_width = 600
    const window_height = 300

    // https://github.com/electron/electron/issues/3490#issuecomment-255568418
    let bounds = screen.getPrimaryDisplay().bounds;
    let x = bounds.x + ((bounds.width - window_width) / 2);
    let y = bounds.y + ((bounds.height - window_height) / 2);

    super({
      view: './prompt', show: false, frame: false, alwaysOnTop: true,
      x: x, y: y, width: window_width, height: window_height,
      backgroundColor: '#F1EEF2', icon: `${__dirname}/../icon.png`,
    })
    this.setMenu(null)

    this.receive('prompt:submit', this.submit)
    this.receive('prompt:suggestions', this.load_suggestions)

    this.interrupter = new Clock(15)
    this.idler = new Clock(1)
  }

  initialize() {
    event_store.last_activity().then(value => {
      this.setState({value: value})
      this.ask()
    })
  }

  ask() {
    if( this.isVisible() ) return
    this.interrupter.reset()
    this.show()
    this.idler.start(() => event_store.insert_idle())
  }

  submit(value) {
    this.idler.reset()
    this.hide()
    this.interrupter.start(() => this.ask())
    event_store.insert_activity(value)
  }

  load_suggestions(value) {
    event_store.recent(value).then(recent => {
      this.webContents.send('prompt:suggestions', recent)
    })
  }
}

export let prompt
app.on('ready', () => prompt = new Prompt())
