/* @flow */

/*::
  import type { Timer } from '../selectors/timer'
*/

import buildReducer from 'build-reducer'
import get from '101/pluck'
import put from '101/put'

import Settings from '../selectors/settings'

/*
 * Timer
 */

export default buildReducer({
  'init': (state) => {
    const timer /*: Timer */ = { active: false }
    return put(state, 'timer', timer)
  },

  'timer:start': (state, { timerType }) => {
    const now = get(state, 'time.now')
    const settings = Settings.full(state)
    const duration = settings[`duration:${timerType}`]
    const defaultLabel = settings['labels:default']

    const timer /*: Timer */ = {
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

    return put(state, 'timer', { ...state.timer, ...timer })
  },

  'timer:halt': (state) => {
    const timer /*: Timer */ = { active: false }
    return put(state, 'timer', timer)
  },

  'timer:lap': state => {
    const timer = get(state, 'timer')
    const now = get(state, 'time.now')

    return put(state, {
      'timer.laps': (timer.laps || 0) + 1,
      'timer.lastLap': now
    })
  }
})
