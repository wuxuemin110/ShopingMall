<template>
  <transition name="slide">

   <div class="address">
     <headback></headback>
     <div id="addAddrScroll" class="modalScrollBox">
       <div class="mui-scroll">
         <ul class="form-list clearfix">
           <li class="item f-list-pl4">
             <span class="name">收货人</span>
             <input type="text" class="txt" value="" placeholder="请输入收货人姓名">
           </li>
           <li class="item f-list-pl4">
             <span class="name">省/市/区</span>
             <input type="text" class="txt" id="addr" value="" placeholder="请选择省/市/区">
             <i class="iconfont icon-bottom"></i>
           </li>
           <li class="item f-list-pl4">
             <span class="name">详细地址</span>
             <input type="text" class="txt" value="" placeholder="请输入街道门牌信息">
           </li>
           <li class="item f-list-pl4">
             <span class="name">联系电话</span>
             <input type="text" class="txt" value="" placeholder="请输入手机号或座机号码">
           </li>
           <li class="item">
             <div class="tap">
               <span class="name">设为默认地址</span>
               <div class="mui-switch" id="auto-renewal">
                 <div class="mui-switch-handle"></div>
               </div>
             </div>
           </li>
         </ul>
         <div class="exit-opn"><a href="javascript:void(0)" class="btn Large">提交</a></div>
       </div>
     </div>
   </div>

  </transition>
</template>

<script>
    import headback from '@/components/headback'
    export default {

      data(){
        return{

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
  .address{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 109;
    padding-top: 44px;
  }
</style>
