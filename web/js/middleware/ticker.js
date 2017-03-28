/* @flow */

/*::
  import type { MiddlewareAPI, Dispatch, Middleware } from 'redux'

  type Action = { type: string }

  type Options = {
    interval?: number
  }
*/

import Visibility from 'visibilityjs'

const SECOND = 1000

export default function ticker (options /*: Options */ = {}) /*: Middleware<*, Action> */ {
  let timer

  return (store /*: MiddlewareAPI<*, Action> */) =>
    (dispatch /*: Dispatch<Action> */) =>
    (action /*: Action */) => {
      let result = dispatch(action)

      switch (action.type) {
        case 'init':
          dispatch({ type: 'ticker:tick', now: new Date() })
          break

        case 'ticker:start!':
          start(store.dispatch)
          break

        case 'stop!':
        case 'ticker:stop!':
          stop()
          break
      }

      return result
    }

  /**
   * Dispatches a tick
   */

  function tick (dispatch) {
    dispatch({ type: 'ticker:tick', now: new Date() })
  }

  /**
   * Starts the timer (idempotent)
   */

  function start (dispatch) {
    if (timer) return
    timer = Visibility.every(1 * SECOND, 6 * SECOND, () => {
      tick(dispatch)
    })
  }

  /**
   * Stops the timer (idempotent)
   */

  function stop () {
    if (timer) Visibility.stop(timer)
    timer = null
  }
}
