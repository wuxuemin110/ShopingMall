import {ERR_OK} from "@/api/config";
import {hostUrl} from "@/api/hostUrl";
import axios from 'axios'


export function getBannel() {
  return axios.get(hostUrl + '/banner/list?type=index_mobile').then((res) => {
    return Promise.resolve(res.data)
  }).catch((res) => {

  })
}


//商品类别
export function getTypes() {
  return axios.get(hostUrl + '/goods/types').then((res) => {
    return Promise.resolve(res.data)
  }).catch((res) => {

  })
}

//商品列表
export function getList(data) {
  if (!data) {
    data = ''
  }

  return axios.get(hostUrl + "/goods/list", {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {

  })
}


//商品详情
export function getDesc(goodsId) {
  return axios.get(hostUrl + '/goods/detail/' + goodsId).then((res) => {
    return Promise.resolve(res.data)

  }).catch((res) => {

  })
}

//注册接口
export function register(data) {
  return axios.post(hostUrl + '/user/register', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((res) => {

  })
}

//登录接口
export function login(data) {
  return axios.post(hostUrl + '/user/login', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((res) => {

  })
}


//评论接口
export function getGrade(data) {
  return axios.get(hostUrl + "/grade/" + data.goodsId + '?&page=' + data.page + '&limit=' + data.limit).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    alert('系统错误')
  })
}


//提交订单
export function submitOrder(data) {
  return axios.post(hostUrl + '/auth/order/post?token=' + data.token + '&userId=' + data.userId, data, {}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((res) => {

  })
}


//同步购物车
export function synCar(data) {
  return axios.post(hostUrl + '/auth/cart/synchronous?token='+ data.token + '&userId=' + data.userId, data).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//用户地址列表
export function gerDress(data) {
  return axios.get(hostUrl + '/auth/address/list', {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//订单列表
export function getOrderList(data) {
  return axios.get(hostUrl + '/auth/order/list', {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//新增地址

export function addAdress(data) {
  return axios.post(hostUrl + '/auth/address/update', data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//删除地址

export function deleteAddress(data) {
  return axios.post(hostUrl + '/auth/address/del', data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//取消订单
export function cancleOrder(data) {
  return axios.post(hostUrl + '/auth/order/cancle', data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//订单详情

export function getOrderDesc(data) {
  return axios.get(hostUrl + '/auth/order/detail/' +data.orderId , {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//确认收货地址
export function setDefault(data) {
  return axios.post(hostUrl + '/auth/address/setDefault', data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//订单支付
export function orderPay(data) {
  return axios.post(hostUrl + '/auth/order/pay', data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//清空购物车
export function emptyCar(data) {
  return axios.post(hostUrl + '/auth/cart/empty',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}

//获取购物车
export function getCarList(data) {
  return axios.get(hostUrl + '/auth/cart/list', {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}

//找回密码
export function getBack(data) {
  return axios.post(hostUrl + '/user/back',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//找回密码验证码
export function backCode(data) {
  return axios.post(hostUrl + '/user/backCode',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//发送激活验证码

export function againCode(data) {
  return axios.post(hostUrl + '/user/activate/again/code',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],

  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//激活


export function getCode(data) {
  return axios.post(hostUrl + '/user/activate/',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}


//确认收货
export function orderConfirm (data) {
  return axios.post(hostUrl + '/auth/order/confirm',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}
//提交评论
export function submitComment (data) {
  return axios.post(hostUrl + '/auth/grade/confirm',data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((res)=>{

  })
}
