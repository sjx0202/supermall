<template>
  <tabbar>
    <tabbar-item path="/home" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tabbar-item>
    <tabbar-item path="/cart" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">中心</div>
    </tabbar-item>
  </tabbar>
</template>

<script>
import Tabbar from "components/common/tabbar/Tabbar";
import TabbarItem from "components/common/tabbar/TabbarItem";
export default {
  name: "Maintabbar",
  components:{
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped>

</style>
