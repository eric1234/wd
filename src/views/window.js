import { ipcRenderer as ipc } from 'electron'
import React from 'react'

export default class extends React.Component {
  initialize(document) {}

  send(event, ...args) {
    ipc.send(event, ...args);
  }
}
