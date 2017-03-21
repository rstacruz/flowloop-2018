import buildReducer from 'build-reducer'
import get from '101/pluck'
import mapObject from 'object-loops/map'
import put from '101/put'
import uuid from 'uuid'

/**
 * Log reducer
 */

export default buildReducer({
  'init': init,
  'log:load': loadLogs,
  'log:clear': clearLogs,
  'log:addCurrent': addCurrent
})

/**
 * Builds initial state
 */

function init (state) {
  return { ...state, 'log': {} }
}

/**
 * Load logs from a payload
 */

function loadLogs (state, { payload }) {
  let log = Object.assign({}, get(state, 'log') || {}, payload)

  // Unpack dates
  log = mapObject(log, item => {
    if (!item) return

    return {
      ...item,
      'startedAt': new Date(item.startedAt),
      'endedAt': new Date(item.endedAt)
    }
  })

  return { ...state, log }
}

/**
 * Clears all log items.
 */

function clearLogs (state /*: State */) /*: State */ {
  let log /*: Logs */ = state.log || {}
  log = mapObject(log, (value, key) => null)

  return { ...state, log }
}

/**
 * Adds current active timer to log as a lap.
 */

function addCurrent (state) {
  const id = uuid.v4()
  const timer = get(state, 'timer')
  const now = get(state, 'time.now')
  const startedAt = timer.lastLap || timer.startedAt

  return put(state, {
    'timer.lastLap': now,
    'timer.lastLogId': id,
    [`log.${id}`]: {
      id,
      startedAt,
      endedAt: now,
      duration: +now - +startedAt,
      timerType: timer.type,
      labelId: timer.labelId,
      isComplete: true
    }
  })
}
