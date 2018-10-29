<template>
    <div class="mui-content">
      <banner></banner>
      <div class="box clearfix">
        <ul class="idx-nav clearfix">
          <li class="item">
            <a href="#" class="tap">
              <img src="@/assets/images/ads-1.jpg" class="lazy" data-lazyload="images/ads-1.jpg" />
            </a>
          </li>
          <li class="item">
            <a href="#" class="tap">
              <img   src="@/assets/images/ads-2.jpg" class="lazy" data-lazyload="images/ads-2.jpg" />
            </a>
          </li>
        </ul>
        <TextScrollBox></TextScrollBox>
      </div>
      <div class="idx-sale-bt mt10"><span class="name black">热卖产品</span></div>
      <list></list>
      <foot></foot>
    </div>
</template>

<script>
  import TextScrollBox from '@/components/TextScrollBox'
  import foot from '@/components/foot'
  import banner from '@/components/banner'
  import sale from '@/components/sale'
  import brand from '@/components/brand'
  import list from '@/components/list'
    export default {
      data(){
          return{

          }
        },
      components:{
        foot,
        banner,
        TextScrollBox,
        sale,
        brand,
        list
      }
    }
</script>

<style scoped>

</style>
