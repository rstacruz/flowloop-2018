import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './store'
import { Provider } from 'react-redux'
import Chrome from './components/chrome'
import Router from './router'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import Ticker from './services/ticker'

const store = createStore(reducer, {}, applyMiddleware(
  Ticker(),
  Router(),
  createLogger()
))

ReactDOM.render(
  <Provider store={store}>
    <Chrome />
  </Provider>
, document.querySelector('#root'))
