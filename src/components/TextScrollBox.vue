<template>
  <div class="TextScrollBox clearfix">
    <i class="iconfont icon-tongzhi"></i>
    <div class="TextScroll" id="TextScroll">
      <ul class="clearfix">
        <li><a href="#">梦特娇MONTAGUT男女内衣混合专场</a><span class="date">03-19</span></li>
        <li><a href="#">阔太KUOTAI清仓优惠专场</a><span class="date">03-16</span></li>
        <li><a href="#">歌中歌Song of Song女装专场</a><span class="date">03-15</span></li>
        <li><a href="#">伊华欧秀EVAOUXIU女装专场</a><span class="date">03-07</span></li>
        <li><a href="#">珂莱蒂尔Koradior女装专场</a><span class="date">03-01</span></li>
        <li><a href="#">维欧艾VOA女装真丝专场</a><span class="date">02-28</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import TextVScroll from '@/assets/js/jquery.TextVScroll'
    export default {
        data(){
          return{

          }
        },
        methods:{

        },
        mounted(){

          //快讯滚动
          $("#TextScroll").TextVScroll();
        }
    }
</script>

<style scoped>

</style>
