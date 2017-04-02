/* @flow */

/*::
  import type { State } from '../selectors/state'
  import type { Timer } from '../selectors/timer'
*/

import buildReducer from 'build-reducer'
import get from '101/pluck'
import * as Settings from '../selectors/settings'
import { INACTIVE } from '../selectors/timer'
import Debug from 'debug'

const debug = Debug('app:timer_reducer')

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
  let now /*: Date */ = state.time && state.time.now
  let duration /*: number */ = timer.duration || Settings.DEFAULTS['duration:work']
  let lastLap /*: Date */ = timer.lastLap || timer.startedAt || now
  let endsAt /*: Date */ = timer.endsAt || now

  if (endsAt > now) {
    debug('Lapping before we\'re due. Not supposed to happen!')
    debug('... lastLap', lastLap)
    debug('... endsAt', endsAt)
    debug('... duration', duration)
    debug('... now', now)
    return state
  }

  timer = {
    ...state.timer,
    'laps': (timer.laps || 0) + 1,
    'lastLap': endsAt,
    'endsAt': new Date(+endsAt + duration)
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
