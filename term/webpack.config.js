var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  devtool: 'source-map'
};
