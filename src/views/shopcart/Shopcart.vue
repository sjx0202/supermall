<template>
  <div>
    <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import {mapGetters} from "vuex";
import CartList from "./CartList";
export default {
  name: "Shopcart",
  components:{
    NavBar,
    CartList,
  },
  computed:{
    ...mapGetters(['cartLength', 'cartList']),
    ...mapGetters({
      length:'cartLength',
      cart:'cartList'
    })
  }

}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
