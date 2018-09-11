const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('../config');

module.exports = {
  mode: 'production',

  entry: [
    'babel-polyfill',
    path.join(config.projectPath, 'src', 'reactApp'),
  ],

  output: {
    path: path.join(config.projectPath, 'dist'),
    filename: 'bundle.min.js',
    publicPath: '/',
  },

  externals: {
    react: 'React',
    'prop-types': 'PropTypes',
    'react-dom': 'ReactDOM',
    // leaflet: 'L',
  },

  // devtool: 'hidden-source-map',

  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       // sourceMap: true,
  //       sourceMap: false,
  //       uglifyOptions: {
  //         output: {
  //           comments: false,
  //           beautify: false,
  //         },
  //         compress: {
  //           warnings: false,
  //           sequences: true,
  //           dead_code: true,
  //           drop_debugger: true,
  //           comparisons: true,
  //           conditionals: true,
  //           evaluate: true,
  //           booleans: true,
  //           unused: true,
  //           drop_console: true,
  //         },
  //       },
  //     }),
  //   ],
  // },

  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(['dist'], { root: path.join(config.projectPath) }),
    new webpack.DefinePlugin({ env: JSON.stringify('production') }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new webpack.ProvidePlugin({ Promise: 'bluebird' }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({ filename: '[name].min.css' }),
    new CopyWebpackPlugin([
      path.join(config.projectPath, 'assets', 'favicon-16.png'),
      path.join(config.projectPath, 'assets', 'favicon-32.png'),
      path.join(config.projectPath, 'assets', 'favicon-96.png'),
      path.join(config.projectPath, 'assets', 'apple-icon-120.png'),
      path.join(config.projectPath, 'assets', 'apple-icon-152.png'),
      path.join(config.projectPath, 'assets', 'apple-icon-167.png'),
      path.join(config.projectPath, 'assets', 'apple-icon-180.png'),
      path.join(config.projectPath, 'assets', 'icons-192.png'),
      path.join(config.projectPath, 'assets', 'icons-512.png'),
      path.join(config.projectPath, 'manifest.json'),
      path.join(config.projectPath, 'src', 'serviceWorker.js'),
      path.join(config.projectPath, 'views', 'offline.html'),
    ], {}),
    new HtmlWebpackPlugin({
      template: './views/index.ejs',
      hash: true,
      showErrors: false,
      minify: { collapseWhitespace: true, removeComments: true },
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.eot$|\.woff$|\.woff2$|\.ttf$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },
};
