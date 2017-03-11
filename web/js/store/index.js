import put from '101/put'

export default function reducer (state, action) {
  switch (action.type) {
    case 'route:change':
      return put(state, {
        'route': action
      })

    case 'timer:start':
      const now = new Date()
      const duration = 5 * 60 * 1000

      return put(state, {
        'timer.startedAt': now,
        'timer.endsAt': new Date(+now + duration),
        'timer.type': action.timerType,
        'timer.duration': 5 * 60 * 1000,
      })

    case 'time:tick':
      return put(state, {
        'time.now': action.now
      })

    default:
      return state
  }
}
