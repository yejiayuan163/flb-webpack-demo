const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')//混溶webpack.common.js的webpack配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//提取css到单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')//压缩css插件
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');


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
  // optimization: {
  //   concatenateModules: true
  // },
  optimization: {
    minimize: false
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
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          /*
          是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
          可以设置为false
         */
          beautify: false,
          /*
           是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
          */
          comments: false
        },
        compress: {
          /*
          是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
          不大的警告
         */
          warnings: false,
          /*
           是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
          */
          drop_console: true,
        }
      }
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest: require('./static/dll/manifest/vue-manifest.json')
    }),//DllReferencePlugin插件读取vendor-manifest.json文件
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
    }]),//用于dll包插入到index.html
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