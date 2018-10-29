<template>



  <div class="ball-container">
    <div v-for="(ball, index) in balls" :key="index">
      <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div v-show="ball.show" class="ball">
          <div class="inner inner-hook">1</div>
        </div>
      </transition>
    </div>
  </div>


</template>

<script>

  export default {
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []

      }
    },
    methods: {
      drop(el) {

        //触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (ball.show === false) {
            ball.show = true;
            ball.el = el; //设置小球的el属性为一个dom对象
            this.dropBalls.push(ball);
            return; //此处return终结函数,这意味着每次触发事件,dropBalls内只增加一个ball
          }
        }


      },
      beforeEnter(el) {

        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); //获取元素的位置
            let x = rect.left - 280; //小球掉落X轴起点
            let y = rect.top -18 ; //小球掉落Y轴起点,向下为负
            el.style.display = "";
            el.style.webkitTransform = `translate3d(0, ${y}px,0)`; /* Safari 和 Chrome */
            el.style.transform = `translate3d(0, ${y}px,0)`; //旋转div元素

            // 处理内层动画
            let inner = el.getElementsByClassName("inner-hook")[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el, done) {

        //关闭ESlint语法监测，因为ES6语言规范会让被申明却未被调用的变量报错
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //申明rf是为了触发浏览器的重排
        this.$nextTick(() => {
          //修改数据之后立即使用这个方法，获取更新后的 DOM。
          el.style.webkitTransform =
            "translate3d(0, 0, 0)"; /* Safari 和 Chrome */
          el.style.transform = "translate3d(0, 0, 0)"; //旋转div元素
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = "translate3d(0, 0, 0)";
          inner.style.transform = "translate3d(0, 0, 0)";
          el.addEventListener("transitionend", done); //Vue为了知道过渡的完成，否则无法进入到afterEnter中
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift(); //把数组的第一个元素从其中删除，并返回第一个元素的值。
        if (ball) {
          ball.show = false;
          el.style.display = "none"; //隐藏小球
        }
      },
    }

  }
</script>

<style scoped>
  @import url(../assets/css/Animate.css);
 .ball{
   position: fixed;
   right: 2px;
   top: 3px;
   z-index: 200;
   transition: all 0.5s cubic-bezier(.21,.37,.05,.82);
 }

 .inner {
   width: 18px;
   height: 18px;
   border-radius: 50%;
   color: #ee0048;
   background: #fff;
   border:1px solid #ee0048;
   line-height: 18px;
   text-align: center;
   transition: all 0.4s linear;
 }

</style>
