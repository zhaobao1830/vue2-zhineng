// 类似计算数据，根据state的数据，筛选或者暴露一格新数据

 let now = new Date()
 // let time = `${now.getHours()}:${now.getMinutes()}`
 let time = `${now.getHours()}`.length==2?(`${now.getMinutes()}`.length==2?`${now.getHours()}
 :${now.getMinutes()}`:`${now.getHours()}:0${now.getMinutes()}`)
 :(`${now.getMinutes()}`.length==2?`0${now.getHours()}:${now.getMinutes()}`:`0${now.getHours()}:0${now.getMinutes()}`)
const getters = {
  // 对当前消息队列中的消息进行加工，添加对应的好友资料
  nowMessageList: (state) => {
	let message = localStorage.getItem('vue-chat-session');
	let messObj = JSON.parse(message);
	if(messObj!=null){
		state.messageList = messObj
	}
	if(typeof(state.messageList) == "undefined" || state.messageList == null){
		state.messageList = [{"_id":1,"list":[{"_id":1,"message":"你好,我是小智,欢迎您进行咨询,咨询方式可以参考以下内容:","time":time,"help_question":["咳嗽用药","咳嗽的症状","头痛忌口"]}]}]
	}
    let list = state.messageList;
	if(typeof(list[0].list) == "undefined" || list[0].list==null){
		list[0].list = [{"_id":1,"message":"你好,我是小智,欢迎您进行咨询,咨询方式可以参考以下内容:","time":time,"help_question":["咳嗽用药","咳嗽的症状","头痛忌口"]}]
	}
	var messageData = list[0].list
	for(var i = 0; i < messageData.length;i++){
		if(typeof(messageData[i].more_question) != "undefined"){
			messageData[i].more = true
			messageData[i].less = false
			messageData[i].question = []
		}
	}
    return list
  }
}

export default getters
