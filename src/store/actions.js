import {ADD_T0_CART,ADD_COUNTER} from "./mutations-types";
const actions = {
  addCart(context,payload){
    return new Promise(resolve => {
      let oldProduct = null;
      for(let item of context.state.cartList){
        if(item.id  === payload.id){
          oldProduct = item;
        }
      }
      if(oldProduct){
        const index = context.state.cartList.indexOf(oldProduct);
        context.commit('ADD_COUNTER',index);
      }else{
        payload.count =1;
        context.commit('ADD_T0_CART',payload)
      }
      resolve();
    })
  }

}

export default actions;
