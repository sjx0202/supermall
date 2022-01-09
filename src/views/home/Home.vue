<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center" >购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="titles" @tabClick="tabClick" ref="tab-control1"  v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentscroll" :pull-up-load="true" @pullingUp="loadMore" >
      <!--:pull-up-load="true" @pullingUp="loadMore"-->
    <home-swiper :banners="banners" @swiperImageLoad="swiperImgLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="titles" @tabClick="tabClick" ref="tab-control2"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @backClick="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childrenComps/HomeSwiper";
import RecommendView from "./childrenComps/RecommendView";
import FeatureView from "./childrenComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getMultiData,getHomegoods} from "../../network/home";

import TabControl from "../../components/content/tabControl/TabControl";

import GoodsList from "../../components/content/goods/GoodsList";

import {debounce} from "../../common/utils";

export default {
  name: "Home",
  data(){
    return{
      banners: [],
      recommends:[],
      titles:['流行','新款','精选'],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShow:false,
      tabOffsetTop:0,
      isTabFixed:false,
      scrollerHeight:0,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.scrollerHeight,0);
    this.$refs.scroll.refresh();
  },
  deactivated(){
    this.scrollerHeight = this.$refs.scroll.getScroll();
  },
  methods:{
    /**
     * 事件监听相关方法
     */
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs["tab-control1"].currentIndex=index;
      this.$refs["tab-control2"].currentIndex=index;
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500);
    },
    contentscroll(position){
      // console.log(position);
      // this.isShow=(-position.y)>1000;
      (-position.y)>1000?this.isShow=true:this.isShow=false;
      //决定tab0control是否吸顶
      this.isTabFixed = (-position.y)>this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore(){
        this._getHomegoods(this.currentType);
        // this.$refs.scroll.scroll.refresh();
    },
    swiperImgLoad(){
      this.tabOffsetTop = this.$refs["tab-control2"].$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    _getMultiData() {
      getMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    _getHomegoods(type){
      const page = this.goods[type].page + 1;
      getHomegoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      })
    },
    /**
    * 使用async await 解构赋值
    */
    async _awaitMultiData(){
      let {data:{banner}} = await getMultiData();
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    this._getMultiData();
    this._getHomegoods('pop');
    this._getHomegoods('new');
    this._getHomegoods('sell');
    this._awaitMultiData();

  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,0);
    this.$bus.$on('itemImageLoad',()=>{
      // this.$refs.scroll.refresh();
      refresh();
    });
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.tab-control{
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
