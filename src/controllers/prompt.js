import { app } from 'electron'
import Window from './window'
import { event_store } from '../models/event_store/instance'

// Note when the user indicates they really want to quit
let quit_app = false;
app.on('before-quit', () => quit_app = true);

class Prompt extends Window {
  constructor() {
    super({
      view: './prompt',
      width: 600, height: 70,
      title: 'Whatcha Doing?',
      show: false,
      backgroundColor: '#F1EEF2',
      icon: `${__dirname}/../icon.png`,
    })
    this.setMenu(null)

    this.on('close', (event) => this.suppress_close(event));
    this.receive('prompt:submit', this.submit);
  }

  initialize() {
    event_store.last_activity().then(value => {
      this.setState({value: value})
      this.ask()
    })
  }

  ask() {
    this.show()
    this.idle_timer = setTimeout(() => event_store.insert_idle(), 60*1000)
  }

  submit(value) {
    this.cancel_idle()
    event_store.insert_activity(value)
    this.hide()
  }

  // To keep this window fast in displaying it is always in existance. We just
  // hide it when the user asks it to be closed. Only if the user had indicated
  // they want to quit will we allow this window to be closed.
  suppress_close(event) {
    if( !quit_app ) {
      event.preventDefault()
      this.hide()
    }
  }

  cancel_idle() {
    if( this.idle_timer ) {
      clearTimeout(this.idle_timer)
      this.idle_timer = null
    }
  }
}

export let prompt
app.on('ready', () => prompt = new Prompt())
