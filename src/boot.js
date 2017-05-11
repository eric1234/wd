import { app } from 'electron'

import tray from './controllers/tray'
app.on('ready', tray)

import { event_store } from './models/event_store'
app.on('quit', () => event_store.insert_idle())
