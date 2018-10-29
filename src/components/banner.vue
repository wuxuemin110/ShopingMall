<template>
  <div class="swiper-container" id="mfocus">
    <div class="swiper-wrapper">
     <!-- <div v-if="bannerList" v-for="item in bannerList" class="swiper-slide"><a :href="item.url"><img  :src="item.picture"></a>
      </div>-->
      <div class="swiper-slide"><img src="@/assets/images/focus1.jpg"></div>
      <div class="swiper-slide"><img src="@/assets/images/focus2.jpg"></div>
      <div class="swiper-slide"><img src="@/assets/images/focus3.jpg"></div>
      <div class="swiper-slide"><img src="@/assets/images/focus4.jpg"></div>
      <div class="swiper-slide"><img src="@/assets/images/focus5.jpg"></div>
    </div>

    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from '@/assets/js/swiper.min.js'
  import {getBannel} from '@/api/getData'
  import {ERR_OK} from "@/api/config";

  export default {
    data() {
      return {
        bannerList: []
      }
    },
    created() {

    },
    methods: {
      getBannel() {
        getBannel().then((res) => {

          if (res.data.resultCode == ERR_OK) {
            this.bannerList = res.data.resultData

          }
        })
      }
    },
    mounted() {
      /*this.getBannel();*/
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true,
      })
    }

  }
</script>

<style scoped>

</style>
