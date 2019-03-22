const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')//混溶webpack.common.js的webpack配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//提取css到单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')//压缩css插件
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

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
    }),//定于全局变量
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname),
    //   manifest: require('./static/dll/manifest/echarts-manifest.json')
    // }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest: require('./static/dll/manifest/vue-manifest.json')
    }),//用于dll包引入
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest: require('./static/dll/manifest/router-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest: require('./static/dll/manifest/vuex-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest: require('./static/dll/manifest/polyfill-manifest.json')
    }),
    //这个主要是将生成的vendor.dll.js文件加上hash值插入到页面中。
    // new AddAssetHtmlPlugin([{
    //   filepath: path.resolve(__dirname,'./static/dll/js/echarts.dll.js'),
    //   includeSourcemap: false,
    //   hash: true,
    // }]),
    new AddAssetHtmlPlugin([{
      filepath: path.resolve(__dirname,'./static/dll/js/polyfill.dll.js'),
      includeSourcemap: false,
      hash: true,
    }]),//用于dll包引入
    new AddAssetHtmlPlugin([{
      filepath: path.resolve(__dirname,'./static/dll/js/router.dll.js'),
      includeSourcemap: false,
      hash: true,
    }]),
    new AddAssetHtmlPlugin([{
      filepath: path.resolve(__dirname,'./static/dll/js/vue.dll.js'),
      includeSourcemap: false,
      hash: true,
    }]),
    new AddAssetHtmlPlugin([{
      filepath: path.resolve(__dirname,'./static/dll/js/vuex.dll.js'),
      includeSourcemap: false,
      hash: true,
    }])
  ]
})