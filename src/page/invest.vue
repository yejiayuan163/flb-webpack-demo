<template>
    <div>
        <div class="wrap-index hasbom" style="height:100%;">
            <section style="overflow:hidden;" id="ban" class="ban">
                <img src="../../static/img/autoBidPro.jpg" width="100%">
            </section>
        </div>
        <Footer nowIndex="1"></Footer>
    </div>
</template>

<script>
  import Footer from'src/component/footer'

  export default {
    name: 'invest.vue',
    components:{
      Footer
    }
  }
</script>

<style scoped>

</style>