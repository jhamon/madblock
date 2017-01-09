var path = require('path');
var webpack = require('webpack');

module.exports = [{
  entry: './src/popup/jsx/app.jsx',
  output: { path: __dirname, filename: 'build/popup.js' },
  module: {
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
  }
}, {
  entry: './src/content/js/unpresidented.js',
  output: { path: __dirname, filename: 'build/content.js' },
  module: {
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
  },
},
];