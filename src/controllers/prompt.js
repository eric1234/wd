import { app } from 'electron'
import Window from './window'
import { event_store } from '../models/event_store'
import Clock from '../models/clock'

class Prompt extends Window {
  constructor() {
    super({
      view: './prompt', show: false, frame: false, alwaysOnTop: true,
      center: true, width: 600, height: 300, backgroundColor: '#F1EEF2',
      icon: `${__dirname}/../icon.png`,
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
