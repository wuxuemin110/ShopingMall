import Vue from 'vue'
import Router from 'vue-router'
import index from '@/base/index'
import classify from '@/base/class'
import special from '@/base/special'
import car from '@/base/car'
import login from '@/base/login'
import reg from '@/base/reg'
import member from '@/base/member'
import prolist from '@/base/prolist'
import show from '@/base/show'
import order from '@/base/order'
import address from '@/components/address'
import delive from '@/components/delive'
import orderok from '@/base/orderok'
import twoClass from '@/components/twoClass'
import myOrder from '@/base/myOrder'
import myAddress from '@/base/myAddress'
import orderDesc from '@/base/orderDesc'
import forget from '@/base/forget'
import Activation from '@/base/Activationh5'
import evaluate from '@/base/evaluate'
import toReset from '@/base/toReset'
Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      redirect: "/index"
    },
    {
      path:'/index',
      component:index
    },
    {
      path:'/classify',
      component:classify,
      meta:['分类'],
      children:[
        {
          path:'/',
          component:twoClass,
          meta:['二级分类']
        }
      ]
    },
    {
      path:'/special',
      component:special,
      meta:['特卖']
    },
    {
      path:'/car',
      component:car,
      meta:['购物车']
    },
    {
      path:'/login',
      component:login,
      meta:['登录']
    },
    {
      path:'/reg',
      component:reg,
      meta:['注册']
    },
    {
      path:'/member',
      component:member,
      meta:['会员中心']
    },
    {
      path:'/prolist',
      component:prolist,
      meta:['产品列表']
    },
    {
      path:'/show',
      component:show,
      meta:['产品详情']
    },
    {
      path:'/order',
      component:order,
      meta:['提交订单'],
      children:[
        {
          path:'address',
          component:address,
          meta:['新增地址']
        },
        {
          path:'delive',
          component:delive,
          meta:['选择收货地址']
        }
      ]
    },
    {
      path:'/orderok',
      component:orderok,
      meta:['支付成功']
    },
    {
      path:'/myOrder',
      component:myOrder,
      meta:['订单管理']
    },
    {
      path:'/myAddress',
      component:myAddress,
      meta:['收货地址']
    },
    {
      path:'/orderDesc',
      component:orderDesc,
      meta:['订单详情']
    },
    {
      path:'/forget',
      component:forget,
      meta:['找回密码']
    },
    {
      path:'/Activation/h5',
      component:Activation,
    },
    {
      path:'/evaluate',
      component:evaluate,
      meta:['订单评价']
    },
    {
      path:'/toReset',
      component:toReset,
      meta:['再次激活']
    }
  ]
})
