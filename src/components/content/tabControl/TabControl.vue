<template>
  <div class="tabControl">
     <div class="tab-control-item"
          v-for="(item,index) in titles"
          :class="{active:currentIndex === index}"
          @click="itemClick(index)"
     ><span>{{item}}</span></div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index);
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
  .tabControl {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #ffffff;
  }

  .tab-control-item{
    flex:1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>

