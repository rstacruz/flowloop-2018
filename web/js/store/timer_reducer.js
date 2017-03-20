/* @flow */

/*::
  import type { State } from '../selectors/state'
  import type { Timer } from '../selectors/timer'
*/

import buildReducer from 'build-reducer'
import get from '101/pluck'

import Settings from '../selectors/settings'

/*
 * Timer
 */

export default buildReducer({
  'init': (state /*: State */) /*: State */ => {
    const timer /*: Timer */ = { active: false }

    return { ...state, timer }
  },

  'timer:start': (state /*: State */, { timerType }) /*: State */ => {
    const now = get(state, 'time.now')
    const settings = Settings.full(state)
    const duration = settings[`duration:${timerType}`]
    const defaultLabel = settings['labels:default']

    const timer /*: Timer */ = {
      ...(state.timer || { active: false }),
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
  },

  'timer:setLabelId': setLabelId,

  'timer:halt': (state /*: State */) /*: State */ => {
    const timer /*: Timer */ = { active: false }

    return { ...state, timer }
  },

  'timer:lap': (state /*: State */) /*: State */ => {
    let timer /*: Timer */ = state.timer
    const now = state.time && state.time.now

    timer = {
      ...state.timer,
      'laps': (timer.laps || 0) + 1,
      'lastLap': now
    }

    return { ...state, timer }
  },

  'label:delete': deleteLabel
})

/*
 * Updates the label ID
 */

function setLabelId (state /*: State */, { id } /*: { id: string } */) /*: State */ {
  let timer /*: Timer */ = state.timer || { active: false }
  timer = { ...timer, 'labelId': id }
  return { ...state, timer }
}

/*
 * Reset to default label if our label was deleted
 */

function deleteLabel (state /*: State */, { id } /*: { id: string } */) /*: State */ {
  let timer /*: Timer */ = state.timer || { active: false }

  if (timer.labelId === id) {
    // const settings = Settings.full(state)
    // const defaultLabel = settings['labels:default']
    const defaultLabel = Settings.DEFAULT_LABEL_ID

    timer = { ...timer, 'labelId': defaultLabel }
  }

  return { ...state, timer }
}
