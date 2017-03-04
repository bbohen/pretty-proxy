const path = require('path');

// const port = process.env.PORT || 3000;

module.exports = {
  cache: true,
  context: path.resolve(__dirname, '../'),
  devServer: {
    publicPath: '/',
    stats: {
      colors: true,
    },
  },
  devtool: 'source-map',
  entry: {
    js: './app/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
