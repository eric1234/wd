import Window from './window'
import React from 'react'
import Awesomplete from './prompt/awesomplete'
import { ipcRenderer as ipc } from 'electron'

export default class extends Window {
  constructor(props) {
    super(props);
    this.state = {value: ''}
    ipc.on('prompt:suggestions', (event, suggestions) => this.suggestions.list = suggestions)
  }

  initialize(document) {
    let input = document.querySelector('input')
    this.suggestions = new Awesomplete(input, {autoFirst: true})
    input.addEventListener('awesomplete-selectcomplete', event => this.autocomplete(event))
  }

  render() {
    return (
      <main>
        <link rel="stylesheet" href="prompt/awesomplete.css" />
        <link rel="stylesheet" href="prompt.css" />
        <form onSubmit={event => this.submit(event)} id="prompt">
          <label htmlFor="prompt">Whatcha doin?</label>
          <input type="text" value={this.state.value} onChange={event => this.update(event)} id="prompt" />
        </form>
      </main>
    )
  }

  update(event) {
    this.setState({value: event.target.value})
    this.send('prompt:suggestions', this.state.value);
  }

  autocomplete(event) {
    this.setState({value: event.text.value})
    this.submit(event)
  }

  submit(event) {
    event.preventDefault()
    this.send('prompt:submit', this.state.value)
  }
}
