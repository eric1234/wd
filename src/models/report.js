// A utility class to help process the report
class Session {
  constructor(name) { this.name = name }
  duration() { return Math.round((this.end - this.start) / 1000) }
}

/*
 * This model is just a function that accepts a list of events (activity and
 * idle) and returns a hash where the key is the activity label and the value
 * is the duration (in seconds) of the time spent on that activity. If the
 * Same activity occurs multiple times in the event listing they are coalesed
 * and the durations summed as a single key/value pair.
 */
export default function(events) {
  let current;
  let sessions = [];

  events.forEach((event) => {
    if( current ) current.end = event['created_at']

    if( event['type'] == 'idle' ) {
      current = null
    } else {
      current = new Session(event['value'])
      current.start = event['created_at']
      sessions.push(current)
    }
  })

  // The date didn't end in idle. If still today then use the current time.
  // If a past day then treat the duration as 0
  if( current ) {
    let now = new Date()
    if(
      current.start.getFullYear() == now.getFullYear() &&
      current.start.getMonth() == now.getMonth() &&
      current.start.getDate() == now.getDate()
    ) {
      current.end = now
    } else {
      current.end = current.start
    }
  }

  return sessions.reduce((memo, session) => {
    memo[session.name] = memo[session.name] || 0
    memo[session.name] += session.duration()
    return memo
  }, {})
}
