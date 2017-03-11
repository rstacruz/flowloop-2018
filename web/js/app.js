import React from 'react'
import ReactDOM from 'react-dom'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './store'
import Chrome from './components/chrome'
import Router from './services/router'
import Ticker from './services/ticker'
import TimerConcluder from './services/timer_concluder'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(
  Ticker(),
  TimerConcluder(),
  Router(),
  createLogger()
)))

store.dispatch({ type: 'init' })

ReactDOM.render(
  <Provider store={store}>
    <Chrome />
  </Provider>
, document.querySelector('#root'))
