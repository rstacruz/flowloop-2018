import put from '101/put'
import get from '101/pluck'
import reduceReducers from 'reduce-reducers'
import buildReducer from 'build-reducer'

/*
 * Time
 */

const time = buildReducer({
  'init': (state) => {
    return put(state, {
      'time.now': undefined
    })
  },

  'ticker:tick': (state, { now }) => {
    return put(state, {
      'time.now': now
    })
  }
})

/*
 * Route
 */

const route = buildReducer({
  'init': (state) => {
    return put(state, {
      'route.page': undefined
    })
  },

  'route:change': (state, { page }) => {
    return put(state, {
      'route': { page }
    })
  }
})

/*
 * Timer
 */

const timer = buildReducer({
  'init': (state) => {
    return put(state, {
      'timer': {},
      'timer.active': false
    })
  },

  'timer:start': (state, { timerType }) => {
    const now = new Date()
    const durations = get(state, 'settings.duration')
    const duration = get(durations, timerType)
    const defaultLabel = get(state, 'settings.labels.default')

    return put(state, {
      'timer.active': true,
      'timer.startedAt': now,
      'timer.label': defaultLabel,
      'timer.endsAt': new Date(+now + duration),
      'timer.type': timerType,
      'timer.duration': duration,
    })
  },

  'timer:halt': (state) => {
    return put(state, {
      'timer': {},
      'timer.active': false,
    })
  }
})

/*
 * Settings
 */

const settings = buildReducer({
  'init': (state) => {
    return put(state, {
      'settings': {},
      'settings.duration.work': 6 * 1000, // 25 * 60 * 1000,
      'settings.duration.break': 1 * 60 * 1000,
      'settings.duration.longBreak': 10 * 60 * 1000,
      'settings.labels.labels': ['Work', 'Chore', 'Side work'],
      'settings.labels.default': 'Work',
    })
  },
})

/*
 * Export
 */

export default reduceReducers(
  timer,
  time,
  route,
  settings
)
