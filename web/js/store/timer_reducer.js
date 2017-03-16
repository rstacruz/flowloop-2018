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
      ...(state.timer || {}),
      'active': true,
      'startedAt': now,
      'label': defaultLabel,
      'endsAt': new Date(+now + duration),
      'type': timerType,
      'duration': duration,
      'laps': 0,
      'lastLap': now,
      'lastLogId': null
    }

    return { ...state, timer }
  },

  'timer:halt': (state /*: State */) /*: State */ => {
    const timer /*: Timer */ = { active: false }

    return { ...state, timer }
  },

  'timer:lap': (state /*: State */) /*: State */ => {
    let timer /*: Timer */ = state.timer
    const now = get(state, 'time.now')

    timer = {
      ...state.timer,
      'laps': (timer.laps || 0) + 1,
      'lastLap': now
    }

    return { ...state, timer }
  }
})
