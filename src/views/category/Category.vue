<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
    <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
    <scroll id="tab-content"
            :data="[categoryData]"
            ref="scroll">
      <div>
        <category-item :subcategories="showSubcategory" />
        <tab-control :titles="titles"
                     @tabClick="tabClick"/>
        <goods-list :goods="showCategoryDetail"/>
      </div>
    </scroll>
    </div>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from 'components/content/tabControl/TabControl'
import TabMenu from "./childrenComps/TabMenu";
import Scroll from 'components/common/scroll/Scroll'
import CategoryItem from "./childrenComps/CategoryItem";
import {POP, SELL, NEW} from "common/const";
import GoodsList from 'components/content/goods/GoodsList'
import {getCategory, getSubcategory,getCategoryDetail} from "../../network/category";
import {debounce} from "../../common/utils";

export default {
  name: "Category",
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType:POP,
      titles:['综合', '新品', '销量']
    }
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  components: {
    TabMenu,
    NavBar,
    CategoryItem,
    Scroll,
    GoodsList,
    TabControl
  },
  methods: {
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
    },
    _getCategory() {
      getCategory().then(res => {
        this.categories = res.data.category.list;
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategory(0);
      })
    },
    async _getSubcategory(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      let {data} = await getSubcategory(mailKey);
      this.categoryData[index].subcategories = data;
      //这里是因为此函数是一个异步函数,在计算属性return时候并没有查到当前值所以为空
      //通过此方式进行浅拷贝一次。让次函数异步加载完有值，让计算属性获取到
      this.categoryData = {...this.categoryData}
      this._getCategoryDetail(POP)
      this._getCategoryDetail(SELL)
      this._getCategoryDetail(NEW)
    },
    _getCategoryDetail(type){
      // 1.获取请求的miniWallkey
      const miniWallkey=this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })

    },
    selectItem(index) {
      this._getSubcategory(index);
    }
  },
  created() {
    this._getCategory();
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,0);
    this.$bus.$on('itemImageLoad',()=>{
      // this.$refs.scroll.refresh();
      this.$refs.scroll.refresh()
    });
  }
}
</script>

<style scoped>
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: absolute;
  z-index: 2;
  width: 100%;
}
#category {
  height: 100vh;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}

#tab-content {
  height: 100%;
  flex: 1;
}
</style>

