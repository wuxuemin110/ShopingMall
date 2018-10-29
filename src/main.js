import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/mui.min.css'
import '@/assets/css/reset.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/swiper.min.css'
import '@/assets/css/css.css'
import '@/assets/css/m-css.css'
import $ from 'jquery'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading:  require('@/assets/images/grey-60x60.gif'),//这个是加载的loading过渡效果
})
import mui from '@/assets/js/mui.js'
Vue.prototype.mui = mui


import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
