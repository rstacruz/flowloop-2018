import buildReducer from 'build-reducer'
import get from '101/pluck'
import put from '101/put'

import Settings from '../selectors/settings'

/*
 * Timer
 */

export default buildReducer({
  'init': (state) => {
    return put(state, {
      'timer': {},
      'timer.active': false
    })
  },

  'timer:start': (state, { timerType }) => {
    const now = get(state, 'time.now')
    const settings = Settings.full(state)
    const duration = settings[`duration:${timerType}`]
    const defaultLabel = settings['labels:default']

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
