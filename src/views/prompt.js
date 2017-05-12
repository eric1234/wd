import Window from './window'
import React from 'react'
import Awesomplete from './prompt/awesomplete'

// View component to render the prompt to the user
export default class extends Window {
  constructor(props) {
    super(props);
    this.state = {value: ''}
    this.handle('suggestions')
    this.bind('autocomplete', 'submit', 'update')
  }

  // Initialize the awesomplete library
  initialize(document) {
    let input = document.querySelector('input')
    this.suggestions = new Awesomplete(input, {autoFirst: true})
    input.addEventListener('awesomplete-selectcomplete', this.on_autocomplete)
  }

  render() {
    return (
      <main>
        <link rel="stylesheet" href="prompt/awesomplete.css" />
        <link rel="stylesheet" href="prompt.css" />
        <form onSubmit={this.on_submit} id="prompt">
          <label htmlFor="prompt">Whatcha doin?</label>
          <input type="text" value={this.state.value} onChange={this.on_update} id="prompt" />
        </form>
      </main>
    )
  }

  on_update(event) {
    this.setState({value: event.target.value})
    this.send('suggestions', this.state.value);
  }

  on_autocomplete(event) {
    this.setState({value: event.text.value})
    this.submit(event)
  }

  on_submit(event) {
    event.preventDefault()
    this.send('submit', this.state.value)
  }

  on_suggestions(suggestions) {
    this.suggestions.list = suggestions
  }
}
