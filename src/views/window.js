import { ipcRenderer as ipc } from 'electron'
import React from 'react'

export default class extends React.Component {
  /*
   * A react component generally don't need access to the DOM so this method is
   * a no-op. But occasionally it is needed such as for integrating a 3rd party
   * JS library. This hook allows that integration to happen.
   */
  initialize(document) {}

  // Sends the given event to the controller with the given data
  send(event, ...args) {
    ipc.send(`${this.props.view_name}:${event}`, ...args);
  }

  /*
   * Indicates what events we can receive from the controller. Assumes a method
   * name `on_${event}` is defined to handle the event. Multiple events can
   * be passed into to register in one call.
   */
  handle(...events) {
    events.forEach((event) => {
      ipc.on(`${this.props.view_name}:${event}`, (e, ...args) => this[`on_${event}`](...args))
    })
  }

  /*
   * React often needs to execute callbacks in the context of the current
   * object. This binds a callback to the current object. Assumes the callback
   * is prefixed with `on_` but that prefix shouldn't be specified. Multiple
   * callbacks can be bound at once.
   */
  bind(...callbacks) {
    callbacks.forEach(callback => this[`on_${callback}`] = this[`on_${callback}`].bind(this))
  }
}
