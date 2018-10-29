<template>
  <div>
    <headback></headback>
    <div class="mui-content">
      <sale></sale>
      <foot></foot>
    </div>
  </div>

</template>

<script>
    import sale from '@/components/sale'
    import headback from '@/components/headback'
    import foot from '@/components/foot'
    export default {
      data(){
        return{

        }
      },
      methods:{

      },
      components:{
        sale,
        headback,
        foot
      }
    }
</script>

<style scoped>

</style>
