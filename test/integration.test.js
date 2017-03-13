var Nightmare = require('nightmare')

let port

beforeAll(() => {
  return new Promise((resolve, reject) => {
    var webpackMiddleware = require('webpack-dev-middleware')
    var connect = require('connect')
    var http = require('http')
    var webpack = require('webpack')

    var app = connect()
    app.use(webpackMiddleware(webpack(require('../webpack.config.js'))))
    http.createServer(app).listen(3000, (err, res) => {
      if (err) return reject(err)
      port = 3000
      resolve()
    })
  })
})

test('works', () => {
  let browser = Nightmare()
    .goto('http://localhost:3000')

  return browser
    .evaluate(() => document.querySelector('x.timer-layout'))
    .end()
    .then($layout => {
      expect($layout).not.toEqual(undefined)
    })
})
