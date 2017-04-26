import { app, ipcMain as ipc } from 'electron'
import Window from './window'

let quit_app = false;
app.on('before-quit', () => quit_app = true);

class Prompt extends Window {
  constructor() {
    super({
      path: './prompt_ui',
      width: 600, height: 70,
      title: 'Whatcha Doing?',
      show: false,
      backgroundColor: '#F1EEF2',
      icon: `${__dirname}/icon.png`,
    })
    this.setMenu(null)
    this.on('loaded', () => this.ask())
    this.on('close', (event) => {
      if( !quit_app ) {
        event.preventDefault();
        prompt.hide();
      }
    });

    ipc.on('prompt:idle-cancel', () => {
      if( this.idle_timer ) {
        clearTimeout(this.idle_timer)
        this.idle_timer = null
      }
    })
  }

  ask() {
    this.show()
    this.idle_timer = setTimeout(() => this.webContents.send('prompt:idle'), 60*1000)
  }
}

export let prompt
app.on('ready', () => prompt = new Prompt())
