<template>
  <div>
    <headback></headback>
    <div class="mui-content">
      <div class="class" id="classScroll">
        <div class="mui-scroll">
          <ul class="class-nav">
            <li :class="{'active':index==current}" ref="classily" @click="secondary(item,index)"  v-for="(item,index) in list"><a href="javascript:;">{{item.typeName}}</a></li>
          </ul>
        </div>
      </div>

      <div class="classSubScroll" id="classSubScroll">
        <div class="mui-scroll">
          <dl class="class-item clearfix">
            <dt ><a href="javascript:;" class="black">{{title}}</a></dt>
            <dd v-for="items in secondList"><router-link :to="{ path:'/prolist', query: { id:  items.typeId} }" >{{items.typeName}}</router-link></dd>
          </dl>
        </div>


      </div>
      <!-- mui-content end -->

    </div>
    <foot></foot>
  </div>
</template>

<script>
  import {ERR_OK} from "@/api/config";
  import {getTypes} from '@/api/getData'
  import {showTest} from '@/api/function'
  import headback from '@/components/headback'
  import foot from '@/components/foot'

  export default {
    data() {
      return{
        list:[],
        secondList:[],
        title:'',
        current:0
      }
    },
    created(){

      this.getTypes()

    },
    methods: {
      getTypes(){
        getTypes().then((res)=>{
          if(res.resultCode == ERR_OK){
            this.list = res.resultData
            this.secondList = res.resultData[0].secondType
            this.title = res.resultData[0].typeName
          }else {
            showTest(res.resultMsg)
          }
        })
      },
      secondary(item,index){
        this.current = index
        this.secondList = item.secondType
        this.title = item.typeName
      }
    },
    mounted(){
      var classScroll = mui('#classScroll').scroll();
      var classSubScroll = mui('#classSubScroll').scroll();
    },
    components: {
      headback,
      foot
    }
  }
</script>

<style scoped>

</style>
