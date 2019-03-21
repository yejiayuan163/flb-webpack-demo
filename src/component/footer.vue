<template>
    <div>
        <nav>
            <div class="navbar">
                <ul  class="nav">
                    <li v-for="(item,index) in footList" :class="{'actived': index==nowIndex}" :key="index" >
                        <router-link tag="a" :to="item.url" >
                            <i :class="item.name"></i>
                            <p>
                                {{item.title}}
                            </p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        footList: [
          {
            name: 'home',
            url: '/index',
            title: '首页'
          },
          {
            name: 'financ',
            url: '/invest',
            title: '出借'
          },
          {
            name: 'shop',
            url: '/help',
            title: '更多'
          },
          {
            name: 'wealth',
            url: '/wealth',
            title: '我的'
          }
        ],
      }
    },
    props:{
      nowIndex:{
        type: String,
        default: '0'
      }
    }
  }
</script>
<style scoped>

    .footbar, .navbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 990;
        border-top: 1px solid #ededed;
        background: #f8f8f8;
    }

    .nav {
        display: table;
        width: 100%;
        table-layout: fixed;
        border-collapse: separate;
    }

    .nav li {
        float: none;
        display: table-cell;
        width: 1%;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        background-image: none;
        white-space: nowrap;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
    }

    .nav li a {
        height: 49px;
        display: block;
        font: 1em/49px 'Micorsoft yahei';
        text-align: center;
        color: #778899;
        padding: 4px 0 0;
    }

    .nav li.actived a {
        color: #2233bb;
    }

    .nav i {
        display: block;
        height: 26px;
        line-height: 26px;
        background-repeat: no-repeat;
        background-size: 26px;
        background-position: center center;
        margin-bottom: 2px;
    }

    .nav p {
        line-height: 1;
        font-size: 11px;
    }

    .nav li .home {
        background-image: url(../../static/img/home.png);
    }

    .nav li.actived .home {
        background-image: url(../../static/img/home-on.png);
    }

    .nav li .financ {
        background-image: url(../../static/img/financ.png);
    }

    .nav li.actived .financ {
        background-image: url(../../static/img/financ-on.png);
    }

    .nav li .wealth {
        background-image: url(../../static/img/wealth.png);
    }

    .nav li .shop {
        background-image: url(../../static/img/find.png);
    }

    .nav li.actived .shop {
        background-image: url(../../static/img/find-on.png);
    }

    .nav li.actived .wealth {
        background-image: url(../../static/img/wealth-on.png);
    }

    .nav li .index-moer {
        background-image: url(/static/img/more-help/more-help.png);
    }

    .nav li.actived .index-moer {
        background-image: url(/static/img/more-help/more-help2.png);
    }

    .footbar {
        border: 0;
        background: transparent;
    }
</style>