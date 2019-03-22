<style scoped>
    .test > p {
        background-color: aqua;
    }
</style>

<template>
    <div>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
  import Vue from 'vue';
  import Vuex from 'vuex';
  Vue.use(Vuex);
  export default {
    created(){
      console.log(1)
    },
    data() {
      return {
        vue: 'vue'
      }
    },
    components:{

    }
  }
</script>
<style src="static/css/base.css">

</style>