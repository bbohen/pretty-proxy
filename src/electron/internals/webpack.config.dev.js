const path = require('path');
const webpack = require('webpack'); // eslint-disable-line node/no-unpublished-require
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line node/no-unpublished-require

module.exports = {
  cache: true,
  context: path.resolve(__dirname, '../'),
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, '../'),
    publicPath: '/',
    stats: {
      colors: true,
    },
  },
  devtool: 'eval',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000/',
      'webpack/hot/only-dev-server',
      './app/index.js',
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../', 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.jpg', '.png', '.gif', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Pretty Proxy',
      filename: 'index.html',
      template: 'index.template.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
