import React from 'react'
import ReactDOM from 'react-dom'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import Chrome from './pages/chrome'
import Router from './services/router'
import Ticker from './services/ticker'
import Icon from './services/icon'
import TimerActions from './services/timer_actions'
import Notifier from './services/notifier'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(
  Icon(),
  TimerActions(),
  Ticker(),
  Notifier(),
  Router()
  // createLogger()
)))

store.dispatch({ type: 'init' })

ReactDOM.render(
  <Provider store={store}>
    <Chrome />
  </Provider>
, document.querySelector('#root'))
