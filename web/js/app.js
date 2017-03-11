import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './store'
import { Provider } from 'react-redux'
import Chrome from './components/chrome'
import Router from './router'
import { createStore, applyMiddleware } from 'redux'

const store = createStore(reducer, {}, applyMiddleware(
  Router()
))

ReactDOM.render(
  <Provider store={store}>
    <Chrome />
  </Provider>
, document.querySelector('#root'))
