'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var config = module.exports = {
  entry: {
    application: [
      path.resolve(__dirname, 'web/static/css/index.scss'),
      path.resolve(__dirname, 'web/static/js/index.js')
    ],
  },

  output: {
    path: path.resolve(__dirname, 'priv/static'),
    filename: 'js/index.js',
  },

  resolve: {
    extensions: ['', '.js', '.scss'],
    modulesDirectories: ['node_modules'],
  },

  module: {
    noParse: /vendor\/phoenix/,
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['react', 'es2015', 'stage-2', 'stage-0'],
        },
      },
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'sass' ]
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin('css/index.css'),
  ],
};
