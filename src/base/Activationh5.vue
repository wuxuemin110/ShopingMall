<template>
    <div class="imgWrap">
      <img v-show="imgFlag" src="@/assets/images/success.jpg" alt="">
      <img v-show="!imgFlag" src="@/assets/images/fail.jpg" alt="">
    </div>
</template>

<script>
  import {showTest} from '@/api/function'
  import {ERR_OK} from "@/api/config";
  import {getCode} from '@/api/getData'

    export default {
       data(){
         return{
           text:'',
           username:this.$route.query.code,
           imgFlag:false
         }
       },
      beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background-color:#fff')
      },
      beforeDestroy() {
        document.querySelector('body').removeAttribute('style')
      },
      created(){
        this._againCode()
      },
       methods:{
        _againCode(){

          let data={
            code:this.username
          }
          console.log(data)
          var that = this
          getCode(data).then((res)=>{
             if(res.resultCode == ERR_OK){
              this.imgFlag = true;
               mui.alert(res.resultMsg, '提示', '确定', function () {
                 that.$router.push('/login')
               });
             }else {
               this.imgFlag = false;

               mui.alert(res.resultMsg, '提示', '确定', function () {
                 that.$router.push('/login')
               });
             }
          })
        }
       }
    }
</script>

<style scoped>
.imgWrap{

  width: 100%;
  height: 100%;
}
.imgWrap img{
  position: absolute;
  width: 65%;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
}
</style>
