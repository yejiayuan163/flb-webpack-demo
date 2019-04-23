<template>
    <div>
        <div class="wrap-index hasbom" style="height:100%;">
            <section style="overflow:hidden;" id="ban" class="ban">
                <img src="../../static/img/myWealth.jpg" width="100%">
            </section>
        </div>
        <div>{{introduction}}</div>
        <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
        <Footer nowIndex="3"></Footer>
    </div>

</template>

<script>
  import Footer from 'src/component/footer'
  import * as echarts from 'echarts'
  import Vuex from 'vuex'
  import {helloWorld,setItem} from '../../static/js/util'

  // 基于准备好的dom，初始化echarts实例
  export default {
    name: 'wealth.vue',
    data(){
      return{
        introduction:''
      }
    },
    created(){
      this.introduction = helloWorld()
      setItem('test1','testValue1')
    },
    mounted(){
    },
    components: {
      Footer
    },
    methods:{


    },
  }
</script>

<style scoped>

</style>