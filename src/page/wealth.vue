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
      this.drawPid()
    },
    components: {
      Footer
    },
    methods:{
      //画饼
      drawPid(){
        let piePatternSrc = '../../static/img/piePattern.jpg';
        let bgPatternSrc ='../../static/img/bgPattern.png';

        let piePatternImg = new Image();
        piePatternImg.src = piePatternSrc;
        let bgPatternImg = new Image();
        bgPatternImg.src = bgPatternSrc;

        let itemStyle = {
          normal: {
            opacity: 0.7,
            color: {
              image: piePatternImg,
              repeat: 'repeat'
            },
            borderWidth: 3,
            borderColor: '#235894'
          }
        };
        let option = {
          backgroundColor: {
            image: bgPatternImg,
            repeat: 'repeat'
          },
          title: {
            text: '平台标的期限分布',
            textStyle: {
              color: '#235894'
            }
          },
          tooltip: {},
          series: [{
            name: 'pie',
            type: 'pie',
            selectedMode: 'single',
            selectedOffset: 30,
            clockwise: true,
            label: {
              normal: {
                textStyle: {
                  fontSize: 18,
                  color: '#235894'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#235894'
                }
              }
            },
            data:[
              {value:123, name:'6-12个月（含6个月）'},
              {value:310, name:'12个月以上（含12个月）'},
              {value:234, name:'3个月以内（不含3个月'},
              {value:135, name:'3-6个月（含3个月）'},
            ],
            itemStyle: itemStyle
          }]
        };
        const myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(option, true)
      }
    },
  }
</script>

<style scoped>

</style>