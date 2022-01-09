<template>
  <div class="wrapper">
    <ul class="content">
        <li>{{MessageItem.title[0]}}</li>
        <li v-for="item in MessageItem.message">{{item}}</li>
        <li v-for="item in MessageItem.button">{{item}}</li>
    </ul>
    <!-- you can put some other DOMs here, it won't affect the scrolling -->
  </div>
</template>


<script>
import BScroll from 'better-scroll';

export default {
  name: "Category",
  data(){
    return{
      MessageItem: {
        title:["Start a conversation","观看直播","Live"],
        message:["Our usual reply time","","start"],
        button:['Message','LiveShow','Live'],
        button_text:["Send us message","查看","订单查询"],
      }
    }
  },
  methods:{
    btn(){
      console.log(1);
    }
  },
  mounted() {
    //默认情况下BScroll是不可以实时的监听滚动位置的，如果想实时监听滚动位置必须在newBScroll后面传一个option后面给特传一个需要的参数
    //probeType 侦测  默认是0,1是不进行侦测 如果传入2话是在手指滚动的过程中侦测而手指离开后滚动的惯性是不进行侦测 如果传入3只要是滚动都进行侦测
    //click
    let wrapper = document.querySelector('.wrapper')
    let scroll = new BScroll(wrapper,{
     probeType:3,
      pullUpLoad: true,
    });
   //如果单纯使用on 监听position是打印不出来的必须在newscroll传入option
    scroll.on('scroll',(position)=>{
      console.log(position);
    });
    scroll.on('pullingUp',()=>{
      console.log('上拉加载更多');
    });
  }
}
</script>

<style scoped>
 .wrapper {
   height: 150px;
   background-color: pink;
   overflow: hidden;
 }
</style>
