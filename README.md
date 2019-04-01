# 前言

在前端项目中，你是否考虑过这些问题：

（1）开发时，代码按模块划分文件以方便管理。上线时，减少代码文件数量以节省请求开销。

（2）开发时，代码规范命名、详细注释以方便人类阅读。上线时，代码越短越好减少文件体积以方便机器获取。

（3）开发时，编写最简单的代码以提高开发效率。上线时，以多种方式实现代码以兼容不同浏览器运行。
开发环境与生产环境有着不同的需求，如下图：

![开发环境VS线上环境](https://upload-images.jianshu.io/upload_images/17015329-755a36aadc7fdee8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

两者需求的实现方式是矛盾，如：线上要求文件越少越好，以减少HTTP请求的开销。开发要求按模块划分多文件，以便于开发时的管理。前者的目的是减少HTTP请求，后者却引起更多的HTTP请求，影响页面性能。

如今，我们能通过webpack等自动化打包工具，完成从开发的源代码到线上的生产代码的自动化构建。
![webpack构建过程](https://upload-images.jianshu.io/upload_images/17015329-e8af8e84610f5a2f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

本文以上述开发与生产的矛盾为出发点，基于webpack4实现前端工程优化
# 一、CSS
webpack提供了相应的plugin、loader实现对css文件的压缩、抽离、兼容性处理
###     1、压缩
 [*optimize-css-assets-webpack-plugin*](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)，示例如下：
```
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')//压缩css插件

module.exports = merge(common, {
  plugins: [
    new OptimizeCssAssetsPlugin(),
  ]
})
```

###     2、抽离CSS文件
插件[*mini-css-extract-plugin*](https://www.npmjs.com/package/mini-css-extract-plugin)根据*require.ensure*的chunk，将页面的css代码抽离到单独的css文件中。
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//提取css到单独文件

module.exports = merge(common, {
  mode: 'production', // 压缩代码
  module: {
    rules: [
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
      filename: 'css/[name].css',//将输出文件放在dist/css文件夹下
      chunkFilename: 'css/[id].css'//按需加载的文件将输出文件放在js文件夹下
    })
  ]
})
```
###     3、兼容性处理
[*PostCss*](https://github.com/postcss/postcss/blob/HEAD/README-cn.md)是一个样式处理工具，它通过自定义的插件和工具生态体系来重新定义css。PostCss在webpack通过[*postcss-loader*](https://www.webpackjs.com/loaders/postcss-loader/)实现，配合[*autoprefixer*](https://www.npmjs.com/package/autoprefixer)为样式添加前缀，兼容不同浏览器。示例如下：
```
//postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
//webpack.common.js
module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
       use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
})
```
# 二、JS

###     1、压缩
Webpack4 默认提供的 UglifyJS 插件，只需要设置mode为production即可。
```
module.exports = merge(common, {
  mode: 'production', //开启生产环境的默认设置
}
```
但由于 UglifyJS 采用单线程压缩，速度较慢。建议采用支持并行压缩的 [webpack-parallel-uglify-plugin](https://www.npmjs.com/package/webpack-parallel-uglify-plugin) 插件，可大大减少构建时间。配置代码如下：
```
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
module.exports = merge(common, {
  optimization: {
      minimize: false//关闭默认的UglifyJS 压缩功能
  },
  plugins: [
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          /* 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
          可以设置为false*/
          beautify: false,
          /*是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false*/
          comments: false
        },
        compress: {
          /*是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
          不大的警告*/
          warnings: false,
          /*是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句*/
          drop_console: true,
        }
      }
    }),
  ]
})
```

###     2、分包
默认地，webpack会将所有的js打包成一个boundle.js文件，这个文件一般有几百k到几M。首屏加载时，boundle.js包含了很多并未用得上的代码。因此，我们可以利用webpack的*require.ensure*语法实现分包，以提高首屏加载的速度。demo使用vue的示例如下：
```
import Vue from 'vue'
import vueRouter from 'vue-router';
// 将vueRouter和vue绑定起来
Vue.use(vueRouter)

// 导入.vue组件对象,webpack根据chunk参数，将相同chunk名的组件打包在一起
const index = resolve => {require.ensure([], () => {resolve(require('src/page/index.vue'))},'index')}
const invest = resolve => {require.ensure([], () => {resolve(require('src/page/invest.vue'))},'invest')}
const help = resolve => {require.ensure([], () => {resolve(require('src/page/help.vue'))},'help')}
const wealth = resolve => {require.ensure([], () => {resolve(require('src/page/wealth.vue'))},'wealth')}

// 1.0.3 定义路由规则
var router = new vueRouter({
  routes:[
    {name:'default',path:'/',redirect:'/index'},
    {name:'index',path:'/index',component:index,meta:{title: '分利宝官网-专注小微经济实体融资的网络借贷信息中介服务平台 '}},
    {name:'invest',path:'/invest',component:invest,meta:{title: '投资页面'}},
    {name:'help',path:'/help',component:help,meta:{title: '帮助中心 '}},
    {name:'wealth',path:'/wealth',component:wealth,meta:{title: '我的财富'}},
  ]
});

export default router;
```
           

###     3、依赖包单独处理

对于依赖的第三方库，比如*vue*，*vuex*等，我们可以使用[*DllPlugin*](https://www.webpackjs.com/plugins/dll-plugin/)，将依赖库预先打包，存在项目的静态资源文件夹。webpack打包项目代码时，只需要打包我们的业务代码，并根据*DllReferencePlugin*查找已打包的依赖库。这样就可以快速的提高打包的速度。示例代码如下：
```
//webpack.dll.config.js
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
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, './static/dll/manifest', '[name]-manifest.json'), //生成上文说到清单文件，放在当前build文件下面，这个看你自己想放哪里了。
      name: '[name]_library'
    }),
  ]
};
//webpack.prod.js
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
module.exports = merge(common, {
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest: require('./static/dll/manifest/vue-manifest.json')
    }),//读取包含第三方库映射关系的vue-manifest.json文件，读取第三方依赖
    new AddAssetHtmlPlugin([{
      filepath: path.resolve(__dirname,'./static/dll/js/vue.dll.js'),
      includeSourcemap: false,
      hash: true,
    }]),//将依赖库的dll包插入到index.html中
  ]
})
```
###     4、处理线上旧缓存
因为缓存，web应用的性能、体验大大提高。但当我们需要部署新代码上线时，常常因为缓存问题，导致文件不能及时更新，测试同学追着投诉代码没生效。webpack的[*html-webpack-plugin*](https://www.npmjs.com/package/html-webpack-plugin)插件很好地解决了这个问题。示例代码如下：
```
//webpack.common.js
module.exports = {
  entry:{app: './src/index.js'},
  output: {
    filename: 'js/[name].[hash].js',//将输出文件放在js文件夹下，以哈希值命名，解决线上缓存的问题
    path: path.join(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',//引用的模板
      filename: 'index.html'//生成模板的名字
    }),
  ]
}
```
插件根据template，生成一个带有output里filename的script标签，因为以哈希值命名，每次部署线上的文件名称都不同，解决了缓存的问题。



#三、 环境配置
在实际项目中，根据开发流程，代码需要运行在不同的环境。如我司有本地环境、测试环境、准线环境、生产环境。不同环境需要调用不同地址的接口。我司在移动端重构前，需要运维手动修改配置文件，再部署到服务器。但多一个人手操作的流程，就多一分出错的风险。如今，通过package.json文件配置npm脚本，不同环境跑不同的脚本。如下所示：
```
"scripts": {
    "dev": "webpack-dev-server --inline --hot --open --port 8098 --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js",
    "build:dll": "webpack --config webpack.dll.config.js"
  },
```
不同的webpack配置文件，需要设置不同的环境变量，webpack提供了*DefinePlugin*满足我们的需求。
```
module.exports = merge(common, {
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'//webpack构建后生成一个全局的环境变量process.env.NODE_ENV，根据此变量，调用对应的接口，应用不同的配置
      }
    })
  ]
})
```
运维同学再搭配jenkins，代码合并到gitlab上就可以实现自动构建啦。
#总结
全文使用webpack实践了前端工程优化，然而，实际的项目优化需求要根据项目的痛点来定。如何分割代码、是否要抽离样式文件，是否要引入规范。需要不断的实践、试错。愿各位同学们砥砺前行，找到你们的最优实践。

本文所用到的demo[任意门](https://github.com/18819467361/flb-webpack-demo)，如果能帮到你，请不吝赐个小星星。

            
