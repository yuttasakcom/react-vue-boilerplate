const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const PRODUCTION = process.env.NODE_ENV === 'production'
const DIST_DIR = 'dist'

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    build: resolve('src/index.js'),
    vendor: ['react', 'react-dom', 'react-vue'] 
  },
  output: {
    path: resolve(DIST_DIR),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.vue$/,
        loader: 'react-vue-loader',
        options: {
          vue: './vue.config.js'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: ['raw-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[hash:7].[ext]'
            }
          },
          'img-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    new webpack.LoaderOptionsPlugin({
        minimize: PRODUCTION
    }),
    new CleanWebpackPlugin([DIST_DIR], {
      _root: __dirname,
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin('[name].[contenthash].css')
  ]
}

if (PRODUCTION) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}