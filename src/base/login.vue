<template>
  <div>
    <headback></headback>
    <div class="mui-content white">
      <div class="login-logo"><img src="@/assets/images/logo.png"></div>
      <ul class="login-form clearfix">
        <li class="item">
          <i class="iconfont icon-20 icon-shouji"></i>
          <input type="text" class="demo" style="display: none">
          <input v-model="logindata.username" type="text" class="l-txt" AUTOCOMPLETE="off" placeholder="请输入用户名（邮箱）">
          <i class="iconfont icon-close-fill"></i>
        </li>
        <li class="item">
          <i class="iconfont icon-20 icon-mima"></i>
          <input type="text" class="demo" style="display: none">
          <input v-model="logindata.password" type="password" class="l-txt" AUTOCOMPLETE="off" placeholder="请输入密码">
          <i class="iconfont icon-close-fill"></i>
        </li>
        <li class="item forgot"><router-link to="/forget" class="c5">忘记密码</router-link></li>
        <li class="item">
          <div @click="_login" class="btn l-btn">登录</div>
        </li>
      </ul>
      <div class="login-or">OR</div>

    </div>
  </div>
</template>

<script>
  import {showTest} from '@/api/function'
  import {ERR_OK} from "@/api/config";
  import {login, getCarList} from '@/api/getData'
  import headback from '@/components/headback'
  import {mapGetters, mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        logindata: {
          username: '',
          password: ''
        },
        cartGoodDetails: []
      }
    },
    created() {

    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'background-color:#fff')
    },
    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
    },
    methods: {
      _login() {
        if (this.logindata.username == undefined || this.logindata.username == '') {
          showTest('用户名不能为空');
          return;
        }
        if (this.logindata.password == undefined || this.logindata.password == '') {
          showTest('密码不能为空')
          return;
        }
        login(this.logindata).then((res) => {
          if (res.resultCode == ERR_OK) {
            if(res.resultData.active == false){
              var that = this
              mui.alert('您尚未激活您的账号','提示','确定',function(){
                that.$router.push('/toReset')
              });
            }else {
              window.localStorage.setItem('userId', res.resultData.userId);
              window.localStorage.setItem('token', res.resultData.token);
              window.localStorage.setItem('username', res.resultData.username);
              this._getCarList()
              this.$router.push('/member')
            }
          } else {
            showTest(res.resultMsg)
          }
        })
      },
      _getCarList() {
        let listData = {
          userId: window.localStorage.getItem('userId'),
          token: window.localStorage.getItem('token')
        }
        getCarList(listData).then((res) => {
          if (res.resultCode == ERR_OK) {
            this.cartGoodDetails = res.resultData.cartGoodDetails
            console.log(this.cartGoodDetails )
            if (this.cartGoodDetails != null) {
              var arr = []
              for (var i = 0; i < this.cartGoodDetails.length; i++) {
                var data = {}
                data.id = this.cartGoodDetails[i].goodsId
                data.goodsName = this.cartGoodDetails[i].goodsName
                data.logoPic = this.cartGoodDetails[i].logo
                data.finalPrice = this.cartGoodDetails[i].price
                data.num = this.cartGoodDetails[i].total
                arr.push(data)
              }
              //console.log(arr)
              for (let i = 0; i < arr.length; i++) {
                this.addCart(arr[i])
              }
            }

          }
        })
      },
      ...mapActions({
        'createGoodsToCart': 'cart/create_goods_to_cart',
        'addGoodsFromCart': 'cart/add_goods_from_cart'
      }),
      addCart(product) {

        this.createGoodsToCart(product)
      },
    },
    computed: {
      ...mapGetters({
        cartNum: 'cart/cartNum',
        hasGoods: 'cart/hasGoods'
      })
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
