// vuex中state的数据只能被mutations方法所更改

const mutations = {
	search (state, value) {
	    state.filterKey = value;
	},
  changeList: (state, obj) => {
    let now = new Date()
    let time = `${now.getHours()}`.length==2?(`${now.getMinutes()}`.length==2?`${now.getHours()}
    :${now.getMinutes()}`:`${now.getHours()}:0${now.getMinutes()}`)
    :(`${now.getMinutes()}`.length==2?`0${now.getHours()}:${now.getMinutes()}`:`0${now.getHours()}:0${now.getMinutes()}`)
    // 判断信息是自己的还是ai的，然后插入聊天队列中
    console.log(obj)
    if (obj.self) {
      // 信息是自己发送的
			for(var i = 0; i<state.messageList.length ;i++){
				var item = state.messageList[i]
				// if (item._id === obj._id) {
				obj._id = 0
				item.list.push({ ...obj, time })
				// }
			}
    } else {
      // 信息是ai发送的
			for(var i = 0; i<state.messageList.length ;i++){
				var item = state.messageList[i]
				// if (item._id === obj._id) {
				item.list.push({ ...obj, time })
				// }
			}
    }
  },
  changeFlag(state, vule){
	  state.isSend = vule
  }
}

export default mutations
