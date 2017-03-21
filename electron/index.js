const {app, Tray} = require('electron')
const Menubar = require('menubar')

const ROOT = require('path').resolve(__dirname, '../')

// adds debug features like hotkeys for triggering dev tools and reload
// require('electron-debug')()

app.on('ready', () => {
  // Tray icon
  const tray = new Tray(`${ROOT}/node_modules/menubar/example/IconTemplate.png`)
  tray.setTitle('0:37')

  // Menubar app
  Menubar({
    index: `file://${ROOT}/public/index.html`,
    preloadWindow: true,
    tray,
    width: 320,
    height: 480
  })
})
