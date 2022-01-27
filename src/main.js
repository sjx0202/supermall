import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import FastClick from 'fastclick'
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
import LazyLoad from 'vue-lazyload'

//解决移动端延迟300mm问题
FastClick.attach(document.body);
//懒加载
Vue.use(LazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
