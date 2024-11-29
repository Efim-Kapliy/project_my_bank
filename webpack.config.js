const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');

require('dotenv').config();

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

const plugins = [
  new DefinePlugin({
    'process.env': JSON.stringify(process.env),
  }),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.html',
    minify: {
      collapseWhitespace: !isDev,
      removeComments: !isDev,
    },
  }),
  new MiniCssExtractPlugin({
    filename: isDev ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
  }),
];

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode,
  entry: './index.js',
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'public/[name].[contenthash][ext][query]',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 7777,
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
                  },
                },
              ],
            ],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: isDev ? '[path][name]__[local]--[hash:base64:7]' : '[local]_[hash:base64:7]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /^((?!\.module).)*s[ac]ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  'autoprefixer', // Использование autoprefixer
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
