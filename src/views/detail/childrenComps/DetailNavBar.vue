<template>
  <div>
    <nav-bar class="detail_home">
      <img slot="left" class="back" @click="backClick" src="~assets/img/common/back.svg" alt="">
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :key="index" @click="activeClick(index)" :class="activeIndex===index?'active':''">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      activeIndex:0
    }
  },
  components:{
    NavBar
  },
  methods:{
    activeClick(index){
      this.activeIndex=index;
      this.$emit('titleClick',index);
    },
    backClick(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 14px;
  }
  .active {
    color: var(--color-high-text);
  }

  .back {
    margin-top: 12px;
  }
</style>
