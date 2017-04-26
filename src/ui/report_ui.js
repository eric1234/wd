import { event_store } from '../event_store/instance'
import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {events: []}
    event_store.events_for(new Date()).then(events => this.setState({events: events}))
  }

  render() {
    let list = this.state.events.map(event => <li>{event['value']} - {event['created_at'].toString()}</li>)
    return <ul>{list}</ul>
  }
}
