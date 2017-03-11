const requestAnimationFrame = require('raf')

export default function ticker (options = {}) {
  const INTERVAL = options.interval || 1000

  let started = false

  return function (store) {
    return function (dispatch) {
      return function (action) {
        if (action.type === 'ticker:start') {
          started = true
          tick(dispatch)
        } else if (action.type === 'ticker:stop') {
          started = false
        }

        return dispatch(action)
      }
    }
  }

  function tick (dispatch) {
    requestAnimationFrame(() => {
      dispatch({ type: 'time:tick', now: new Date() })
      if (started) setTimeout(() => { tick(dispatch) }, INTERVAL)
    })
  }
}
