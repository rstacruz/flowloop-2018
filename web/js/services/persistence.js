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
  loadData('TimerSettings', settings => {
    dispatch({ type: 'settings:update', payload: settings })
  })

  loadData('TimerLog', items => {
    dispatch({ type: 'log:load', payload: items })
  })
}

/*
 * Loads data `key` from localStorage
 */

function loadData (key, fn) {
  let data = window.localStorage[key]
  if (!data) return

  data = JSON.parse(data)

  console.log(`Persistence: loading ${key}`, data)
  return fn(data)
}

// localStorage.TimerSettings = JSON.stringify({ duration: { work: 7000, break: 50000, longBreak: 60000 } })
