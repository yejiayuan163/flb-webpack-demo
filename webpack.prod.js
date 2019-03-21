const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')//混溶webpack.common.js的webpack配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//提取css到单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')//压缩css插件

const path = require('path')

module.exports = merge(common, {
  mode: 'production', // 压缩代码
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 提取css到外部文件中
            options: {
              publicPath: '/dist/css/'
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',//将输出文件放在js文件夹下
      chunkFilename: 'css/[id].css'//按需加载的文件将输出文件放在js文件夹下
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('PRODUCTION'),
      API: 'www.baidu.com'
    }),//定于全局

  ]
})