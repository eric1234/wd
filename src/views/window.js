import { ipcRenderer as ipc } from 'electron'
import React from 'react'

export default class extends React.Component {
  send(event, ...args) {
    ipc.send(event, ...args);
  }
}
