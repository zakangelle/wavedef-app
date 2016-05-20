const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const childProcess = require('child_process');
const VERSION = childProcess.execSync('git rev-parse HEAD').toString().substr(0, 8);

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './build/index.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('index.[hash].css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: './src/static/robots.txt' },
      { from: './src/static/favicon.ico' }
    ]),
    new StatsWriterPlugin({
      transform: (data) => {
        return JSON.stringify({
          rev: VERSION,
          date: (new Date()).toString()
        }, null, 2);
      },
      filename: 'meta.json'
    })
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: { wavedef: 'wavedef' },
    root: [
      path.resolve('./lib')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'lib/wavedef')
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
};
