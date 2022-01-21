<template>
  <div class="my-input">
    <input type="text" class="my-input__inner" @input="handleInput"/>
  </div>
</template>

<script>
export default {
  name: "Category",
  props:{
    value:{ //获取父组件的数据value
      type:String,
      default:''
    }
  },
  methods:{
    handleInput(e){
      this.$emit('input',e.target.value) //触发父组件的input事件
    }
  }
}
</script>

<style scoped>
.my-input {
  width: 180px;
  position: relative;
  font-size: 14px;
  display: inline-block;
}

.my-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
}
&:focus {
    outline: none;
    border-color: #409eff;
}
</style>
