import Debug from 'debug'

const debug = Debug('app:offline')

// Offline plugin
if (process.env.NODE_ENV === 'production') {
  const OfflinePlugin = require('offline-plugin/runtime')

  OfflinePlugin.install({
    onUpdateReady: () => OfflinePlugin.applyUpdate(),
    onUpdated: () => {
      debug('ServiceWorker updated to new version')
      debug('Reload for changes to take effect')

      window.__APP__ &&
      window.__APP__.store.dispatch({
        type: 'ui:update',
        payload: { 'offline:updated': true }
      })
    }
  })
}
