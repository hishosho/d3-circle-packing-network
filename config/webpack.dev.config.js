const merge = require('webpack-merge')
const common = require('./webpack.base.config')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'dev/[name].[hash:8].js',
  },
  devServer: {
    open: true,
    compress: true,
    hot: true,
    inline: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
})