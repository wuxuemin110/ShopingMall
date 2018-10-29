<template>
  <div>
    <headback></headback>
    <div class="mui-content">
      <div class="cart clearfix">
        <div ref="m-cart" class="m-cart">

          <ul class="car-list" id="car-list">
            <li v-for="(item, index) in cartGoodsList" :key="item.id" class="item mui-table-view-cell">
              <div class="mui-slider-right mui-disabled">
                <a @click="deleteGoods(index,item,$event)" href="javascript:void(0)" class="mui-btn mui-btn-red">删除</a>
              </div>
              <div class="car-goods mui-slider-handle">

                <a href="#" class="imgbox"><img class="lazy" :src="item.logoPic"></a>
                <a href="#" class="tap">
                  <h2 class="name">{{item.goodsName}}</h2>

                  <div class="opns">
                    <div class="amount">
                      <span @click="reduceGoods(item)" class="Reduce"><i class="iconfont icon-minus"></i></span>
                      <input disabled  @input="changeIpt(item.num)" @blur="handleBlur(item)" ref="iptNums" v-model="item.num" value="item.num" class="a-num">
                      <span @click="increaseGoods(item)" class="Increase"><i class="iconfont icon-plus"></i></span>
                    </div>
                    <div class="price">
                      ¥ <em class="c-unit">{{item.finalPrice}}</em>
                    </div>
                  </div>
                </a>
              </div>
            </li>

          </ul>
          <div v-if="cartsMoney !=0" class="t-count">
            应付总计：
            <b>￥<em class="t-price">{{cartsMoney}}</em></b>
          </div>
        </div>

      </div>
      <div v-if="isObj(cartGoodsList)" class="car-none">
        <img src="@/assets/images/car-none.png" class="imgbox">
        <div class="dsp">亲，购物车空空的耶~赶紧挑宝贝吧！</div>
        <div class="opn">
          <router-link to="/prolist" class="btns">去逛逛</router-link>
        </div>
      </div>
    </div>
    <nav class="mui-bar mui-bar-tab footer">
      <div class="total-box">
        <div class="T-count">
          合计：￥<em id="T-price" class="red">{{cartsMoney}}</em></div>
        <div @click="submitOrder()" v-if="cartsMoney !=0 && token!= undefined" class="gobuy">去结算</div>
        <div v-if="cartsMoney===0 " class="gobuy" style="background: #ccc">去结算</div>
        <div @click="orderPay()" v-if="token==undefined" class="gobuy" style="background: #ccc">去结算</div>
      </div>
    </nav>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import headback from '@/components/headback'
  import {submitOrder} from '@/api/getData'
  import {ERR_OK, FAIL} from "@/api/config";
  import {isLogin} from '@/api/function'

  export default {
    data() {
      return {

        checkboxList: [],
        checked: false,
        token: window.localStorage.getItem('token'),
        userId: window.localStorage.getItem('userId'),
        carNumer:false
      }
    },
    components: {
      headback,
    },
    computed: {
      ...mapState({
        cartGoodsList: state => state.cart.cart
      }),
      ...mapGetters({
        'cartsMoney': 'cart/cartsMoney',
        'allNum': 'cart/allNum',
        'carData': 'cart/carData'
      }),

    },
    created() {
      isLogin(this)

    },
    methods: {
      ...mapActions({
        'deleteGoodsFromCart': 'cart/delete_goods_from_cart',
        'reduceGoodsFromCart': 'cart/reduce_goods_from_cart',
        'addGoodsFromCart': 'cart/add_goods_from_cart',
        'modifyGoodsNumFromCart': 'cart/modify_goods_num_from_cart',
        'deleteGoodsAllCart' : 'cart/delete_goods_all_cart'
      }),
      /*删除商品*/
      deleteGoods(index, goods) {
        var elem = event.currentTarget;
        var li = elem.parentNode.parentNode;
        var btnArray = ['确认', '取消'];
        var that = this;
        mui.confirm('确认删除该物品？', '提示', btnArray, function (e) {
          if (e.index == 0) {
            that.deleteGoodsFromCart(goods)
          } else {
            setTimeout(function () {
              mui.swipeoutClose(li);
            }, 0);
          }
        });

      },
      reduceGoods(goods) {

        if(goods.num<1){
          return
        }
        this.reduceGoodsFromCart(goods)
      },
      increaseGoods(goods) {
        this.addGoodsFromCart(goods)
      },
      modifyNum(goods, num) {
        this.modifyGoodsNumFromCart({goods, num})
      },
      /*监听购物车修改商品数量*/
      handleBlur(goods) {
        /*计算购物车的数量*/

        if(goods.num<0){
         return
        }else{
          let num = goods.num == '' ? 1 : goods.num
          num = Number(num)
          this.modifyGoodsNumFromCart({goods, num})
        }

      },
      changeIpt(item){

      },
      checkedAll() {
        if (this.checked) {//实现反选
          this.checkboxList = [];
        } else { //实现全选
          this.checkboxList = [];
          for (var i in this.cartGoodsList) {
            this.checkboxList.push(this.cartGoodsList[i].id);

          }
        }
      },
      totalNum() {

      },
      orderPay() {
        if (this.token == undefined) {
          var that = this
          mui.alert('您尚未登录', '提示', '确定', function () {
            that.$router.push('/login')
          });
        }
      },
      submitOrder() {
        let cartItems = [];
        for (var i in this.carData) {
          let arr = {}
          arr.goodsId = this.carData[i].id;
          arr.total = this.carData[i].num;
          cartItems.push(arr)
        }
        let orderData = {
          userId: this.userId,
          token: this.token,
          cartItems: cartItems
        }
        submitOrder(orderData).then((res) => {
          if (res.resultCode == ERR_OK) {
            let orderId = res.resultData.orderId
            this.$router.push({path: '/order', query: {orderId: orderId}});
            this.deleteGoodsAllCart()
          } else if (res.resultCode == FAIL) {
            var that = this
            mui.alert(res.resultMsg, '提示', '确定', function () {
              that.$router.push('/login')
            });
          } else {
            mui.alert(res.resultMsg, '提示', '确定', function () {

            });
          }
        })
      },
      isObj(obj){

        return Object.keys(obj).length === 0 && obj.constructor === Object
      }
    },
    watch: { //深度 watcher
      cartGoodsList:{


      }
    }


  }
</script>

<style scoped>

</style>
