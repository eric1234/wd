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
  }

  styles = {
    fontSize: '200%',
    display: 'block',
    width: '100%',
  }

  render() {
    return (
      <main>
        <link rel="stylesheet" href="prompt/awesomplete.css" />
        <style dangerouslySetInnerHTML={{__html: `.awesomplete { display: block }`}} />
        <form onSubmit={event => this.submit(event)} id="prompt">
          <input type="text" value={this.state.value} onChange={event => this.update(event)} style={this.styles} />
        </form>
      </main>
    )
  }

  update(event) {
    this.setState({value: event.target.value})
    this.send('prompt:suggestions', this.state.value);
  }

  submit(event) {
    event.preventDefault()
    this.send('prompt:submit', this.state.value)
  }
}
