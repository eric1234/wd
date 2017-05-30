import { app } from 'electron'
if( require('electron-squirrel-startup') ) app.quit();

import './controllers/tray'

import { event_store } from './models/event_store'
app.on('quit', () => event_store.insert_idle())
