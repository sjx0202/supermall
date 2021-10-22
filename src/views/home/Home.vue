<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center" >购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "./childrenComps/HomeSwiper";
import RecommendView from "./childrenComps/RecommendView";
import FeatureView from "./childrenComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";

import {getMultiData,getHomegoods} from "../../network/home";

import TabControl from "../../components/content/tabControl/TabControl";

import GoodsList from "../../components/content/goods/GoodsList";

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
      currentType:'pop'
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
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
      })
    }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  created() {
    this._getMultiData();
    this._getHomegoods('pop');
    this._getHomegoods('new');
    this._getHomegoods('sell');

  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control{
  position: sticky;
  top: 44px;
}
</style>
