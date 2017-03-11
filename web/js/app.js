import React from 'react'
import ReactDOM from 'react-dom'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './store'
import Chrome from './components/chrome'
import Router from './services/router'
import Ticker from './services/ticker'

const store = createStore(reducer, {}, applyMiddleware(
  Ticker(),
  Router(),
  createLogger()
))

store.dispatch({ type: 'init' })

ReactDOM.render(
  <Provider store={store}>
    <Chrome />
  </Provider>
, document.querySelector('#root'))
