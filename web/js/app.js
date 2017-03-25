import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Chrome from './pages/chrome'
import { buildStore } from './store'

/**
 * The main application. Exposed like this for testing.
 *
 *     app = new App()
 *     app.start()
 *     app.stop()
 */

export default class App {
  /**
   * Starts the application.
   */

  start () {
    const store = this.store = buildStore()

    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'persistence:load!' })
    store.dispatch({ type: 'icon:reset!' })

    const div = this.div = document.createElement('div')
    div.id = 'root'
    div.className = 'app-root'
    document.body.appendChild(div)

    ReactDOM.render(
      <Provider store={store}>
        <Chrome />
      </Provider>
    , div)

    return this
  }

  /**
   * Stop everything; unmounts React nodes and stops the store.
   */

  stop () {
    this.store.dispatch({ type: 'stop!' })
    ReactDOM.render(<noscript />, this.div)
    return this
  }
}

if (typeof process.env.VERSION !== 'undefined') {
  console.log(`Flowloop ${process.env.VERSION}`)
}

/*
 * Performance
 */

if (process.env.NODE_ENV !== 'production') {
  window.Perf = require('react-addons-perf')
}

/*
 * Auto-start
 */

if (!module.parent) {
  window.__APP__ = (new App({
    env: process.env.NODE_ENV || 'development'
  })).start()
}
