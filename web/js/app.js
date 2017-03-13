import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Chrome from './pages/chrome'
import buildStore from './store'

const store = buildStore()

store.dispatch({ type: 'init' })
store.dispatch({ type: 'persistence:load!' })
store.dispatch({ type: 'icon:reset!' })

const div = document.createElement('div')
div.id = 'root'
div.className = 'app-root'
document.body.appendChild(div)

ReactDOM.render(
  <Provider store={store}>
    <Chrome />
  </Provider>
, div)
