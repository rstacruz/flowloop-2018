import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers'
import Router from '../services/router'
import Ticker from '../services/ticker'
import Icon from '../services/icon'
import TimerActions from '../services/timer_actions'
import Notifier from '../services/notifier'
import Persistence from '../services/persistence'

/*
 * Builds a redux store with all our middleware
 */

function buildStore (services) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleware = services || [
    Icon(),
    TimerActions(),
    Ticker(),
    Notifier(),
    Router(),
    Persistence()
  ]

  const enhancer = composeEnhancers(applyMiddleware(...middleware))

  return createStore(reducer, {}, enhancer)
}

export default buildStore
