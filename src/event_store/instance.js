import { remote } from 'electron'
import EventStore from '../event_store'

export let event_store = null
let path = `${remote.app.getPath('userData')}/events.db`
event_store = new EventStore(path)
