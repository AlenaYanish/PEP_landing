const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[contenthash].bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].bundle.css',
      chunkFilename: '[id].[contenthash].bundle.css'
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new webpack.ProvidePlugin({ $: 'jquery' }),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: "./img", to: path.resolve(__dirname, 'dist/img') },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              import: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                ]
              }
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|woff|woff2|svg|eot|ttf|gif|jpe?g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: '[path][name].[md5:hash:hex:12].[ext]',
            },
          },
        ],
      },
    ],
  },
};
