/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = ({ mode = 'development' } = {}) => {
  const isProductionBuild = mode === 'production';

  const defaultPlugins = [
    new HtmlWebPackPlugin({
      template: './app/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin(
      [
        { from: './app/assets', to: 'assets' },
        { from: './lib/core/assets', to: 'assets' },
        { from: './lib/games/assets', to: 'assets' },
      ],
    ),
  ];

  const productionPlugins = [
    new CleanWebpackPlugin(['build']),
  ];
  const devPlugins = [
    new BrowserSyncPlugin({
      proxy: 'localhost:8080',
      port: 3009,
      files: [
        'app/**/*.css',
        'app/**/*.js',
        'app/**/*.html',
      ],
      reloadDelay: 0,
      notify: false,
    }),
  ];

  return {
    entry: {
      polyfill: 'babel-polyfill',
      main: './app',
    },
    output: {
      filename: '[name].[contenthash].bundle.js',
      chunkFilename: '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          },
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: 'file-loader',
          },
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          loader: 'file-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      ...defaultPlugins,
      ...isProductionBuild ? productionPlugins : devPlugins,
    ],
    devtool: isProductionBuild ? 'source-map' : false,
    devServer: {
      open: false,
      historyApiFallback: {
        index: '/',
      },
    },
  };
};
