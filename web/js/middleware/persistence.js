/* @flow */

/*::
  import type { MiddlewareAPI, Dispatch, Middleware } from 'redux'
  import type { State } from '../selectors/state'
  import type { DataStore } from '../selectors/data_store'

  type Action = { type: string }
*/

import { migrate, LATEST_VERSION } from '../services/migrator'

/**
 * Simple localStorage-based persistence middleware-generator.
 * Listens for events that mutate interesting things, and saves them when
 * something interesting happens.
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
        case 'log:clear':
        case 'label:update':
        case 'label:delete':
        case 'timer:setLabelId':
        case 'settings:update':
        case 'settings:cycleTimerMode':
        case 'settings:reset':
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
  loadData('TimerData', (data /*: DataStore */) => {
    data = migrate(data)
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

  let previous = JSON.parse(window.localStorage.TimerData || '{}')
  previous = migrate(previous)

  const payload /*: DataStore */ = {
    version: LATEST_VERSION,
    log: { ...(previous.log || {}), ...state.log },
    labels: { ...(previous.labels || {}), ...state.labels },
    settings: { ...(previous.settings || {}), ...state.settings }
  }

  console.log('Persistence: saving data', payload)
  window.localStorage.TimerData = JSON.stringify(payload)
}

/**
 * Loads data `key` from localStorage
 * @private
 */

function loadData (key, fn) {
  if (!window.localStorage) return

  let data = window.localStorage[key]
  if (!data) return

  data = JSON.parse(data)

  return fn(data)
}
