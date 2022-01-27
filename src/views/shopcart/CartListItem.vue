<template>
  <div class="cartListItem">
    <div class="item-checkout" v-for="item in $store.state.cartList">
      <div class="item-checkout-left">
        <span class="checkbox-item">
          <span :class="{'is-active':item.checked}" @click="checkItem(item)"><img src="~/assets/img/cart/tick.svg" alt=""></span>
        </span>
      </div>
      <div class="item-checkout-center"><img @load="imgLoadCart" :src="item.image" alt=""></div>
      <div class="item-checkout-right">
        <div>{{item.title}}</div>
        <div>{{item.desc}}</div>
        <span class="right-text">￥{{item.realPrice}}</span>
        <span class="right-text-one">×{{item.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartListItem",
  computed: {
  },
  data() {
    return {

    }
  },
  methods: {
    checkItem(item){
      item.checked = !item.checked;
      this.$emit('checkItem');
    },
    imgLoadCart(){
      this.$bus.$emit('itemLoadCart');
    }
  },
};
</script>
<style scoped>
.item-checkout{
  padding: 10px;
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 1px 1px 1px #e8e8e8;
  margin-bottom: 5px;
}

.item-checkout .item-checkout-left{
  margin:auto 0;
}

.checkbox-item{
  border: 1px solid #e8e8e8;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-block;

}

.checkbox-item .is-active{
  background-color: #ff5777;
  width: 100%;
  height: 100%;
  display: inline-block;
  border-radius: 50%;
}

.checkbox-item span img {
  width: 100%;
  height: 100%;
}

.item-checkout .item-checkout-center {
  width: 22vw;
  height: 26.66667vw;
}

.item-checkout div img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.item-checkout-center {
  margin-left: 5px;
}

.item-checkout-right {
  margin-left: 10px;
  position: relative;
}

.item-checkout-right div{
  width:250px;
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.item-checkout-right div:first-child {
  font-size: 16px;
  color: #121212;
}

.item-checkout-right div:nth-child(2) {
  margin-top: 27px;
  font-size: 14px;
}

.item-checkout-right .right-text{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20px;
  display: inline-block;
}

.item-checkout-right .right-text-one{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
}

</style>
