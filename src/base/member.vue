<template>
      <div>
        <div class="mui-content">
          <div class="user-bar-bg">
            <a href="#" class="user-bar clearfix">
              <img src="@/assets/images/user.png" class="avatar">
              <h4>{{username}}</h4>
             <!-- <p class="text"><i class="iconfont icon-shouji"></i>130****0532</p>-->
              <span @click="quit()" class="dsp">退出登录</span>
              <i class="iconfont icon-right"></i>
            </a>
          </div>
          <div class="user-order">
            <router-link to="/myOrder" class="tap title-bar">我的订单<span class="view">查看全部订单 <i class="iconfont icon-right"></i></span></router-link>

          </div>
          <div class="user-nav">
            <div class="item mui-table-view-cell">
              <router-link to="/myOrder" class="tap">
                <i class="iconfont icon-20 icon-dingdan"></i>
                订单管理
                <i class="iconfont icon-right"></i>
              </router-link>
            </div>

            <div class="item mui-table-view-cell">
              <router-link to="/myAddress" class="tap">
                <i class="iconfont icon-20 icon-addrs"></i>
                收货地址
                <i class="iconfont icon-right"></i>
              </router-link>
            </div>
          </div>

        </div>
        <foot></foot>
      </div>
</template>

<script>

   import foot from '@/components/foot'
    export default {
        data(){
          return{
            token:window.localStorage.getItem('token'),
            userId:window.localStorage.getItem('userId'),
            username:window.localStorage.getItem('username')
          }
        },
        created(){
          if(this.token == undefined){
            var that = this;
            mui.alert('您尚未登录！','提示','确定',function(){
              that.$router.push('/login')
            });
          }
        },
        components:{
          foot
        },
      methods:{
        quit(){

          var btnArray = ['确认', '取消'];
          var that = this;
          mui.confirm('确定要退出吗？', '提示', btnArray, function (e) {
            if (e.index == 0) {
              localStorage.clear();
              that.$router.push('/login')
            } else {

            }
          });


        }
      }
    }
</script>

<style scoped>
 @import "../assets/css/m-css.css";
</style>
