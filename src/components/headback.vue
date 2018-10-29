<template>
  <header class="mui-bar mui-bar-nav header" id="header">
    <h1 v-if="$route.meta == '分类' ||$route.meta == '二级分类' " class="mui-title">分类</h1>
    <h1 v-if="$route.meta == '特卖'" class="mui-title">特卖</h1>
    <h1 v-if="$route.meta == '登录'" class="mui-title">登录</h1>
    <h1 v-if="$route.meta == '购物车'" class="mui-title">购物车</h1>
    <h1 v-if="$route.meta == '注册'" class="mui-title">注册</h1>
    <h1 v-if="$route.meta == '产品列表'" class="mui-title">列表</h1>
    <h1 v-if="$route.meta == '提交订单'" class="mui-title">提交订单</h1>
    <h1 v-if="$route.meta == '新增地址'" class="mui-title">新增地址</h1>
    <h1 v-if="$route.meta == '选择收货地址'" class="mui-title">选择收货地址</h1>
    <h1 v-if="$route.meta == '支付成功'" class="mui-title">支付成功</h1>
    <h1 v-if="$route.meta == '订单管理'" class="mui-title">我的订单</h1>
    <h1 v-if="$route.meta == '收货地址'" class="mui-title">收货地址</h1>
    <h1 v-if="$route.meta == '订单详情'" class="mui-title">订单详情</h1>
    <h1 v-if="$route.meta == '找回密码'" class="mui-title">找回密码</h1>
    <h1 v-if="$route.meta == '订单评价'" class="mui-title">订单评价</h1>
    <h1 v-if="$route.meta == '再次激活'" class="mui-title">再次激活</h1>
    <div @click="pushlogin()"  v-if="$route.meta == '登录'"  class="edit-text">注册</div>
    <div @click="pushReg()"  v-if="$route.meta == '注册'"  class="edit-text">登录</div>
    <div @click.stop.prevent="back()" class=" mui-icon mui-icon-left-nav mui-pull-left iconfont icon-left"></div>
    <div v-if="$route.meta == '产品详情'" class="h-nav">
      <a class="tab active">商品</a>
      <a  class="tab">评论</a>
    </div>
    <router-link v-if="$route.meta == '产品详情'" to="/car"  class="carts" id="carts"><i class="iconfont icon-car"></i><span class="carnum" id="carnum">{{allNum}}</span></router-link>

  </header>
</template>

<script>

  import { mapGetters } from 'vuex'
    export default {
      data(){
        return{

        }
      },
      methods:{
        back(){
          this.$router.back(-1)
        },
        pushlogin(){
          this.$router.push('/reg')
        },
        pushReg(){
          this.$router.push('/login')
        }
      },
      created(){

      },
      computed:{
        ...mapGetters({
          'cartNum': 'cart/cartNum',
          'allNum': 'cart/allNum'
        })
      }
    }
</script>

<style scoped>

</style>
