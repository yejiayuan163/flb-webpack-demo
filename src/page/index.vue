<template>
    <div>
        <div class="wrap-index hasbom" style="height:100%;">
            <section style="overflow:hidden;" id="ban" class="ban">
                <img src="../../static/img/swiper.jpg" width="100%">
            </section>
        </div>
        <div>运行环境：{{environment}}</div>
        <div class="animat">测试autoprefixer</div>
        <Footer nowIndex="0"></Footer>
    </div>
</template>

<script>
  import Footer from'src/component/footer'
  import Vue from 'vue'
  import Vuex from 'vuex'
  import vueRouter from 'vue-router';

  export default {
    name: 'index.vue',
    data(){
      return {
        environment: ENV == 'DEVELOPMENT' ? '开发环境' : '生产环境'
      }
    },
    created(){
      console.log('hello world!')
      console.log(ENV,'123')
      console.log('process',process)
      console.log('process.env',process.env)
    },
    components:{
      Footer
    }
  }
</script>

<style scoped>
    @keyframes myfirst
    {
        0%   {background:red; left:0px; top:0px;}
        50%  {background:blue; left:200px; top:0px;}
        100% {background:red; left:0px; top:0px;}
    }
    .animat
    {
        width:100px;
        height:100px;
        background:red;
        position:relative;
        animation:myfirst 5s linear 2s infinite alternate;
    }
</style>