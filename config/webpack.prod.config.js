const merge = require('webpack-merge')
const common = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // 使用多进程提高构建速度
        extractComments: false, // 禁止生成license文件
        terserOptions: {
          compress: { // 删除console.log代码
            drop_console: true,
            pure_funcs: ['console.log']
          },
          output: {
            comments: false // 删除注释代码
          }
        }
      }),
    ],
  },
})