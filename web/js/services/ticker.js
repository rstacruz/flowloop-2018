const requestAnimationFrame = require('raf')

export default function ticker (options = {}) {
  const INTERVAL = options.interval || 1000

  let started = false

  let timer

  return function (store) {
    return function (dispatch) {
      return function (action) {
        if (action.type === 'ticker:start!') {
          started = true
          start(dispatch)
        } else if (action.type === 'ticker:stop!') {
          started = false
          stop()
        }

        return dispatch(action)
      }
    }
  }

  function tick (dispatch) {
    dispatch({ type: 'ticker:tick', now: new Date() })
    if (!started) return
    timer = setTimeout(() => {
      requestAnimationFrame(() => tick(dispatch))
    }, INTERVAL)
  }

  function stop () {
    if (timer) clearTimeout(timer)
    timer = null
  }

  function start (dispatch) {
    if (!timer) tick(dispatch)
  }
}
