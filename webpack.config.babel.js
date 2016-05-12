import webpack from 'webpack'

import CopyPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  context: __dirname,
  entry: {
    app: 'src/app',
    serv: 'src/serv'
  },
  output: {
    filename: 'assets/[name].js',
    path: __dirname + '/dist',
    publicPath: '/dist'
  },
  resolve: {
    root: __dirname,
    alias: {
      app: __dirname + '/src/app',
      serv: __dirname + '/src/serv',

      actions: __dirname + '/src/actions',
      api: __dirname + '/src/api',
      db: __dirname + '/src/data/db',
      miniflux: __dirname + '/src/miniflux',
      bower: __dirname + '/bower_components',
      icon: __dirname + '/src/icon/icon.scss'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract('style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!sass') },
      { test: /\.(eot|svg|ttf|woff2?)$/, loader: 'url' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('assets/common.js'),
    new ExtractTextPlugin('assets/[name].css'),
    new CopyPlugin([
      { from: 'app.html' },
      { from: 'manifest.json' }
    ])
  ]
}
