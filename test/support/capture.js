import { createStore, applyMiddleware } from 'redux'

/*
 * Helper: captures actions
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
