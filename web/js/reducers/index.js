import put from '101/put'
import get from '101/pluck'
import reduceReducers from 'reduce-reducers'
import buildReducer from 'build-reducer'
import uuid from 'uuid'
import mapObject from 'object-loops/map'

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
      'timer.lastLap': null,
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
      'settings.duration.work': 25 * 60 * 1000,
      'settings.duration.break': 5 * 60 * 1000,
      'settings.duration.longBreak': 10 * 60 * 1000,
      'settings.labels.labels': ['Work', 'Chore', 'Side work'],
      'settings.labels.default': 'Work',
    })
  },

  'settings:update': (state, action) => {
    const val = action.payload || {}

    return put(state, {
      'settings': put(state.settings, {
        'duration': put(state.settings.duration, val.duration || {}),
        'labels': put(state.settings.labels, val.labels || {}),
      })
    })
  }
})

/*
 * Log
 */

const log = buildReducer({
  'init': (state) => {
    return put(state, {
      'log': {}
    })
  },

  'log:load': (state, { payload }) => {
    let log = Object.assign({}, get(state, 'log') || {}, payload)

    // Unpack dates
    log = mapObject(log, item => {
      return Object.assign({}, item, {
        startedAt: new Date(item.startedAt),
        endedAt: new Date(item.endedAt),
      })
    })

    return put(state, 'log', log)
  },

  'log:addCurrent': (state) => {
    const id = uuid.v4()
    const timer = get(state, 'timer')
    const now = get(state, 'time.now')
    const startedAt = timer.lastLap || timer.startedAt

    return put(state, {
      'timer.lastLap': now,
      [`log.${id}`]: {
        id,
        startedAt,
        endedAt: now,
        duration: +now - +startedAt,
        timerType: timer.type,
        label: timer.label,
        isComplete: true
      }
    })
  }
})

/*
 * Export
 */

export default reduceReducers(
  timer,
  time,
  route,
  settings,
  log
)
