import buildReducer from 'build-reducer'
import put from '101/put'
import del from '101/del'

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

  'settings:update': updateSettings,
  'settings:reset': resetSettings,
  'timer:setLabelId': setLabelId,
  'label:delete': deleteLabel,

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

/*
 * Setting the label for a timer;
 * persist it as the default label
 */

function setLabelId (state /*: State */, { id } /*: { id: string } */) /*: State */ {
  let settings /*: Settings */ = state.settings || {}
  settings = { ...settings, 'labels:default': id }
  return { ...state, settings }
}

/**
 * When deleting al abel that's the current labels:default,
 * reset it to the old default.
 */

function deleteLabel (state /*: State */, { id } /*: { id: string } */) /*: State */ {
  let settings /*: Settings */ = state.settings || {}

  if (settings['labels:default'] === id) {
    settings = del(settings, 'labels:default')
  }

  return { ...state, settings }
}

/**
 * Update settings
 */

function updateSettings (state /*: State */, { payload } /*: { payload: Settings } */) /*: State */ {
  let settings /*: Settings */ = state.settings
  settings = { ...settings, ...(payload || {}) }
  return { ...state, settings }
}

/**
 * Resets settings to default.
 */

function resetSettings (state /*: State */) {
  return { ...state, settings: {} }
}
