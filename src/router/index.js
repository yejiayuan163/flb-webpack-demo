//定义路由
// 1.0.0 导包
import Vue from 'vue'
import vueRouter from 'vue-router';
// 1.0.2 将vueRouter和vue绑定起来
Vue.use(vueRouter)

// 导入.vue组件对象
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
