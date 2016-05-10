import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  entry: {
    index: 'index',
    background: 'background',
    react: ['react', 'react-css-modules', 'react-dom'],
    libs: ['bounce.js', 'cheerio', 'haversine', 'lovefield', 'sprintf-js'],
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    publicPath: '/dist'
  },
  resolve: {
    root: __dirname + '/src',
    alias: {
      db: __dirname + '/src/data/db',
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
    new webpack.optimize.CommonsChunkPlugin(['react', 'libs'], '[name].js'),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
}
