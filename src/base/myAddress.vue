<template>
  <div>
    <headback></headback>
    <div class="mui-content">
      <ul class="address-list clearfix pr10" id="address-list">
        <li v-if="addressList" v-for="item in addressList" class="item">
          <div class="name">
            <span v-show="item.isDefault == 0" class="flag">默认</span>{{item.recipient}}<span class="space">{{item.phone}}</span>
            <div class="opn"><a @click="revise(item)" href="javascript:void(0)" class="red edit">编辑</a><span
              class="line"></span><a @click="_deleteAddress(item.id)" href="javascript:void(0)" class="red del">删除</a>
            </div>
          </div>
          <p class="info">{{item.city}}{{item.area}}{{item.detail}}</p>
        </li>

        <div v-if="this.addressList.length == 0"
             style="text-align: center;color: #0f0f0f;line-height: 100px;font-size: 18px">您还没有设置收货地址,请点击设置收货地址
        </div>
      </ul>
      <div class="exit-opn">
        <button @click="addAdress()" class="btn Large" id="add-address">新增地址</button>
      </div>
    </div>


    <div class="modal-full" id="modal-add-address">
      <header class="mui-bar mui-bar-nav header">
        <h1 class="mui-title">新增地址</h1>
        <a @click="close()" href="javascript:void(0);" class="close"><i class="iconfont icon-guanbi"></i></a>
      </header>
      <div id="addAddrScroll" class="modalScrollBox">
        <div class="mui-scroll">
          <ul class="form-list clearfix">
            <li class="item f-list-pl4">
              <span class="name">收货人</span>
              <input type="text" v-model="address.recipient" class="txt" value="" placeholder="请输入收货人姓名">
            </li>
            <li class="item f-list-pl4">
              <span class="name">省份</span>
              <input type="text" v-model="address.provinces" class="txt" id="addr" value="" placeholder="请输入省份">

            </li>
            <li class="item f-list-pl4">
              <span class="name">市</span>
              <input type="text" v-model="address.city" class="txt" id="addr" value="" placeholder="请输入市">

            </li>
            <li class="item f-list-pl4">
              <span class="name">区县</span>
              <input type="text" v-model="address.area" class="txt" id="addr" value="" placeholder="请输入区县">

            </li>
            <li class="item f-list-pl4">
              <span class="name">详细地址</span>
              <input type="text" v-model="address.detail" class="txt" value="" placeholder="请输入街道门牌信息">
            </li>
            <li class="item f-list-pl4">
              <span class="name">联系电话</span>
              <input type="text" v-model="address.phone" class="txt" value="" placeholder="请输入手机号或座机号码">
            </li>
            <li class="item f-list-pl4">
              <span class="name">邮编</span>
              <input type="text" v-model="address.postcode" class="txt" value="" placeholder="请输入邮编">
            </li>
            <li class="item">
              <div class="tap">
                <span class="name">设为默认地址</span>
                <div class="mui-switch mui-switch-mini" id="mySwitch">
                  <div class="mui-switch-handle"></div>
                </div>
              </div>
            </li>
          </ul>
          <div @click="submitAdress()" class="exit-opn"><a href="javascript:void(0)" class="btn Large">提交</a></div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>



  import headback from '@/components/headback'
  import foot from '@/components/foot'
  import {gerDress, addAdress, deleteAddress} from '@/api/getData'
  import {isLogin} from '@/api/function'
  import {ERR_OK, FAIL} from "@/api/config";

  export default {
    data() {
      return {
        addressList: [],
        token: window.localStorage.getItem('token'),
        userId: window.localStorage.getItem('userId'),
        address: {
          isDefault: 1,
          area: '',
          city: '',
          detail: '',
          phone: '',
          postcode: '',
          provinces: '',
          recipient: '',
        }
      }
    },
    components: {
      headback,
      foot
    },
    created() {
      isLogin(this)

      this._gerDress()


    },
    mounted() {
      var that = this
      document.getElementById("mySwitch").addEventListener("toggle", function (event) {
        if (event.detail.isActive) {
          that.address.isDefault = 0
        } else {
          that.address.isDefault = 1
        }
      })
      mui("#mySwitch").switch().toggle();


    },
    methods: {
      _gerDress() {
        let admin = {
          token: this.token,
          userId: this.userId
        }
        gerDress(admin).then((res) => {
          if (res.resultCode == ERR_OK) {
            this.addressList = res.resultData
          }
        })
      },
      addAdress() {
        this.address = {
          isDefault: 1,
          area: '',
          city: '',
          detail: '',
          phone: '',
          postcode: '',
          provinces: '',
          recipient: '',
        };
        $("#modal-add-address").addClass("active");
      },
      close() {
        $("#modal-add-address").removeClass("active");

      },
      submitAdress() {

        let admin = {
          token: this.token,
          userId: this.userId
        }
        var isActive = document.getElementById("mySwitch").classList.contains("mui-active");
        if (isActive) {

          this.address.isDefault = 0
        } else {

          this.address.isDefault = 1
        }
        let data = Object.assign(admin, this.address)
        addAdress(data).then((res) => {

          if (res.resultCode == ERR_OK) {
            var that = this
            mui.alert(res.resultMsg, '提示', '确定', function () {
              that._gerDress()
              that.address = {
                isDefault: 1,
                area: '',
                city: '',
                detail: '',
                phone: '',
                postcode: '',
                provinces: '',
                recipient: '',
              };
              that.close()

            });
          } else if (res.resultCode == FAIL) {
            var that = this;
            mui.alert(res.resultMsg, '提示', '确定', function () {
              // that.$router.push('/login')
            });
          }
        })
      },
      _deleteAddress(item) {
        let data = {
          token: this.token,
          userId: this.userId,
          addressId: item
        }
        deleteAddress(data).then((res) => {
          if (res.resultCode == ERR_OK) {
            var that = this
            mui.alert(res.resultMsg, ' 提示', '确定', function () {
              that._gerDress()
              that.address = {
                isDefault: 1,
                area: '',
                city: '',
                detail: '',
                phone: '',
                postcode: '',
                provinces: '',
                recipient: '',
              };
            });
          } else if (res.resultCode == FAIL) {
            var that = this;
            mui.alert(res.resultMsg, '提示', '确定', function () {
              that.$router.push('/login')
            });
          }
        })
      },
      revise(item) {

        this.address.area = item.area;
        this.address.city = item.city;
        this.address.detail = item.detail;
        this.address.id = item.id;
        this.address.isDefault = item.isDefault;
        this.address.phone = item.phone;
        this.address.postcode = item.postCode;
        this.address.provinces = item.provinces;
        this.address.recipient = item.recipient;
        $("#modal-add-address").addClass("active");
      }

    }
  }
</script>

<style scoped>

</style>
