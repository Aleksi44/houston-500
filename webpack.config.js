/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        { from: './lib/core/managers/assets', to: 'assets' },
      ],
    ),
  ];

  const productionPlugins = [
    new CleanWebpackPlugin(['build']),
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
      ],
    },
    plugins: [
      ...defaultPlugins,
      ...isProductionBuild ? productionPlugins : [],
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
