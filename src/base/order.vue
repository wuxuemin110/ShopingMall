<template>
  <div>
    <headback></headback>
    <div class="mui-content">

      <div v-if="address.length != 0"  @click="pushDelive" class="order-addr mui-table-view-cell mt10" id="select-address">
        <i class="icon-dizhi iconfont"></i>
        <div class="name">收货人：{{address.recipient}}<span class="fr">{{address.phone}}</span></div>
        <div class="info">收货地址：{{address.city}}{{address.area}}{{address.detail}}<i class="icon-right iconfont"></i></div>
      </div>
      <div class="title-bt">商品信息</div>
      <ul class="OrderList mt10 clearfix">
        <li v-for="item in goodsDesc.goodsInfo "  class="item clearfix">
          <a href="#" class="tap mui-table-view-cell">
            <div class="imgbox "><img class="lazy" :src="item.logo"></div>
            <div class="text-box">
              <h2 class="name">{{item.goodsName}}</h2>
              <div class="price-box">
                <span class="unit c5">¥{{item.finalPrice}}</span>
                <span class="num">×{{item.total}}</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <div class="title-bt">结算</div>
      <ul class="list-tab mui-table-view b-t-l b-b-l mt10 clearfix" id="payment">
        <li class="item mui-table-view-cell">
          <div class="tap">
            <span class="name">订单总额</span>
            <span class="dsp"><font class="c5 fs3">¥{{goodsDesc.totalFinalPrice}}</font></span>
          </div>
        </li>
      </ul>
      <div class="title-bt">请选择支付方式</div>
      <ul class="list-tab mui-table-view b-t-l b-b-l mt10 clearfix" id="payment">
        <li class="item mui-table-view-cell">
          <div class="tap pl-24 check">
            <div class="icon-24"><img src="@/assets/images/zfb.png"></div>
            <span class="name">支付宝支付</span>
            <input checked name="payment" type="radio" class="ico-check">
          </div>
        </li>
        <li class="item mui-table-view-cell">
          <div class="tap pl-24 check">
            <div class="icon-24"><img src="@/assets/images/weixin.png"></div>
            <span class="name">微信支付</span>
            <input name="payment" type="radio" class="ico-check">
          </div>
        </li>
        <li class="item mui-table-view-cell">
          <div class="tap pl-24 check">
            <div class="icon-24"><img src="@/assets/images/ylzf.png"></div>
            <span class="name">银联付款</span>
            <input name="payment" type="radio" class="ico-check">
          </div>
        </li>
      </ul>
    </div>
    <nav class="mui-bar mui-bar-tab footer">
      <div @click="_orderPay()" class="btn f-full-btn">提交</div>
    </nav>
    <router-view ></router-view>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import headback from '@/components/headback'
  import {gerDress,orderPay,getOrderDesc} from '@/api/getData'
  import {ERR_OK,FAIL} from "../api/config";

  export default {
    data() {
      return {
        address:[],
        orderFlag:'',
        orderId:this.$route.query.orderId,
        goodsDesc:[]
      }
    },
    methods:{
      pushAddress(){
        this.$router.push('/order/address')
      },
      pushDelive(){
        this.$router.push('/order/delive')
      },
      _gerDress(){
        let admin = {
          userId:window.localStorage.getItem('userId'),
          token:window.localStorage.getItem('token')
        }
        gerDress(admin).then((res)=>{
          if(res.resultCode == ERR_OK){
            for(var i =0;i<res.resultData.length;i++){

               if(res.resultData[i].isDefault == 0){
                  this.address = res.resultData[i]
                  this.orderFlag = res.resultData[i].id
               }
            }

            if(this.address.length == 0){
              var that = this;
              mui.alert('您还未设置收货地址，请前往个人中心设置~', '提示', '确定', function () {
                that.$router.push('/myAddress')
              });
            }
          }
          else {
            var that = this;
            mui.alert('您尚未登录', '提示', '确定', function () {
              that.$router.push('/login')
            });
          }
        })
      },
      update(){
        window.location.reload()
      },
      _orderPay(){
        let orderId = this.$route.query.orderId
        let data = {
          userId:window.localStorage.getItem('userId'),
          token:window.localStorage.getItem('token'),
          addressId:this.orderFlag,
          orderId:orderId
        }

        orderPay(data).then((res)=>{
          if(res.resultCode == ERR_OK){
            var that = this;
            mui.alert(res.resultMsg, '提示', '确定', function () {
              that.$router.push({path: '/orderok', query: {money: that.goodsDesc.totalFinalPrice}});
            });
          }else {
            mui.alert(res.resultMsg, '提示', '确定', function () {

            });
          }
        })
      },
      _getOrderDesc(){
        let data ={
          userId:window.localStorage.getItem('userId'),
          token:window.localStorage.getItem('token'),
          orderId:this.orderId
        }
        getOrderDesc(data).then((res)=>{
          if(res.resultCode == ERR_OK){
            this.goodsDesc = res.resultData

          }
        })
      }


    },
    beforeCreate () {

    },
    beforeDestroy () {

    },

    created(){
      this._gerDress()
      this._getOrderDesc()
    },
    mounted(){

    },
    computed:{
      ...mapState({
        cartGoodsList: state => state.cart.cart
      }),
      ...mapGetters({
        'cartsMoney': 'cart/cartsMoney',
        'allNum': 'cart/allNum',
      }),
    },
    components: {
      headback
    },
    watch:{
      "$route": "update"
    }
  }
</script>

<style scoped>
.address{
  text-align: left;
  font-size: 16px;
  color: red;
  margin-left: 12px;
  margin-top: 10px;
}
.OrderList .tap img{
  width: 80px;
  height: 80px;
}
</style>
