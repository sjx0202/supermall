import {request} from "./network";

//请求轮播图
export function getMultiData(){
  return request({
    url:'/home/multidata'
  })
}

//请求home商品
export function getHomegoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

// 不使用promise进行封装
// export  function getNultiData(){
//   return requeste(
//     {
//       url:'/home/multidata',
//       method:'get'
//     },
//     function (res){
//       console.log(res)
//     },
//     function (err){
//       console.log(err)
//     }
//   )
// }
