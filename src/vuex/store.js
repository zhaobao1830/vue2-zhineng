import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
// 注册vuex
Vue.use(Vuex)
 let now = new Date()
 // let time = `${now.getHours()}:${now.getMinutes()}`
 let time = `${now.getHours()}`.length==2?(`${now.getMinutes()}`.length==2?`${now.getHours()}
 :${now.getMinutes()}`:`${now.getHours()}:0${now.getMinutes()}`)
 :(`${now.getMinutes()}`.length==2?`0${now.getHours()}:${now.getMinutes()}`:`0${now.getHours()}:0${now.getMinutes()}`)
// 初始化一些常用数据，根据vue的理念，使用到的数据都必须先进行初始化设置。
let state = {
  // 初始化基础数据
  data: { self: {}, friends: [] },
  // ajax请求数据是否结束
  isAjax: false,
  // 当前被选中或者在聊天中的friend的_id
  activeId: 1,
  // 聊天队列，这里为每个朋友添加了一个聊天队列，偷懒写法，如果有需要可以改成动态添加
  // _id是作为聊天队列的标记，list是聊天内容，list里的数据格式{_id:xx, message:xxx},组件内会根据_id来将对话插入
  // 到左边，还是右边，判断message是自己还是ai发出的
  messageList: [
    {
      _id: 1,
      list: [{ _id: 1, message: '你好,我是小智,欢迎您进行咨询,咨询方式可以参考以下内容:', time: time ,help_question:['咳嗽用药','咳嗽的症状','头痛忌口'] }],
    }
  ]
}
// 导出一个新生成的Store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
store.watch(
    (state) => state.messageList,
    (val) => {
      localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);
export default store