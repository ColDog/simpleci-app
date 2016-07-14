var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: 'bundle.js',
    publicPath: '/dist/assets'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], include: path.join(__dirname, 'src')},
      { test: /\.css$/, loader: "style-loader!css-loader", include: path.join(__dirname, 'src')},
      { test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ], include: path.join(__dirname, 'src')},
    ]

  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: { warnings: false },
      minimize: true
    }),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'dist', 'index.html'),
      template: './src/index.html'
    })
  ]
}

if (process.env.NODE_ENV == 'production') {
  config.entry = {
    main: './src/index'
  }
  config.output = {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: '[name].[chunkhash].js',
    publicPath: '/assets/'
  }
}

module.exports = config
