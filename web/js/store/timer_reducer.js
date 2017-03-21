/* @flow */

/*::
  import type { State } from '../selectors/state'
  import type { Timer } from '../selectors/timer'
*/

import buildReducer from 'build-reducer'
import get from '101/pluck'
import Settings from '../selectors/settings'
import { INACTIVE } from '../selectors/timer'

/**
 * Timer reducer.
 */

export default buildReducer({
  'init': init,
  'timer:start': startTimer,
  'timer:setLabelId': setLabelId,
  'timer:halt': haltTimer,
  'timer:lap': lapTimer,
  'label:delete': deleteLabel
})

/**
 * Initializes default state.
 */

function init (state /*: State */) /*: State */ {
  const timer /*: Timer */ = INACTIVE

  return { ...state, timer }
}

/**
 * Starts a timer.
 */

function startTimer (state /*: State */, { timerType }) /*: State */ {
  const now = get(state, 'time.now')
  const settings = Settings.full(state)
  const duration = settings[`duration:${timerType}`]
  const defaultLabel = settings['labels:default']

  const timer /*: Timer */ = {
    ...(state.timer || INACTIVE),
    'active': true,
    'startedAt': now,
    'labelId': defaultLabel,
    'endsAt': new Date(+now + duration),
    'type': timerType,
    'duration': duration,
    'laps': 0,
    'lastLap': now,
    'lastLogId': null
  }

  return { ...state, timer }
}

/**
 * Stops a timer. Sets the `active` flag to `false`.
 */

function haltTimer (state /*: State */) /*: State */ {
  const timer /*: Timer */ = INACTIVE

  return { ...state, timer }
}

/**
 * Records a timer lap.
 */

function lapTimer (state /*: State */) /*: State */ {
  let timer /*: Timer */ = state.timer
  const now = state.time && state.time.now

  timer = {
    ...state.timer,
    'laps': (timer.laps || 0) + 1,
    'lastLap': now
  }

  return { ...state, timer }
}

/**
 * Updates the label ID.
 */

function setLabelId (state /*: State */, { id } /*: { id: string } */) /*: State */ {
  let timer /*: Timer */ = state.timer || { active: false }
  timer = { ...timer, 'labelId': id }

  return { ...state, timer }
}

/**
 * Reset to default label if our label was deleted.
 */

function deleteLabel (state /*: State */, { id } /*: { id: string } */) /*: State */ {
  let timer /*: Timer */ = state.timer || { active: false }

  if (timer.labelId === id) {
    // Don't get the default from the settings! It could've
    // been the label that was deleted.
    const defaultLabel = Settings.DEFAULT_LABEL_ID

    timer = { ...timer, 'labelId': defaultLabel }
  }

  return { ...state, timer }
}
