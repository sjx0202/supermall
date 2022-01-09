<template>
  <div class ="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  methods:{
    //betterscroll里自带方法  scrollTo回到顶部
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time);
    },
    //每次下拉加载调一次这个方法
    finishPullUp(){
      this.scroll.finishPullUp();
    },
    refresh(){
      this.scroll && this.scroll.refresh();
    },
    getScroll(){
      return this.scroll.y;
    }
  },
  mounted() {
    this.scroll= new BScroll(this.$refs.wrapper,{
      //定义滑动1/2/3
      probeType:this.probeType,
      //div是否产生点击事件
      click:true,
      //是否开启下拉加载
      pullUpLoad: this.pullUpLoad
    });
    //监听滚动距离
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position);
    });
    //监听是否加载到底部
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp');
    });
    // console.log(this.scroll)
    //重新计算高度
    // this.scroll.refresh();
  }
}
</script>

<style scoped>

</style>
