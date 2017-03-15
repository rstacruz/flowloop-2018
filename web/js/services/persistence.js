import get from '101/pluck'

/**
 * Simple localStorage-based persistence
 */

export default function Persistence () {
  return store => dispatch => action => {
    dispatch(action)

    switch (action.type) {
      case 'persistence:load!':
        load(store.dispatch)
        break

      case 'log:addCurrent':
      case 'settings:update':
        setTimeout(() => { save(store.getState()) })
        break
    }
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

/**
 * Saves settings to localStorage
 * @private
 */

function save (state) {
  if (!window.localStorage) return

  console.log('Persistence: saving TimerSettings')
  window.localStorage.TimerSettings = JSON.stringify(get(state, 'settings'))

  console.log('Persistence: saving TimerLog')
  const newLog = get(state, 'log')
  const oldLog = JSON.parse(window.localStorage.TimerLog || '{}') || {}
  const combinedLog = Object.assign({}, oldLog, newLog)

  window.localStorage.TimerLog = JSON.stringify(combinedLog)
}

/*
 * Loads data `key` from localStorage
 */

function loadData (key, fn) {
  if (!window.localStorage) return

  let data = window.localStorage[key]
  if (!data) return

  data = JSON.parse(data)

  console.log(`Persistence: loading ${key}`, data)
  return fn(data)
}

// localStorage.TimerSettings = JSON.stringify({ "duration:work": 4000, "duration:break": 8000 })
