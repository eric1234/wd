import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {events: {}}
  }

  render() {
    let list = Object.entries(this.state.events).map(([activity, duration]) => {
      duration = this._humanize_duration(duration)
      return [
        <dt>{activity}</dt>,
        <dd>{duration}</dd>
      ]
    })
    return <dl>{list}</dl>
  }

  _humanize_duration(seconds) {
    let dt=new Date(seconds * 1000);
    return dt.getUTCHours()+" hours, "+dt.getUTCMinutes()+" minutes and "+dt.getUTCSeconds()+" second(s)"
  }
}
