<template>
  <div>
    <headback></headback>
    <div class="mui-content">
      <div v-for="item in goodsInfo" class="Review box clearfix">
        <div class="title">订单评价</div>
        <textarea v-model="item.description" name="" cols="" rows="" class="Review-tra box-sizing" id="Review-tra" placeholder="请填写评论内容"></textarea>

        <img style="display: block;width: 88px;height: 88px;" :src="item.logo">
        <ul class="pingfen clearfix" id="pingfen">
          <li><label><input v-model="item.orderNum" name="pingfen" type="radio" class="radio" checked  value=10></label>好评</li>
          <li><label><input  v-model="item.orderNum" name="pingfen" type="radio" class="radio"  value=6></label>中评</li>
          <li><label><input  v-model="item.orderNum" name="pingfen" type="radio" class="radio"  value=1></label>差评</li>
        </ul>
        <button @click="_confirm(item)" class="btn Review-btn">评价</button>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import headback from '@/components/headback'
  import foot from '@/components/foot'
  import {getOrderDesc,submitComment} from '@/api/getData'
  import {ERR_OK, FAIL} from "@/api/config";
  import {isLogin} from '@/api/function'
    export default {
        data(){
          return{
            descID:this.$route.query.id,
            goodsInfo:[],
            token:window.localStorage.getItem('token'),
            userId:window.localStorage.getItem('userId')

          }
        },
      created(){
        isLogin(this)
        this._getOrderDesc()
      },

      mounted(){

      },
      methods:{

        _getOrderDesc(){
          let data ={
            userId:window.localStorage.getItem('userId'),
            token:window.localStorage.getItem('token'),
            orderId:this.descID
          }
          getOrderDesc(data).then((res)=>{
            if(res.resultCode == ERR_OK){
              this.goodsInfo = res.resultData.goodsInfo
              this.goodsInfo.forEach((res)=>{
                res.orderNum = 10
                res.description = ''
              })
            }
          })
        },
        _confirm(item){
          let data = {
            socre:item.orderNum,
            pics:[],
            description:item.description,
            goodsId:item.id,
            orderId:this.descID,
            token:this.token,
            userId:this.userId
          }
          submitComment(data).then((res)=>{
            mui.alert(res.resultMsg, '提示', '确定', function () {
            });

          })
        }
      },
      components: {
        headback,
        foot
      }
    }
</script>

<style scoped>

</style>
