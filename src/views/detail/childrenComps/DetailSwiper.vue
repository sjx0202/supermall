<template>
  <swiper class="detail_swiper">
  <swiper-item v-for="item in swiperImage">
      <img class="detail_Img" :src="item" alt=""/>
  </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper";
export default {
  name: "DetailSwiper",
  props: {
    swiperImage: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{

    }
  },
  methods:{

  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail_swiper{
  height: 300px;
  overflow: hidden;
}
</style>
