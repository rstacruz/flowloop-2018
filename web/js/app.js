import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Chrome from './pages/chrome'
import buildStore from './store'

const store = buildStore()

store.dispatch({ type: 'init' })
store.dispatch({ type: 'persistence:load!' })
store.dispatch({ type: 'icon:reset!' })

ReactDOM.render(
  <Provider store={store}>
    <Chrome />
  </Provider>
, document.querySelector('#root'))
