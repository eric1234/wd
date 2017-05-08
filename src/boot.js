import './controllers/tray'

import { app } from 'electron'
import { event_store } from './models/event_store'
app.on('quit', () => event_store.insert_idle())
