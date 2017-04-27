class Session {
  constructor(name) {
    this.name = name
  }

  duration() {
    return Math.round((this.end - this.start) / 1000)
  }
}

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
  if( current ) { current.end = current.start }

  return sessions.reduce((memo, session) => {
    memo[session.name] = memo[session.name] || 0
    memo[session.name] += session.duration()
    return memo
  }, {})
}
