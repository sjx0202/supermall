//cli2之前可以这样写  但是cli3以上不支持这样写
// module.exports={
//   configureWebpack:{
//     resolve:{
//       alias:{
//         'assets':'@/assets',
//         'common':'@/common',
//         'components':'@/components',
//         'network':'@/network',
//         'views':'@/views'
//       }
//     }
//   }
// }

//cli3 以上支持的写法
const path = require('path');//引入path模块
function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={
  chainWebpack:(config)=>{
    config.resolve.alias
      .set('@',resolve('./src'))
      .set('components',resolve('./src/components'))
      .set('views',resolve('./src/views'))
      .set('assets',resolve('./src/assets'))
      .set('common',resolve('./src/common'))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  }
}
