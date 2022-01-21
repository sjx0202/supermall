<template>
  <div class="cart-list">
    <scroll class="cart-list">
    <cart-list-item @checkItem="checkItem"></cart-list-item>
    </scroll>
    <div class="all-checkout">
     <div class="checkbox-item" @click="checkAll">
          <span :class="{'item-checkAll':checkAllFlag}"><img src="~/assets/img/cart/tick.svg" alt="" ></span>
     </div>
      <span>全选</span>
      <span>合计：{{totalMoney.toFixed(2)}}</span>
      <span class="calculate"><i>去计算（{{checkNum}}）</i></span>
    </div>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  data(){
    return{
      itemCheckAll:[],
      totalMoney: 0,  //总价
      checkNum: 0,  //选择的商品数量(结算需要显示的数量)
      checkAllFlag:false,  //是否全选
    }
  },
  components:{
    CartListItem,
    Scroll
  },
  computed:{
  },
  activated() {
    //进入页面判断价格  然后判断有无选中的按钮。如果有false没有true在计算价格
    this.totalMoney = 0;
    this.checkNum = 0;
    this.total();
    this.totalPriceAll();
    const add= this.$store.state.cartList.find((item)=>{
        return item.checked ===false;
    });
    if(add){
      this.checkAllFlag = false;
    }else {
      this.checkAllFlag = true;
    }
  },
  methods:{
    //单选商品
    checkItem(){
      //点击一次调用方法 计算价格。
      this.totalMoney=0;
      this.checkNum = 0;
      this.total();
      this.totalPriceAll();
      //点击后判断数组里是否有false 的如果有返回true
      const allCheckItem = this.$store.state.cartList.some((item)=>{
        return item.checked ===false;
      });
      // 如果有那么让全选按钮关闭
      if (allCheckItem){
        this.checkAllFlag =false;
      }else{
        this.checkAllFlag=true;
      }
    },
    total(){
      //过滤 判断item为true的
      this.itemCheckAll = this.$store.state.cartList.filter((item)=>{
        return item.checked===true;
      })
    },
    //求item为true的价格*数量综合
    totalPriceAll(){
       this.itemCheckAll.forEach((item)=>{
         this.checkNum+=item.count;
         this.totalMoney+=item.realPrice*item.count;
       })
     },
    //全选让所有checked为true然后再过滤在计算总价
    checkAll(){
      this.checkAllFlag =true;
      this.$store.state.cartList.forEach(item=>{
        item.checked =true;
        this.totalMoney=0;
        this.checkNum = 0;
        this.total();
        this.totalPriceAll()
      });
    }
  },
  //监听itemCheckAll的变化
  watch:{
    itemCheckAll:function (val){
      this.itemCheckAll = val;
    },
    deep:true
  }
}
</script>

<style scoped>
.cart-list {
  overflow: hidden;
  position: absolute;
  top: 24px;
  bottom: 56px;
  left: 0;
  right: 0;
}

.checkbox-item{
  border: 1px solid #e8e8e8;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-top: 15px;
}
.checkbox-item .item-checkAll {
  background-color: #ff5777;
  width: 100%;
  height: 100%;
  display: inline-block;
  border-radius: 50%;
}

.checkbox-item .item-checkAll img {
  width: 100%;
  height: 100%;
}
.all-checkout {
  position: fixed;
  bottom: 49px;
  left: 0;
  height: 60px;
  background-color:#eeeeee;
  box-shadow: #999999;
  width: 100%;
  padding: 0 20px;
}
.all-checkout span:nth-child(2){
  padding: 0 5px;
}
.all-checkout span:nth-child(3){
  padding: 0 20px;
}
.all-checkout .calculate{
  position: absolute;
  right: 0;
  display: inline-block;
  padding: 0 20px;
  height: 100%;
  background-color: #f13e3a;
  color: #ffffff;
}

.all-checkout .calculate i {
  display: inline-block;
  margin-top:20px;
}
</style>
