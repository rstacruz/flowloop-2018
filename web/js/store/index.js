import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import Router from '../middleware/router'
import Ticker from '../middleware/ticker'
import Icon from '../middleware/icon'
import TimerActions from '../middleware/timer_actions'
import Notifier from '../middleware/notifier'
import Persistence from '../middleware/persistence'

/**
 * Returns a default set of middleware.
 */

export function middlewares () {
  return [
    Icon(),
    TimerActions(),
    Ticker(),
    Notifier(),
    Router(),
    Persistence()
  ]
}

/*
 * Builds a redux store with all our middleware
 */

export function buildStore (services) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const middleware = services || middlewares()

  const enhancer = composeEnhancers(applyMiddleware(...middleware))

  return createStore(reducer, {}, enhancer)
}
