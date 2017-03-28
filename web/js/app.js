import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Chrome from './pages/chrome'
import { buildStore } from './store'
import * as OfflinePlugin from 'offline-plugin/runtime'
import Debug from 'debug'

const debug = Debug('app:app')

// Offline plugin
if (process.env.NODE_ENV === 'production') {
  OfflinePlugin.install()
}

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
    debug(`Starting Flowloop ${process.env.VERSION}`)

    const store = this.store = buildStore()

    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'persistence:load!' })
    store.dispatch({ type: 'icon:reset!' })

    const div = this.div = document.createElement('div')
    div.id = 'root'
    div.className = 'app-root'
    document.body.appendChild(div)

    this.removeLoadingScreen()

    ReactDOM.render(
      <Provider store={store}>
        <Chrome />
      </Provider>
    , div)

    return this
  }

  /*
   * Removes the loading screen that's shown before JavaScript.
   */

  removeLoadingScreen () {
    const $screen = document.getElementById('loading-screen')
    if ($screen) $screen.parentNode.removeChild($screen)
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
