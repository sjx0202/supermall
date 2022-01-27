<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  name: "Toast",
  props:{
    message:{
      type:String
    },
    isShow:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.toast {
  padding: 20px 40px;
  text-align: center;
  background-color: rgba(0,0,0,.8);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  color:#ffffff;
  font-size: 16px;
}

</style>
