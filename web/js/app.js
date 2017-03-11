import React from 'react'
import ReactDOM from 'react-dom'
import { buildStore } from './store'
import { Provider } from 'react-redux'
import Chrome from './components/chrome'

const store = buildStore()

ReactDOM.render(
  <Provider store={store}>
    <Chrome name='John' />
  </Provider>
, document.querySelector('#root'))
