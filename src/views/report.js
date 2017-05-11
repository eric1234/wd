import Window from './window'
import React from 'react'

// View component to render the report ot the user
export default class extends Window {
  constructor(props) {
    super(props);
    this.state = {activities: {}, has_prev: false, has_next: false, date: new Date()}
  }

  render() {
    let list = Object.entries(this.state.activities).map(([activity, duration]) => {
      return [
        <dt>{activity}</dt>,
        <dd>
          <progress value={duration} max={this.state.total_time}></progress>
          <label>{this._humanize_duration(duration)}</label>
        </dd>
      ]
    })

    return (
      <main>
        <link rel="stylesheet" type="text/css" href="report.css" />
        <h1>{this.state.date.toLocaleDateString()}</h1>
        <nav>
          <a href="#" onClick={(e)=> this.go(e, -1)}>Prev</a>
          {this.state.has_next &&
            <a href="#" onClick={(e)=> this.go(e, 1)}>Next</a>
          }
        </nav>
        <dl>
          <dt>Total</dt>
          <dd>
            <progress value={this.state.total_time} max={this.state.total_time}></progress>
            <label>{this._humanize_duration(this.state.total_time)}</label>
          </dd>
          {list}
        </dl>
      </main>
    )
  }

  go(e, offset) {
    e.preventDefault()
    this.send('go', offset)
  }

  // Event data is converted to a string. If date is provided convert back to date
  setState(updates) {
    if( typeof updates['date'] == 'string' )
      updates['date'] = new Date(updates['date'])
    return super.setState(updates)
  }

  _humanize_duration(seconds) {
    let dt=new Date(seconds * 1000);
    return dt.getUTCHours()+" hours, "+dt.getUTCMinutes()+" minutes and "+dt.getUTCSeconds()+" second(s)"
  }
}
