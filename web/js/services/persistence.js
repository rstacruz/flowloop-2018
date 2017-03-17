/* @flow */

/*::
  import type { MiddlewareAPI, Dispatch, Middleware } from 'redux'
  import type { State } from '../selectors/state'

  type Action = { type: string }

  type StoragePayload = {
    version: number,
    settings: Object,
    log: Object,
    labels: Object
  }
*/

import get from '101/pluck'

/**
 * Simple localStorage-based persistence
 */

export default function Persistence () /*: Middleware<*, Action> */ {
  return (store /*: MiddlewareAPI<*, Action> */) =>
    (dispatch /*: Dispatch<Action> */) =>
    (action /*: Action */) => {
    let result = dispatch(action)

    switch (action.type) {
      case 'persistence:load!':
        load(store.dispatch)
        break

      case 'log:addCurrent':
      case 'timer:setLabelId':
      case 'settings:update':
      case 'settings:cycleTimerMode':
        setTimeout(() => { save(store.getState()) })
        break
    }

    return result
  }
}

/**
 * Loads settings from localStorage
 * @private
 */

function load (dispatch /*: Dispatch<Action> */) {
  loadData('TimerData', (data /*: StoragePayload */) => {
    dispatch({ type: 'settings:update', payload: data.settings })
    dispatch({ type: 'log:load', payload: data.log })
    dispatch({ type: 'labels:load', payload: data.labels })
  })
}

/**
 * Saves settings to localStorage
 * @private
 */

function save (state /*: State */) {
  if (!window.localStorage) return

  const previous = JSON.parse(window.localStorage.TimerData || '{}')

  const payload = {
    version: 0,
    log: { ...(previous.log || {}), ...state.log },
    labels: { ...(previous.labels || {}), ...state.labels },
    settings: { ...(previous.settings || {}), ...state.settings }
  }

  window.localStorage.TimerData = JSON.stringify(payload)
}

/*
 * Loads data `key` from localStorage
 */

function loadData (key, fn) {
  if (!window.localStorage) return

  let data = window.localStorage[key]
  if (!data) return

  data = JSON.parse(data)

  return fn(data)
}

// data = JSON.parse(window.localStorage.TimerData || '{}'); data.settings['duration:work'] = 5000; window.localStorage.TimerData = JSON.stringify(data)
