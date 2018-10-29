<template>
  <div>
    <headback></headback>
  <div class="mui-content">
    <div class="success">
      <p><i class="iconfont icon-select-fill"></i></p>
      <p class="dsp">支付成功
        <br>支付金额：<span class="c5">¥{{money}}</span></p>
      <p class="opn"><router-link to="/prolist" class="btn">继续购物</router-link></p>
    </div>
  </div>
    <foot></foot>
  </div>
</template>

<script>
  import headback from '@/components/headback'
  import foot from '@/components/foot'
  import {isLogin} from '@/api/function'
    export default {
      data(){
        return{
          money:this.$route.query.money
        }
      },
      created(){
        isLogin(this)
      },
      methods:{

      },
        components:{
          headback,
          foot
        }
    }
</script>

<style scoped>

</style>
