<template>
  <nav class="mui-bar mui-bar-tab footer">
    <div class="order-bar">

      <div @click.stop.prevent="addCart(product,$event)" class="now-buy-btn add-car-btn" id="add-car">加入购物车</div>
      <div @click="pushOrder(product)" class="now-buy-btn" id="now-buy">立即购买</div>
    </div>
  </nav>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        userId:window.localStorage.getItem('userId'),
        token:window.localStorage.getItem('token')
      }
    },
    props: ['product'],
    methods: {
      ...mapActions({
        'createGoodsToCart': 'cart/create_goods_to_cart',
        'addGoodsFromCart': 'cart/add_goods_from_cart'
      }),
      addCart(product) {
        if(this.token){
          //判断这件商品是否在购物车内
          let hasGoods = this.hasGoods(product)
          if (hasGoods) {
            //有，该商品的数量+1
            this.addGoodsFromCart(product)

          } else {
            //没有，购物车创建该商品
            product.num = 1
            this.createGoodsToCart(product)
          }

          this.$emit('cartAdd', event.target);
        }else {
          var that = this
          mui.alert('请先登录哦~', '提示', '确定', function () {
            that.$router.push('/login')
          });
        }
      },
      pushOrder(product){
        if(this.token){
          //判断这件商品是否在购物车内
          let hasGoods = this.hasGoods(product)
          if (hasGoods) {
            //有，该商品的数量+1
            this.addGoodsFromCart(product)

          } else {
            //没有，购物车创建该商品
            product.num = 1
            this.createGoodsToCart(product)
          }
          this.$router.push('/car')
        }else {
          var that = this
          mui.alert('请先登录哦~', '提示', '确定', function () {
            that.$router.push('/login')
          });
        }
      }
    },
    mounted() {

    },
    computed: {
      ...mapGetters({
        cartNum: 'cart/cartNum',
        hasGoods: 'cart/hasGoods'
      })
    }
  }
</script>

<style scoped>

</style>
