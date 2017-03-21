/* @flow */

/*::
  import type { Log, Logs } from '../selectors/log'
  import type { State } from '../selectors/state'
  import type { Timer, ActiveTimer } from '../selectors/timer'
*/

import buildReducer from 'build-reducer'
import mapObject from 'object-loops/map'
import uuid from 'uuid'
import { DEFAULT_LABEL_ID } from '../selectors/settings'

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

function init (state /*: State */) /*: State */ {
  return { ...state, 'log': {} }
}

/**
 * Load logs from a payload
 */

function loadLogs (state /*: State */, { payload } /*: { payload: Logs } */) /*: State */ {
  let log /*: Logs */ = { ...(state.log || {}), ...payload }

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

function addCurrent (state /*: State */) /*: State */ {
  let timer /*: Timer */ = state.timer
  if (!timer.active) return state

  const id /*: string */ = uuid.v4()
  const now /*: Date */ = state.time && state.time.now
  const startedAt /*: Date */ = timer.lastLap || timer.startedAt || now

  timer = {
    ...timer,
    'lastLap': now,
    'lastLogId': id
  }

  let log /*: Log */ = {
    id,
    startedAt,
    'endedAt': now,
    'duration': +now - +startedAt,
    'timerType': timer.type || 'work',
    'labelId': timer.labelId || DEFAULT_LABEL_ID,
    'isComplete': true
  }

  let logs /*: Logs */ = { ...(state.log || {}), [id]: log }

  return { ...state, timer, log: logs }
}
