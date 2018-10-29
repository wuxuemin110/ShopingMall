<template>
    <div>
      <headback></headback>
      <div class="mui-content">
        <div class="pageBox">
          <div class="swiper-container" id="detail">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div id="detailScroll" class="modalScrollBox">
                  <div class="mui-scroll">
                    <div class="swiper-container" id="swiper3">
                      <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item in product.listPics" ><img  preview="1" :src="item.picUrl" ></div>
                      </div>
                      <div class="swiper-pagination" id="pag3"></div>
                    </div>
                    <div class="show-info box clearfix">
                      <h2 class="name">{{product.goodsName}} </h2>

                      <div class="specification">
                        <span v-for="items in product.detailTitles" >{{items.titleKey}}：{{items.titleValue}}</span>

                      </div>
                      <div class="price">
                        <span class="unit c5">¥{{product.finalPrice}}</span>
                        <span class="tdl">¥{{product.price}}</span>

                        <span v-show="product.inventory>0" class="fr">库存：<em class="c5">{{product.inventory}}</em> 件</span>
                      </div>

                    </div>

                    <div class="Review box mt10 clearfix">
                      <div class="idx-title">
                        <span class="name">用户评论 ({{sumCount}})</span>
                      </div>
                      <ul class="Review-list clearfix">
                        <li v-for="grade in smallList" class="item">
                          <div class="info">
                            <img src="@/assets/images/user.png" class="avatar">
                            <span class="name">{{grade.username}}</span>
                            <div class="level icon-level">
                              <div :style="{width:(grade.socre*10 +'%')}" class="icon-level"></div>
                            </div>
                          </div>
                          <div class="content">{{grade.description}}</div>
                          <div class="date">{{grade.createdTime}}</div>
                        </li>


                      </ul>
                      <div  v-show="GradeList.length != 0" class="view-more">
                        <a href="javascript:void(0)" class="btn bbgf" id="view-more">查看全部评价</a>
                      </div>


                      <div v-if="GradeList.length == 0"  class="car-none">
                        <img src="@/assets/images/stay-tuned.png" class="imgbox">
                        <div class="dsp">亲，暂时没有更新的评论哦！</div>

                      </div>
                    </div>
                    <div class="details box mt10 clearfix">
                      <div class="idx-title">
                        <span class="name">图文详情</span>
                      </div>
                      <div class="content">
                        <p v-for="notesPics in product.notesPics"><img :src="notesPics.picUrl"></p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div id="reviewScroll" class="modalScrollBox">
                  <div class="mui-scroll">
                    <div class="Review box b-b-l clearfix">
                      <div class="idx-title">
                        <span class="name">用户评论 ({{sumCount}})</span>
                      </div>
                      <ul class="Review-list clearfix">
                        <li v-for="grade in GradeList" class="item">
                          <div class="info">
                            <img src="@/assets/images/user.png" class="avatar">
                            <span class="name">{{grade.username}}</span>
                            <div class="level icon-level">
                              <div :style="{width:(grade.socre*10 +'%')}" class="icon-level"></div>
                            </div>
                          </div>
                          <div class="content">{{grade.description}}</div>
                          <div class="date">{{grade.createdTime}}</div>
                        </li>
                      </ul>

                      <div v-if="GradeList.length == 0"  class="car-none">
                        <img src="@/assets/images/stay-tuned.png" class="imgbox">
                        <div class="dsp">亲，暂时没有更新的评论哦！</div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <shopcars :product="product" @cartAdd="cartAdd" ></shopcars>
      <balls ref="child"></balls>
    </div>
</template>

  <script>

      import Swiper from '@/assets/js/swiper.min.js'
      import headback from '@/components/headback'
      import shopcars from '@/components/shopcars'
      import balls from '@/components/balls'
      import {getDesc,getGrade} from '@/api/getData'
      import {ERR_OK} from "@/api/config";


      export default {
          data(){
            return{
              product:{},
              GradeList:[],
              Gradedata:{
                goodsId:this.$route.query.id,
                page:1,
                limit:6
              },
              sumCount:'',
              maxPage:1,
              currentPage:1,
              smallList:[]
            }
          },
        created(){
          this._getDesc()
          this._getGrade()
        },
         mounted(){
           var detailScroll = mui('#detailScroll').scroll();
           var reviewScroll = mui('#reviewScroll').scroll();
           var orderScroll = mui('#orderScroll').scroll();

           var that = this;
           document.querySelector('#reviewScroll').addEventListener('scroll', function (e){
             var scrollTop = reviewScroll.y;
             if(scrollTop == reviewScroll.maxScrollY){
               if(that.maxPage>that.currentPage){
                 that.currentPage +=1;
                 that.Gradedata.page+=1;
                 that._getGrade()
               }
             }
           });



           var detail = new Swiper('#detail', {
             paginationClickable: true,
             autoplay: 0,
             preventClicks: false,
             autoplayDisableOnInteraction: false,
             resistanceRatio: 0,
             onTouchStart: function(detail) {
               var Fidx = detail.activeIndex;
               $(detail.slides[Fidx]).addClass("active");
             },
             onTouchEnd: function(detail) {
               var Fidx = detail.activeIndex;
               $(detail.slides[Fidx]).removeClass("active");
             },
             onSlideChangeEnd: function(detail) {
               var Fidx = detail.activeIndex;
               $(".h-nav .tab").removeClass("active");
               $(".h-nav .tab").eq(Fidx).addClass("active");

             }
           });

           $("#view-more").bind({
             tap: function() {
               console.log(11)
               detail.slideTo(1, 300, true);
               return false;
             }
           })


           $(".h-nav .tab").bind({
             tap: function() {
               var idx = $(this).index();
               detail.slideTo(idx, 300, true);
               return false;
             }
           });
         },
         methods:{
           cartAdd (target) {
             this.$nextTick(() => { //异步执行动画更流畅，优化体验
               this.$refs.child.drop(target)
             })
           },
           _getDesc(){
             let goodsid = this.$route.query.id;

            getDesc(goodsid).then((res)=>{
              if(res.resultCode == ERR_OK){
                this.product = res.resultData

                this.$nextTick(function () {
                  //主屏焦点图
                  var swiper = new Swiper('#swiper3', {
                    pagination: '#pag3',
                    paginationClickable: true,
                    autoplay: 0,
                    loop: true,
                    autoplayDisableOnInteraction: false
                  });
                })

                //异步图片
                this.$previewRefresh()

              }
              else {
                var that = this;
                mui.alert(res.resultMsg, '提示', '确定', function () {
                  that.$router.push('/prolist')
                });
              }
             })
           },
           _getGrade(){
             getGrade(this.Gradedata).then((res)=>{
               if(res.resultCode == ERR_OK){
                 this.sumCount = res.sumCount
                 for(var i = 0;i<res.resultData.length;i++){
                   this.GradeList.push(res.resultData[i])
                 }
                 this.maxPage = Math.ceil(res.sumCount/6)
                 let arr = this.GradeList.slice(0,2);
                 this.smallList = arr
               }
             })
           }
         },
         components:{
           headback,
           shopcars,
           balls

         }
      }
</script>

<style scoped>
.specification{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  height: auto;
}
.specification span{
  padding:3px 15px 3px 0px;
}
</style>
