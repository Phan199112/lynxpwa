/* eslint-disable global-require, no-console */
const compression = require('compression');
const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);

const env = app.get('env');
const config = require('./config');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(compression());

// since index.html is also going to be served from dist, delete it in dist
// folder after running dev or simply in your browser access website though a
// different url than the one you use to check build results, i.e. localhost:3001/smtn
app.use(express.static('dist'));

app.get('/manifest.json', (req, res) => res.sendFile(`${__dirname}/manifest.json`));
app.get('/serviceWorker.js', (req, res) => res.sendFile(`${__dirname}/src/serviceWorker.js`));
app.get('/offline.html', (req, res) => res.sendFile(`${__dirname}/views/offline.html`));

if (env === 'production') {
  app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));
} else {
  app.get('/*', (req, res) => res.render('index', { env }));
}

const port = process.env.PORT || config.serverPort;
server.listen(port, () => console.log(`server running on port ${port}!`));

if (env === 'development') {
  console.log('starting webpackDevServer...');

  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server'); // eslint-disable-line import/no-extraneous-dependencies
  const webpackConfig = require('./webpack/webpack.config.dev');

  const devServer = new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    watchOptions: { poll: true },
    host: 'localhost',
    port: config.webpackDevServerPort,
    publicPath: `http://localhost:${config.webpackDevServerPort}/`,
    compress: true, // serve gzipped bundle
    stats: { colors: true, errorDetails: true },
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true, // respond to 404s with index.html
  });

  devServer.listen(config.webpackDevServerPort);
}
