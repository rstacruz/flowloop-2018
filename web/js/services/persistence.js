/**
 * Simple localStorage-based persistence
 */

export default function Persistence () {
  return store => dispatch => action => {
    switch (action.type) {
      case 'persistence:load!':
        load(store.dispatch)
        break
    }

    return dispatch(action)
  }
}

/**
 * Loads settings from localStorage
 * @private
 */

function load (dispatch) {
  let settings = window.localStorage.TimerSettings
  if (!settings) return

  settings = JSON.parse(settings)

  console.log('Persistence: loading settings', settings)

  dispatch({
    type: 'settings:update',
    payload: settings
  })
}

// localStorage.TimerSettings = JSON.stringify({ duration: { work: 7000, break: 50000, longBreak: 60000 } })
