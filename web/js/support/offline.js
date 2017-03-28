// Offline plugin
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
}
