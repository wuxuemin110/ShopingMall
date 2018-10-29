<template>
  <ul class="plist clearfix">
    <li v-for="item in list" class="item">
      <router-link :to="{ path:'/show', query: { id:  item.id} }" class="tap">
        <img style="height: 23vh;" id="imgWidth" v-lazy="item.logoPic" :key="item.logoPic" class="lazy imgbox imgWidth"/>
        <h2 class="name">{{item.goodsName}}</h2>
        <div class="price-box">
          <span class="c5">¥ <em class="fs2">{{item.finalPrice}}</em></span>
          <span class="tdl">¥{{item.price}}</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
  import {ERR_OK} from "@/api/config";
  import {getList} from '@/api/getData'
    export default {
      data(){
        return{
          list: []
        }
      },
      methods:{
        _getList(data) {
          getList(data).then((res) => {
            if (res.resultCode == ERR_OK) {
              this.list = res.resultData
            }
          })
        }
      },

      created(){
        this._getList(this.listdata)
      },
      mounted(){

      }
    }
</script>

<style scoped>

</style>
