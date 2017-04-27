import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {events: []}
  }

  render() {
    let list = this.state.events.map(event => <li>{event['value']} - {event['created_at'].toString()}</li>)
    return <ul>{list}</ul>
  }
}
