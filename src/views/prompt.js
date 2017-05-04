import Window from './window'
import React from 'react'

export default class extends Window {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }

  styles = {
    fontSize: '200%',
    display: 'block',
    width: '100%',
  }

  render() {
    return (
      <form onSubmit={event => this.submit(event)} id="prompt">
        <input type="text" value={this.state.value} onChange={event => this.update(event)} style={this.styles} />
      </form>
    )
  }

  update(event) {
    this.setState({value: event.target.value})
  }

  submit(event) {
    event.preventDefault()
    this.send('prompt:submit', this.state.value)
  }
}
