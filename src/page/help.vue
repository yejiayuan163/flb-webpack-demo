<template>
    <div>
        <div class="wrap-index hasbom" style="height:100%;">
            <section style="overflow:hidden;" id="ban" class="ban">
                <img src="../../static/img/hyzx_more.png" width="100%">
            </section>
        </div>
        <div class="helpCenter" style="height:100%;">
            帮助中心
        </div>
        <Footer nowIndex="2"></Footer>
    </div>
</template>

<script>
  import Footer from 'src/component/footer'

  export default {
    name: 'more-help',
    components: {
      Footer
    }
  }
</script>

<style scoped>
    .helpCenter{
        color: #3d3d3d;
        font-size: 20px;
        text-align: center;
    }
</style>