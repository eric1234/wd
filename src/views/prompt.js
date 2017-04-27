import { ipcRenderer as ipc } from 'electron'
import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''}

    this.update = this.update.bind(this)
    this.submit = this.submit.bind(this)
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
    ipc.send('prompt:submit', this.state.value)
  }
}
