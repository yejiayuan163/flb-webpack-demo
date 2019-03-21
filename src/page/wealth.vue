<template>
    <div>
        <div class="wrap-index hasbom" style="height:100%;">
            <section style="overflow:hidden;" id="ban" class="ban">
                <img src="../../static/img/myWealth.jpg" width="100%">
            </section>
        </div>
        <Footer nowIndex="3"></Footer>
    </div>

</template>

<script>
  import Footer from 'src/component/footer'

  export default {
    name: 'mywealth',
    components: {
      Footer
    }
  }
</script>

<style scoped>

</style>