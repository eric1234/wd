import { remote, ipcRenderer as ipc } from 'electron'
import { event_store } from '../event_store/instance'
import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''}
    event_store.last_activity().then(value => this.setState({value: value}))

    this.update = this.update.bind(this)
    this.submit = this.submit.bind(this)

    ipc.on('prompt:idle', () => this.idle() )
  }

  styles = {
    fontSize: '200%',
    display: 'block',
    width: '100%',
  }

  render() {
    return (
      <form onSubmit={this.submit} id="prompt">
        <input type="text" value={this.state.value} onChange={this.update} style={this.styles} />
      </form>
    )
  }

  update(event) {
    this.setState({value: event.target.value})
  }

  submit(event) {
    event.preventDefault()
    ipc.send('prompt:idle-cancel')
    event_store.insert_activity(this.state.value)
    remote.getCurrentWindow().hide()
  }

  idle() {
    event_store.insert_idle()
  }
}
