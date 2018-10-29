<template>
  <div>
    <headback></headback>
    <div class="kh-40"></div>
    <div class="mui-content">
      <ul class="plist clearfix">

        <li v-for="item in list" class="item">
          <router-link :to="{ path:'/show', query: { id:  item.id} }" class="tap">
            <img  style="height: 23vh;" v-lazy="item.logoPic" :key="item.logoPic" class="lazy imgbox"/>
            <h2 class="name">{{item.goodsName}}</h2>
            <div class="price-box">
              <span class="c5">¥ <em class="fs2">{{item.finalPrice}}</em></span>
              <span class="tdl">¥{{item.price}}</span>
            </div>
          </router-link>
        </li>


      </ul>


    </div>
    <div v-if="list.length == 0" class="car-none">
      <img src="@/assets/images/stay-tuned.png" class="imgbox">
      <div class="dsp">亲，暂时没有更新的数据哦！</div>

    </div>

    <!-- filter start -->
    <div class="filter-bar active" id="filter-bar">
      <ul class="fb-nav" id="fb-nav">
        <li @click="sort" class="tab " id="sort"><a class="tap arrow" href="javascript:void(0)"><span>排序</span></a></li>
        <li @click="area" class="tab" id="area"><a class="tap arrow" href="javascript:void(0)"><span>分类</span></a></li>
        <li @click="afilter" class="tab" id="oFilter"><a class="tap" href="javascript:void(0)"><span>筛选</span><i
          class="iconfont icon-filter"></i></a></li>
      </ul>
    </div>
    <div class="sort filter-tab" id="sortTab">
      <ul class="sortList">
        <li @click="mutiple()" class="active">综合<i class="iconfont icon-select"></i></li>
        <li @click="sales()">销量<i class="iconfont icon-select"></i></li>
      </ul>
    </div>
    <div class="filterBox filter-tab" id="areaBox">
      <div class="modalScrollBox area-city" id="cityScroll">
        <div class="mui-scroll">
          <ul class="area-city-list">
            <li class="allClass" @click="allClass($event)">全部</li>
            <li @click="secondary(item,index)" :class="{'active':index==current}" v-for="(item,index) in typeList">
              {{item.typeName}}
            </li>

          </ul>
        </div>
      </div>
      <div class="modalScrollBox area-county" id="countyScroll">
        <div class="mui-scroll">
          <ul class="area-county-list">
            <li @click="secondTap(items,indexs,items.typeId)" :class="{'active':indexs==secondCurr}"
                v-for="(items,indexs) in secondList">{{items.typeName}}
            </li>

          </ul>
        </div>
      </div>
    </div>
    <div class="oFilterBox" id="oFilterBox">
      <ul class="filter-opn">
        <li>
          <button @click="reset()" class="btn borange" id="filterResetBtn">重置</button>
        </li>
        <li>
          <button @click="filterData(bottomPrice,maxPrice)" class="btn" id="filterOkBtn">确认</button>
        </li>
      </ul>
      <div id="oFilterScroll" class="modalScrollBox">
        <div class="mui-scroll">

          <div class="filter-item clearfix">
            <div class="filter-item-tit">价格区间(元)<i class="iconfont icon-bottom"></i></div>
            <div class="filter-price">
              <span class="to">—</span>
              <span class="input-box"><input v-model="bottomPrice" type="text" class="input-txt"
                                             placeholder="最低价"></span>
              <span class="input-box"><input v-model="maxPrice" type="text" class="input-txt" placeholder="最高价"></span>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div @click="close" class="layer-bg" id="filterBg" style="z-index:102;"></div>
    <div @click="close" class="layer-bg" id="OfilterBg" style="z-index:202;"></div>

    <foot></foot>
  </div>

</template>

<script>
  import {getTypes} from '@/api/getData'
  import {ERR_OK} from "@/api/config";
  import {getList} from '@/api/getData'
  import {showTest} from '@/api/function'
  import headback from '@/components/headback'
  import foot from '@/components/foot'

  export default {
    data() {
      return {
        list: [],
        typeList: [],
        secondList: [],
        current: 0,
        secondCurr: 0,
        listdata: {
          type: this.$route.query.id
        },
        bottomPrice: '',
        maxPrice: ''
      }
    },
    mounted() {
      var cityScroll = mui('#cityScroll').scroll();
      var countyScroll = mui('#countyScroll').scroll();
      var oFilterScroll = mui('#oFilterScroll').scroll();

      $('.sortList li').click(function () {
        var i =$(this).index();
        $('.sortList li').eq(i).addClass('active').siblings('').removeClass('active')
      })

      $('.area-city-list li').click(function () {
        var i =$(this).index();
        $('.area-city-list li').eq(i).addClass('active').siblings('').removeClass('active')
      })

    },
    methods: {
      //排序
      sort() {
        $('#sort').addClass('active')
        $('#sortTab').addClass('active');
        $("#filterBg").addClass("active");
        $('#areaBox').removeClass('active');
        $('#oFilterBox').removeClass('active');
      },
      //关闭遮罩
      close() {
        $(".filter-tab").removeClass("active");
        $("#filterBg").removeClass("active");
        $("#OfilterBg").removeClass("active");
        $("#oFilterBox").removeClass("active");

      },
      //分类
      area() {
        $('#area').addClass('active')
        $('#areaBox').addClass('active');
        $("#filterBg").addClass("active");
        $("#sortTab").removeClass("active");
      },
      //筛选
      afilter() {
        $('#oFilter').addClass('active')
        $('#OfilterBg').addClass('active');
        $("#oFilterBox ").addClass("active");
        $('#areaBox').removeClass('active');
        $("#sortTab").removeClass("active");
      },
      _getList(data) {
        getList(data).then((res) => {
          if (res.resultCode == ERR_OK) {
            this.list = res.resultData
          }
        })
      },
      _getTypes() {
        getTypes().then((res) => {
          if (res.resultCode == ERR_OK) {
            this.typeList = res.resultData
            this.secondList = res.resultData[0].secondType
          } else {
            showTest(res.resultMsg)
          }
        })
      },
      secondary(item, index) {
        $('.allClass').removeClass('active');
        this.current = index
        this.secondList = item.secondType
      },
      secondTap(items, indexs, typeid) {

        this.secondCurr = indexs
        this.listdata.type = typeid
        this._getList(this.listdata)
        $('#areaBox').removeClass('active');
        $("#filterBg").removeClass("active");

      },
      allClass(event) {

        delete this.listdata.type
        this._getList(this.listdata)
        $('#areaBox').removeClass('active');
        $("#filterBg").removeClass("active");

      },
      filterData(bottomPrice,maxPrice) {
        if(isNaN(bottomPrice) || isNaN(maxPrice)){
          mui.alert('请输入整数~', '提示', '确定', function () {

          });
          return
        }

        if(bottomPrice <0 || maxPrice <0){
          mui.alert('输入金额不能小于0~', '提示', '确定', function () {

          });
          return
        }

        if(bottomPrice >= maxPrice){
          mui.alert('最低价不能大于等于最高价', '提示', '确定', function () {

          });
          return
        }

        if(bottomPrice != '' || maxPrice != ''){
          this.listdata.minPrice = Number(bottomPrice);
          this.listdata.maxPrice = Number(maxPrice);
        }
        this._getList(this.listdata)
        this.close();
      },
      mutiple(){
        delete this.listdata.orderSales
        this._getList(this.listdata)
        $("#filterBg").removeClass("active");
        $("#sortTab").removeClass("active");
      },
      sales(){

        this.listdata.orderSales = 0;
        this._getList(this.listdata)
        $("#filterBg").removeClass("active");
        $("#sortTab").removeClass("active");
      },
      reset(){
        this.bottomPrice = '';
        this.maxPrice = '';
        delete this.listdata.minPrice;
        delete this.listdata.maxPrice;
      }

    },
    created() {
      this._getList(this.listdata)
      this._getTypes()
    },
    components: {
      foot,
      headback
    }
  }
</script>

<style scoped>

</style>
