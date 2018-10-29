<template>
  <div>
    <headback></headback>
    <div class="mui-content">

      <ul v-for="item in orderList" class="MyOrder clearfix">
        <li class="item clearfix">
          <div class="info">订单编号：{{item.orderNumber}}</div>
          <div class="tap mui-table-view-cell">
            <div v-for="items in item.logo" class="imgbox"><img class="lazy" :src="items"></div>
          </div>
          <div class="counts clearfix">
            <span v-if="item.state == 1" class="status c5">已提交</span>
            <span v-if="item.state == 2" class="status c5">配送中</span>
            <span v-if="item.state == 3"class="status c5">已完成</span>
            <span v-if="item.state == 4" class="status c5">已取消</span>
            <span v-if="item.state == 5" class="status c5">已支付</span>

            <span class="space"></span> 总计：
            <span class="unit red">¥{{item.totalFinalPrice}}</span>
          </div>
          <div class="opn">
            <div @click="_orderConfirm(item.id)"  v-if="item.state == 5" class="btn bbgf">确认收货</div>
            <div @click="evaluate(item.id)" v-if="item.state == 3" class="btn bbgf">立即评价</div>
            <div  v-if="item.state == 1"  @click="payment(item.id)" class="btn bbgf">立即支付</div>
            <div @click="pushOrderDesc(item.id)" class="btn bbgf">订单详情</div>
            <div v-if="item.state == 1 || item.state == 2 " @click="_cancleOrder(item.id)" class="btn bbgf">取消订单</div>
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
  import {getOrderList, cancleOrder,orderConfirm} from '@/api/getData'
  import {ERR_OK, FAIL,OVER} from "@/api/config";
  import {isLogin} from '@/api/function'

  export default {
    data() {
      return {
        orderList: [],
        token: window.localStorage.getItem('token'),
        userId: window.localStorage.getItem('userId')
      }
    },
    created() {
      isLogin(this);
      this._getOrderList()
    },
    methods: {
      pushOrderDesc(item) {
        this.$router.push({
          path: '/orderDesc',
          query: {
            id: item,
          }
        })
      },
      _getOrderList() {
        let admin = {
          token: this.token,
          userId: this.userId
        }
        getOrderList(admin).then((res) => {
          if (res.resultCode == ERR_OK) {
            this.orderList = res.resultData
          } else if (res.resultCode == OVER) {
            var that = this
            mui.alert(res.resultMsg, '提示', '确定', function () {
              that.$router.push('/login')
            });
          }
        })
      },
      _cancleOrder(id) {

        var btnArray = ['确认', '取消'];
        var that = this;
        mui.confirm('确认要取消订单吗？', '提示', btnArray, function (e) {
          if (e.index == 0) {
            let data = {
              token: that.token,
              userId: that.userId,
              orderId:id,
              cancelMsg:'恩恩'
            }
            cancleOrder(data).then((res) => {
              if (res.resultCode == ERR_OK) {
                mui.alert(res.resultMsg, '提示', '确定', function () {
                  window.location.reload();
                });
              } else if (res.resultCode == FAIL) {
                mui.alert(res.resultMsg, '提示', '确定', function () {

                });
              }
            })
          } else {

          }
        });

      },
      _orderConfirm(id){
        let data = {
          orderId:id,
          token:this.token,
          userId:this.userId

        };
        orderConfirm(data).then((res)=>{
          if(res.resultCode == ERR_OK){
            mui.alert(res.resultMsg, '提示', '确定', function () {
              window.location.reload();
            });
          }else {
            mui.alert(res.resultMsg, '提示', '确定', function () {

            });
          }
        })
      },
      payment(orderId){
        this.$router.push({path: '/order', query: {orderId: orderId}});
      },
      evaluate(id){
        this.$router.push({
           path:'/evaluate',
           query:{
             id:id
           }
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
  .MyOrder .imgbox img{
    width: 88px;
    height: 88px;
  }
</style>
