const mutations = {
 addCounter(state,index){
   state.cartList[index].count += 1;
 },
  addToCart(state,payload){
    state.cartList.push(payload);
  },
  addCart(state,payload){
   //第一种方法
    // 1.通过es6  find方法遍历数组第一次进来遍历find find方法用于查找数组中满足条件的中的第一个值 返回给oldInfo
    // const oldInfo = state.cartList.find(item => item.id === payload.id);
   //  console.log(oldInfo) 存的是满足条件的对象
   // if (oldInfo){
   //      获取满足条件的索引
   //   const index = state.cartList.indexOf(oldInfo);
   //   state.cartList[index].count += 1;
   // }else{
   //     添加一个用于计数的值
   //   payload.count=1;
   //   state.cartList.push(payload);
   // }

    //第二种方法
    let oldInfo = null;
    for(let item of state.cartList){
      if(item.id===payload.id){
        oldInfo = item;
        console.log(oldInfo);
      }
    }
    if(oldInfo){
        const index=state.cartList.indexOf(oldInfo);
        console.log(index);
        state.cartList[index].count += 1;
    }else {
      payload.count = 1;
      state.cartList.push(payload)
    }
  }
}
export default mutations;
