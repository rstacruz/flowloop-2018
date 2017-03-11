const requestAnimationFrame = require('raf')

export default function ticker (options = {}) {
  const INTERVAL = options.interval || 1000

  return function (store) {
    function tick () {
      requestAnimationFrame(() => {
        store.dispatch({ type: 'time:tick', now: new Date() })
        setTimeout(tick, INTERVAL)
      })
    }

    tick()

    return function (dispatch) {
      return dispatch
    }
  }
}
