const path = require('path');
const webpack = require('webpack');
const config = require('../config');

module.exports = {
  mode: 'development',

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${config.webpackDevServerPort}`,
    'webpack/hot/only-dev-server',
    path.join(config.projectPath, 'src', 'reactApp'),
  ],

  output: {
    path: path.join(config.projectPath, 'dist'),
    filename: 'bundle.js',
    publicPath: `http://localhost:${config.webpackDevServerPort}/`,
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // unsafeCache: false,
  },

  node: {
    fs: 'empty',
    tls: 'empty',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // classical way of loading styles for external libraries
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.eot$|\.woff$|\.woff2$|\.ttf$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },
};
