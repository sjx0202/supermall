import {debounce} from "./utils";
import backTop from "components/content/backTop/BackTop";
export const itemlistenerMinXin = {
  data(){
    return{
      itemImgListener:null,
    }
  },
  mounted(){
    //使用防抖监听图片获取
    const newrefresh = debounce(this.$refs.scroll.refresh, 0);
    this.itemImgListener=()=>{
      newrefresh()
    }
    this.$bus.$on('itemDetailLoad',this.itemImgListener);
  }
}


export const backtopMinXin={
  data(){
    return {
      isShow:false
    }
  },
  components:{
    backTop
},
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500);
    },
  }
}
