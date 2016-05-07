import webpack from 'webpack'

export default {
  entry: {
    index: 'index',
    vendor: ['cheerio', 'react', 'react-dom', 'sprintf-js']
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
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ]
}
