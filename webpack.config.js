var path = require('path');
var webpack = require('webpack');

var es6moduleConfig = {
  loaders: [
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }
  ]
};

module.exports = [{
  entry: './src/popup/jsx/app.jsx',
  output: { path: __dirname, filename: 'build/popup.js' },
  module: es6moduleConfig
}, {
  entry: './src/content/js/unpresidented.js',
  output: { path: __dirname, filename: 'build/content.js' },
  module: es6moduleConfig,
}, {
  entry: './src/background/background.js',
  output: { path: __dirname, filename: 'build/background.js' },
  module: es6moduleConfig,
}];