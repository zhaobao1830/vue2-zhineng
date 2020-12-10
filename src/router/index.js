import Vue from 'vue'
import Router from 'vue-router'
// 注册router组件
Vue.use(Router)
// 导入组件
const dialog = require("../components/dialog/dialog.vue")
const pcPage = require("../components/pcpage/pcPage.vue")

let routes = [
	{ path: '/', name: 'index', component: dialog},
  { path: '/mobile', name: 'dialog', component: dialog},
	{ path: '/pcpage', name: 'pcpage', component: pcPage},
]

export default new Router({
  routes
})
