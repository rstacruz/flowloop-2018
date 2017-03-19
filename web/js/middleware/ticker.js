export default function ticker (options = {}) {
  const INTERVAL = options.interval || 1000
  let started = false
  let timer

  return store => dispatch => action => {
    dispatch(action)

    switch (action.type) {
      case 'init':
        dispatch({ type: 'ticker:tick', now: new Date() })
        break

      case 'ticker:start!':
        started = true
        start(store.dispatch)
        break

      case 'stop!':
      case 'ticker:stop!':
        started = false
        stop()
        break
    }
  }

  function tick (dispatch) {
    dispatch({ type: 'ticker:tick', now: new Date() })
    if (!started) return
    timer = setTimeout(() => {
      tick(dispatch)
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
