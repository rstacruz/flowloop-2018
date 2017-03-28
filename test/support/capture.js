import { createStore, applyMiddleware } from 'redux'

/*
 * Helper: captures actions in Redux middleware.
 *
 *     const { actions, store } = capture([middlewares])
 *
 *     actions == [ ... ]
 *     store == // redux store
 */

function capture (...middleware) {
  const actions = []
  const store = createStore(reducer, {}, applyMiddleware(...middleware))

  function reducer (state, action) {
    actions.push(action)
    return state
  }

  return { actions, store }
}

export default capture
