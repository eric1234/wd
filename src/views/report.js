import Window from './window'
import React from 'react'

export default class extends Window {
  constructor(props) {
    super(props);
    this.state = {events: {}, has_prev: false, has_next: false}
  }

  render() {
    let list = Object.entries(this.state.events).map(([activity, duration]) => {
      duration = this.humanize_duration(duration)
      return [
        <dt>{activity}</dt>,
        <dd>{duration}</dd>
      ]
    })
    return (
      <main>
        <h1>{this.state.date}</h1>
        <nav>
          <a href="#" onClick={()=> this.go(-1)}>Prev</a>
          {this.state.has_next &&
            <a href="#" onClick={()=> this.go(1)}>Next</a>
          }
        </nav>
        <dl>{list}</dl>
      </main>
    )
  }

  go(offset) {
    event.preventDefault()
    this.send('report:go', offset)
  }

  humanize_duration(seconds) {
    let dt=new Date(seconds * 1000);
    return dt.getUTCHours()+" hours, "+dt.getUTCMinutes()+" minutes and "+dt.getUTCSeconds()+" second(s)"
  }
}
