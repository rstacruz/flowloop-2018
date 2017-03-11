const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  plugins: [
    require('stylelint')(),
    require('postcss-import')(),
    require('postcss-cssnext')(),
  ].concat(DEBUG ? [
    require('postcss-reporter')(),
    require('postcss-browser-reporter')(),
  ] : []),
}
