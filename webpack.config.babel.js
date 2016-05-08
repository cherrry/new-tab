import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  entry: {
    index: 'index',
    vendor: ['cheerio', 'react', 'react-dom', 'react-css-modules', 'sprintf-js']
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    publicPath: '/dist'
  },
  resolve: {
    root: __dirname + '/src'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract('style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!sass') }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
}
