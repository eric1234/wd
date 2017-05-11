import { app } from 'electron'
import Window from './window'
import { event_store } from '../models/event_store'
import Clock from '../models/clock'

class Prompt extends Window {
  constructor() {
    super('prompt', {
      show: false, frame: false,
      width: 600, height: 300,
      backgroundColor: '#F1EEF2'
    })

    this.handle('submit', 'suggestions')

    this.interrupter = new Clock(15)
    this.idler = new Clock(1)
  }

  // Load last activity so user can simply accept
  ready() {
    event_store.last_activity().then(value => {
      this.set_state({value: value})
      this.ask()
    })
  }

  // Public interface for another part of program to request current activity
  ask() {
    if( this.view.isVisible() ) return
    this.interrupter.reset()
    this.view.show()
    this.idler.start(() => event_store.insert_idle())
  }

  // Callback when user submits activity. Send to data store and reset clocks
  on_submit(value) {
    this.idler.reset()
    this.view.hide()
    this.interrupter.start(() => this.ask())
    event_store.insert_activity(value)
  }

  // Callback when view needs suggestions from the user. Pull from data store
  on_suggestions(value) {
    event_store.recent(value).then(recent => {
      this.send('suggestions', recent)
    })
  }
}

// Singleton instance for rest of app to access
export let prompt
app.on('ready', () => prompt = new Prompt())
