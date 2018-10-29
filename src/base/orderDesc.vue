<template>
  <div>
    <headback></headback>
    <div class="mui-content">
      <div v-if="goodsDesc.addressInfo" class="order-addr mui-table-view-cell mt10">
        <i class="icon-dizhi iconfont"></i>
        <div class="name">收货人：{{goodsDesc.addressInfo.recipient}}<span class="fr">{{goodsDesc.addressInfo.phone}}</span></div>
        <div class="info pr0">收货地址：{{goodsDesc.addressInfo.city}}{{goodsDesc.addressInfo.area}}{{goodsDesc.addressInfo.area}}</div>
      </div>
      <div class="MyOrder-info mt10 clearfix">
        <div class="text">
          订单编号：{{goodsDesc.orderNumber}}
          <br> 创建时间：{{goodsDesc.orderTime}}

        </div>

      </div>
      <ul class="MyOrder clearfix">
        <li class="item clearfix">
          <div class="info">订单编号：{{goodsDesc.orderNumber}}</div>
          <a v-for="item in goodsDesc.goodsInfo" href="#" class="tap mui-table-view-cell">
            <div class="imgbox"><img class="lazy" :src="item.logo" ></div>
            <div class="text-box">
              <h2 class="name">{{item.goodName}}</h2>

              <div class="price">
                <span class="unit c5">¥{{item.finalPrice}}</span>
                <span class="num">×{{item.total}}</span>
              </div>
            </div>
          </a>

          <div class="counts clearfix">
            <span v-show="goodsDesc.state == 1" class="status c5">已提交</span>
            <span v-show="goodsDesc.state == 2" class="status c5">配送中</span>
            <span v-show="goodsDesc.state == 3" class="status c5">已完成</span>
            <span v-show="goodsDesc.state == 4" class="status c5">已取消</span>
            <span v-show="goodsDesc.state == 5" class="status c5">已支付</span>
          <!--  共
            <b class="c5">{{goodsDesc.goodsInfo.length}}</b>件-->
            <span class="space"></span> 总计：
            <span class="unit red">¥{{goodsDesc.totalFinalPrice}}</span>
          </div>
        </li>
      </ul>
      <div class="title-bt">结算</div>
      <ul class="list-tab b-t-l mt10 clearfix">

        <li class="item mui-table-view-cell">
          <div class="tap">
            <span class="name">时间</span>
            <span class="dsp">{{goodsDesc.orderTime}}</span>
          </div>
        </li>

        <li class="item mui-table-view-cell">
          <div class="tap">
            <span class="name">订单总额</span>
            <span class="dsp"><font class="c5 fs3">¥{{goodsDesc.totalFinalPrice}}</font></span>
          </div>
        </li>
      </ul>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import headback from '@/components/headback'
  import foot from '@/components/foot'
  import {getOrderDesc} from '@/api/getData'
  import {ERR_OK} from "@/api/config";
  import {isLogin} from '@/api/function'
    export default {
        data(){
          return{
            goodsDesc:[],
            descID:this.$route.query.id
          }
        },
       created(){
         isLogin(this)
         this._getOrderDesc()
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
                this.goodsDesc = res.resultData

              }
            })
          }
        },
        components:{
          headback,
          foot
        }
    }
</script>

<style scoped>
  .MyOrder .imgbox img{
    width: 88px;
    height: 88px;
  }
</style>
