<template>
  <!-- footer start -->
  <nav class="mui-bar mui-bar-tab footer">
    <router-link to="/index" class="tab"><i class="iconfont icon-home"></i><p>首页</p></router-link>
    <router-link to="/classify" class="tab"><i class="iconfont icon-fenlei"></i><p>分类</p></router-link>
    <router-link to="/prolist" class="tab"><i class="iconfont icon-sale"></i><p>特卖</p></router-link>
    <router-link to="/car" class="tab"><i class="iconfont icon-car"></i><p>购物车</p></router-link>
    <router-link to="/member" :class = "[isActive ? 'active' : '', 'tab']"><i class="iconfont icon-my"></i><p>我的</p></router-link>
  </nav>
  <!-- footer end -->
</template>

<script>

    export default {
      data(){
        return{
          isActive:false
        }
      },
      created(){

        switch (this.$route.meta[0]){
          case '会员中心':
           this.isActive = true;
           break;
          case '订单管理':
            this.isActive = true;
            break;
          case '收货地址':
            this.isActive = true;
            break;
        }
      }

    }
</script>

<style scoped>

</style>
