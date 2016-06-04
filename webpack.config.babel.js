import webpack from 'webpack'

import CopyPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import autoprefixer from 'autoprefixer'

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
      api: __dirname + '/src/api',

      bower: __dirname + '/bower_components',
      icon: __dirname + '/src/icon/icon.scss'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract('style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss!sass') },
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
  ],
  postcss: function () {
    return [autoprefixer]
  }
}
