const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode:'production',
  entry: {
    echarts: ['echarts'],
    vue:['vue'],
    router:['vue-router'],
    vuex:['vuex'],
    polyfill:['babel-polyfill']
  },
  output: {
    path: path.join(__dirname, './static/dll/js'), //放在项目的static/js目录下面
    filename: '[name].dll.js', //打包文件的名字
    library: '[name]_library' //可选 暴露出的全局变量名
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, './static/dll/manifest', '[name]-manifest.json'), //生成上文说到清单文件，放在当前build文件下面，这个看你自己想放哪里了。
      name: '[name]_library'
    }),
  ]
};