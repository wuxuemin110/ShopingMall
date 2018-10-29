<template>
  <div>
    <headback></headback>
    <div class="mui-content white">
      <div class="login-logo"><img src="@/assets/images/logo.png"></div>
      <ul class="login-form clearfix">
        <li class="item">
          <i class="iconfont icon-20 icon-shouji"></i>
          <input v-model="username" type="text" class="l-txt" placeholder="请输入邮箱号验证">
          <i class="iconfont icon-close-fill"></i>
        </li>
        <li class="item yzm">
          <button @click="_backCode()" class="getyzm" id="getyzm">获取验证码</button>
          <i class="iconfont icon-20 icon-yzm"></i>
          <input v-model="code" type="text" class="l-txt" placeholder="验证码">
          <i class="iconfont icon-close-fill"></i>
        </li>
        <li class="item">
          <i class="iconfont icon-20 icon-mima"></i>
          <input v-model="password" type="password" class="l-txt" placeholder="新密码">
          <i class="iconfont icon-close-fill"></i>
        </li>
        <li class="item">
          <button @click="_getBack()" class="btn l-btn">重置密码</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import {showTest} from '@/api/function'
  import {ERR_OK} from "@/api/config";
  import {getBack,backCode,againCode} from '@/api/getData'
  import headback from '@/components/headback'
    export default {
      data(){
        return{
          username:'',
          code:'',
          password:''

        }
      },
      beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background-color:#fff')
      },
      beforeDestroy() {
        document.querySelector('body').removeAttribute('style')
      },
      methods:{
        _backCode(){
          let data = {
            username:this.username
          }
          backCode(data).then((res)=>{
            if(res.resultCode == ERR_OK){
              var that = this;
              mui.alert(res.resultMsg, '提示', '确定', function () {

              });
            } else{
              mui.alert(res.resultMsg, '提示', '确定', function () {

              });
            }
          })
        },
        _getBack(){
          let data = {
            username:this.username,
            password:this.password,
            code:this.code
          }
          getBack(data).then((res)=>{
            if(res.resultCode == ERR_OK){
              var that = this;
              mui.alert(res.resultMsg, '提示', '确定', function () {
                that.$router.push('/login')
              });
            } else{
              mui.alert(res.resultMsg, '提示', '确定', function () {

              });
            }
          })
        }
      },
      components: {
        headback
      }
    }
</script>

<style scoped>
  .white {
    background: #fff;
  }


</style>
