<template>
  <div>
    <headback></headback>
    <div class="mui-content white">
      <div class="login-logo"><img src="@/assets/images/logo.png"></div>
      <ul class="login-form clearfix">
        <li class="item">
          <i class="iconfont icon-20 icon-shouji"></i>
          <input type="text" class="demo" style="display: none">
          <input v-model="registerInfo.email" type="text"  AUTOCOMPLETE="off" class="l-txt" placeholder="请输入用户名(邮箱)">
          <i class="iconfont icon-close-fill"></i>
        </li>

        <li class="item">
          <i class="iconfont icon-20 icon-mima"></i>
          <input type="text" class="demo" style="display: none">
          <input v-model="registerInfo.password" type="password"  AUTOCOMPLETE="off" class="l-txt" placeholder="请输入密码">
          <i class="iconfont icon-close-fill"></i>
        </li>
        <li class="item">
          <a @click="_register" class="btn l-btn">确定</a>
        </li>
      </ul>
      <div class="login-or">OR</div>

    </div>
  </div>

</template>

<script>
  import {showTest} from '@/api/function'
  import {ERR_OK} from "@/api/config";
  import {register} from '@/api/getData'
  import headback from '@/components/headback'
    export default {
      beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background-color:#fff')
      },
      beforeDestroy () {
        document.querySelector('body').removeAttribute('style')
      },
      data(){
        return{
          registerInfo:{}
        }
      },
      methods:{
        _register(){

          var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");

          var regu = "^[0-9a-zA-Z]{6,12}$"
          var re = new RegExp(regu)
          if(this.registerInfo.email == undefined ||this.registerInfo.email == '' ){
            showTest('用户名不能为空');
            return;
          }

          if(!reg.test(this.registerInfo.email)){

            showTest("邮箱格式不正确!")
            return;
          }

          if(this.registerInfo.password == undefined ||this.registerInfo.password == '' ){
            showTest('密码不能为空')
            return;
          }

          if(!re.test(this.registerInfo.password)){
            showTest('密码只能为6-16位英文或数字')
            return;
          }

          let data ={
            username:this.registerInfo.email,
            password:this.registerInfo.password,
            channel:'h5'
          }
          register(data).then((res)=>{
            if(res.resultCode == ERR_OK){
              var that = this
              mui.alert(res.resultMsg,'提示','确定',function(){
                that.$router.push('/login')
              });
            }else {
              showTest(res.resultMsg)
            }
          })
        }
      },
      components:{
        headback
      }
    }
</script>

<style scoped>
.white{
  background: #fff;
}
</style>
