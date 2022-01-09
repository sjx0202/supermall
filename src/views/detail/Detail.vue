<template>
  <div id="detail">
    <detail-nav-bar ref="detailNavBar" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll :probe-type="3" @scroll="betterScroll" class="content" ref="scroll">
      <detail-swiper :swiperImage="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list ref="recommend" :goods="goodsList"></goods-list>
    </scroll>
      <detail-bottom-bar></detail-bottom-bar>
    <back-top @backClick="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import DetailSwiper from "./childrenComps/DetailSwiper";
import DetailNavBar from "./childrenComps/DetailNavBar";
import DetailBaseInfo from "./childrenComps/DetailBaseInfo";
import DetailShopInfo from "./childrenComps/DetailShopInfo";
import DetailGoodsInfo from "./childrenComps/DetailGoodsInfo";
import DetailParamInfo from "./childrenComps/DetailParamInfo";
import DetailCommentInfo from "./childrenComps/DetailCommentInfo";
import DetailBottomBar from "./childrenComps/DetailBottomBar";
import Scroll from "../../components/common/scroll/Scroll";
import {getDetailData, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
import {debounce} from "../../common/utils";
import {itemlistenerMinXin,backtopMinXin} from "../../common/mixin";
import GoodsList from "../../components/content/goods/GoodsList";
export default {
  name: "Detail",
  mixins:[itemlistenerMinXin,backtopMinXin],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      goodsList: [],
      commentInfo: {},
      themTopYs:[],
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,

  },
  methods: {
    async _getDetailData() {
      let {result: {itemInfo, columns, shopInfo, detailInfo, itemParams, rate}} = await getDetailData(this.id);
      this.topImages = itemInfo.topImages;
      this.goods = new Goods(itemInfo, columns, shopInfo.services);
      this.shop = new Shop(shopInfo);
      this.paramInfo = new GoodsParam(itemParams.info, itemParams.rule);
      this.detailInfo = detailInfo;
      this.commentInfo = rate.list[0];
    },
    betterScroll(position) {
      // if((-position.y)>this.themTopYs[0]&&(-position.y)<this.themTopYs[1]){
      //   this.$refs.detailNavBar.activeIndex =0;
      // }else if((-position.y)>this.themTopYs[1]&&(-position.y)<this.themTopYs[2]){
      //   this.$refs.detailNavBar.activeIndex =1;
      // }else if((-position.y)>this.themTopYs[2]&&(-position.y)<this.themTopYs[3]){
      //   this.$refs.detailNavBar.activeIndex =3;
      // }else if((-position.y)>this.themTopYs[3]&&(-position.y)<this.themTopYs[4]){
      //   this.$refs.detailNavBar.activeIndex =4;
      // }else {
      //
      // }
      (-position.y)>1000?this.isShow=true:this.isShow=false;
      for(let i=0; i<this.themTopYs.length-1;i++){ //i str
        if((-position.y)>=this.themTopYs[i]&&(-position.y)<this.themTopYs[i+1]){
            this.$refs.detailNavBar.activeIndex = i;
        }
      }
    },

    imgLoad(){
      this.$refs.scroll.refresh();
      this.themTopYs.push(0)
      this.themTopYs.push(this.$refs.param.$el.offsetTop)
      this.themTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themTopYs.push(Number.MAX_VALUE);
      console.log(this.themTopYs)
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themTopYs[index],300);
    },
    //监听图片加载事件并且触发刷新
    // imgLoad(){
    //   this.$refs.scroll.refresh();
    // },
    _getRecommend() {
      getRecommend().then(res => {
        this.goodsList.push(...res.data.list);
      })
    }
  },
  created() {
    this.id = this.$route.params.id;
    this._getDetailData();
    this._getRecommend();
  },
  destroyed() {
    this.$bus.$off('itemDetailLoad',this.itemImgListener);
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);

}
</style>
