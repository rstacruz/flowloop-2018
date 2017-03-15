import buildReducer from 'build-reducer'
import put from '101/put'

import Settings from '../selectors/settings'

/**
 * Settings reducer
 */

export default buildReducer({
  'init': (state) => {
    return put(state, {
      'settings': {}
    })
  },

  'settings:update': (state, action) => {
    const val = action.payload || {}

    return put(state, {
      'settings': put(state.settings,
        Object.assign({}, state.settings, action.payload || {}))
    })
  },

  'settings:cycleTimerMode': (state, action) => {
    const mode = Settings.full(state)['timer:mode']
    const idx = Settings.TIMER_MODES.indexOf(mode)
    const newIdx = (idx + 1) % Settings.TIMER_MODES.length
    const newMode = Settings.TIMER_MODES[newIdx]

    return put(state, {
      'settings.timer:mode': newMode
    })
  }
})
