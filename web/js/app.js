import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import Chrome from './pages/chrome'
import Router from './services/router'
import Ticker from './services/ticker'
import Icon from './services/icon'
import TimerActions from './services/timer_actions'
import Notifier from './services/notifier'
import Persistence from './services/persistence'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(
  Icon(),
  TimerActions(),
  Ticker(),
  Notifier(),
  Router(),
  Persistence()
)))

store.dispatch({ type: 'init' })
store.dispatch({ type: 'persistence:load!' })

ReactDOM.render(
  <Provider store={store}>
    <Chrome />
  </Provider>
, document.querySelector('#root'))
