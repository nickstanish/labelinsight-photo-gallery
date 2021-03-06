const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
  devtool: 'source-map',
  entry: [
    'es6-promise/auto',
    'whatwg-fetch',
    './src/js/main.js'
  ],
  output: {
    libraryTarget: 'umd',
    path: "./dist/public",
    publicPath: "public",
    filename: "js/dist.js"
  },
  stats: {
    colors: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ["src/js", "src", "node_modules"]
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        include: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /.scss$/,
        loader: ExtractTextPlugin.extract('style?sourceMap', '!css?sourceMap!sass?sourceMap')
      }
    ]
  },
  plugins: [
      new ExtractTextPlugin('css/styles.css')
  ]
};

module.exports = webpackConfig;
