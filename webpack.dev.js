const merge = require('webpack-merge');
const webpack = require('webpack')
const common = require('./webpack.common.js');
console.log('----------------------------------');
console.log(process);
console.log('------------------------------------------');
module.exports = merge(common, {
  mode: 'development', // 不压缩代码,加快编译速度
  devtool: 'source-map', // 提供源码映射文件调试使用

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', "css-loader", "postcss-loader"]//postcss-loader给css自动添加前缀
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      ENV: JSON.stringify('DEVELOPMENT'),
      API:'www.baidu.com',
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ]
})