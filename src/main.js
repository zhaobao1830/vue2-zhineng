// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router/index'
import store from './vuex/store'
import MuseUI from 'muse-ui';
import $ from 'n-zepto'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import '../static/css/mui.css'
import '../static/css/swiper.min.css'
import '../static/css/intelligent.css'


Vue.use(MuseUI);
window.http = "http://122.112.148.65:9005"
// window.http = "http://192.168.0.76:9005"
// 在vue原型中添加$http方法等于axios
Vue.prototype.$http = axios
// 设置默认打开的页面
// router.replace('pcpage')

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  // 注入路由
  router,
  // 注入vuex的store
  store,
  components: { 
		App,
	},
  // 组件创建前，进行异步数据数据请求
  // beforeCreate() {
  //   this.$store.dispatch('getAllData', this)
  // }
})
