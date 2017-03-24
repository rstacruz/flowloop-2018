const webpack = require('webpack')
const resolve = require('path').resolve
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const LiveReloadPlugin = require('webpack-livereload-plugin')

const DEBUG = process.env.NODE_ENV !== 'production'
const SRC = './web'
const DEST = './public'

module.exports = {
  cache: true,

  context: __dirname,

  entry: {
    // JavaScript
    'assets/js/app': `${SRC}/js/app.js`,

    // CSS
    'assets/css/app': `${SRC}/css/app.js`
  },

  output: {
    path: resolve(__dirname, DEST),
    filename: '[name].js',
    pathinfo: Boolean(DEBUG),
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: DEBUG
                ? {
                  sourceMap: true,
                  importLoaders: 1
                }
                : { }
            },
            {
              loader: 'postcss-loader',
              options: DEBUG
                ? { sourceMap: 'inline' }
                : {}
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|woff|woff2|eot|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:12].[ext]',
              publicPath: '../../'
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    // Delete old files when compiling
    new CleanWebpackPlugin([ DEST ]),

    // Extract to .css
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true // preserve source maps
    }),

    // Compress React (and others)
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
      VERSION: getVersion()
    }),

    // Copying files directly
    new CopyWebpackPlugin([
      // { from: `${SRC}/assets`, to: './assets' },
      { from: `${SRC}/html`, to: '.' }
    ]),

    // Ignore locales because it's around 400kb
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ].concat(DEBUG ? [
    // LiveReload in development
    // new LiveReloadPlugin({
    //   appendScriptTag: true
    // }),

    // Debug mode for old webpack plugins
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ] : []),

  // Hide source maps in production (no sourceMappingURL)
  devtool: DEBUG ? 'source-map' : 'hidden-source-map',

  // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/35
  stats: stats(),

  devServer: {
    stats: stats()
  }
}

function stats () {
  return {
    children: false,
    chunks: false,
    assetsSort: 'name'
  }
}

function getVersion () {
  return require('child_process')
    .execSync('git describe --always --tags --dirty')
    .toString()
    .trim()
}
