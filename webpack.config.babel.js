import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default [
  {
    entry: {
      index: 'index',
      vendor: ['react', 'react-dom', 'react-css-modules']
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist/app',
      publicPath: '/dist/app'
    },
    resolve: {
      root: __dirname + '/src',
      alias: {
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
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new ExtractTextPlugin('style.css', { allChunks: true })
    ]
  },
  {
    entry: {
      background: 'background',
      vendor: ['lovefield']
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist/serv',
      publicPath: '/dist/serv'
    },
    resolve: {
      root: __dirname + '/src',
      alias: {
        db: __dirname + '/src/data/db'
      }
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ]
  }
]
