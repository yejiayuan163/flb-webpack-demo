<template>
    <div>
        <div class="wrap-index hasbom" style="height:100%;">
            <section style="overflow:hidden;" id="ban" class="ban">
                <img src="../../static/img/autoBidPro.jpg" width="100%">
            </section>
        </div>
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
        <Footer nowIndex="1"></Footer>
    </div>
</template>

<script>
  import Footer from 'src/component/footer'
  import * as echarts from 'echarts'
  import Vuex from 'vuex'

  // 基于准备好的dom，初始化echarts实例
  export default {
    name: 'invest.vue',
    mounted(){
      const a=1
      const myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
      })
    },
    components: {
      Footer
    }
  }
</script>

<style scoped>

</style>