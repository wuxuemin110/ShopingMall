<template>
  <transition name="slide">

    <div class=" modal-full-grey  ">
      <headback></headback>


        <div id="selectAddrScroll" class="modalScrollBox">
          <div class="mui-scroll">
            <ul class="address-list clearfix" id="address-list">
              <li v-for="item in addressList" class="item">
                <p class="name"> <span v-show="item.isDefault == 0" class="flag">默认</span>{{item.recipient}}<span class="space">{{item.phone}}</span></p>
                <p class="info">{{item.city}}{{item.area}}{{item.detail}}</p>
                <input @click="getflag(item.id)" name="addr" type="radio" class="ico-check"  :checked="item.isDefault == 0">
              </li>

            </ul>

            <div @click="_setDefault()" class="exit-opn">
              <button class="btn Large" id="add-address">确认地址</button>
            </div>
          </div>

      </div>
    </div>

  </transition>
</template>

<script>


  import {gerDress,setDefault} from '@/api/getData'
  import {isLogin} from '@/api/function'
  import {ERR_OK, FAIL} from "@/api/config";
  import headback from '@/components/headback'
  export default {

    data(){
      return{
        addressList: [],
        userId:window.localStorage.getItem('userId'),
        token:window.localStorage.getItem('token'),
        addressFlag:''
      }
    },
    created() {
      isLogin(this)
      this._gerDress()
    },
    methods:{
      _gerDress() {
        let admin = {
          token: this.token,
          userId: this.userId
        }
        gerDress(admin).then((res) => {
          if (res.resultCode == ERR_OK) {
            this.addressList = res.resultData
            for(var i = 0;i<res.resultData.length;i++){
              if(res.resultData[i].isDefault == 0){
                this.addressFlag = res.resultData[i].id
              }
            }
          }else {
            var that = this;
            mui.alert(res.resultMsg, '提示', '确定', function () {
              that.$router.push('/login')
            });
          }
        })
      },
      _setDefault(){
        let data = {
          userId:this.userId,
          token:this.token,
          addressId:this.addressFlag
        }
        setDefault(data).then((res)=>{
          if(res.resultCode == ERR_OK){
            var that = this
            mui.alert(res.resultMsg, '提示', '确定', function () {

              that.$router.go(-1)
            });
          }else {
            mui.alert(res.resultMsg, '提示', '确定', function () {

            });
          }
        })
      },
      getflag(item){
        this.addressFlag = item
      }
    },
    components:{
      headback
    }
  }
</script>

<style scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(0, 100%, 0)
  }
  .modal-full-grey{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    z-index: 109;
    padding-top: 44px;
  }
</style>
