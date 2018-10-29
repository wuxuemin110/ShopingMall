import * as types from './types.js'
import Vue from 'vue'
import {synCar,emptyCar} from '@/api/getData'
import {ERR_OK, FAIL} from "@/api/config";

export default {
  /*添加商品到购物车中*/
  [types.CREATE_GOODS_TO_CART](state, goods) {
    /*以key-value键值对的形式存放在购物车中*/
    console.log(goods)
    Vue.set(state.cart, `p${goods.id}`, goods)
  },
  /*删除购物车里的商品*/
  [types.DELETE_GOODS_FROM_CART](state, goods) {
    /*删除商品只要删除指定的key*/

    Vue.delete(state.cart, `p${goods.id}`)
  },
  /*购物车的商品+1*/
  [types.ADD_GOODS_FROM_CART](state, goods) {
    let item = state.cart[`p${goods.id}`]
    let num = item.num
    /*更新*/
    /*Obejct.assign浅拷贝，会对对象里存在的属性覆盖，不存在的属性添加*/
    state.cart[`p${goods.id}`] = Object.assign({}, item, {num: num + 1})
  },
  [types.REDUCE_GOODS_FROM_CART](state, goods) {
    let item = state.cart[`p${goods.id}`]
    let num = item.num
    if (num <= 1) return
    state.cart[`p${goods.id}`] = Object.assign({}, item, {num: num - 1})
  },
  /*修改购物车的商品的数量*/
  [types.MODIFY_GOODS_NUM_FROM_CART](state, data) {

    let goods = data.goods
    let num = data.num
    let item = state.cart[`p${goods.id}`]


    /*更新*/
    state.cart[`p${goods.id}`] = Object.assign({}, item, {num: num})
  },
  /*更新购物车*/
  [types.UPDATE_CART](state) {

    localStorage.setItem('cart', JSON.stringify(state.cart))
    let token = window.localStorage.getItem('token')
    let userId = window.localStorage.getItem('userId')
    let userData = {
      token:token,
      userId:userId
    }
    if(token){
      let cartItems = [];
      for (var i in state.cart) {
        let arr = {}
        arr.goodsId = state.cart[i].id;
        arr.total = state.cart[i].num;
        cartItems.push(arr)
      }
      let orderData = {
        userId: userId,
        token: token,
        cartItems: cartItems
      }

      if(cartItems.length == 0){
        emptyCar(userData).then((res)=>{

        })
      }else {
        synCar(orderData).then((res) => {
          if(res.resultCode == FAIL){
            mui.alert(res.resultMsg, '提示', '确定', function () {

            });
          }
        })
      }


    }
  },
  /*删除本地购物车*/
  [types.DELETE_GOODS_ALL_CART](state) {
    state.cart = {}
  },

}

