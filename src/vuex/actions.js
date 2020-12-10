// actions里存放的是异步操作
// 由于vuex中的state的变更只能由mutations进行操作，所以actions不直接进行数据操作，而是调用mutations方法
// 以下出现的that都是vue实例对象，因为把axios绑定在了Vue原型上，vuex无法调用，所以这里需要传入this

const actions = {
	 // 智能问诊机器人
	sendValue2: async ({ commit }, { _id, message, that }) => {
	  // 声明一个变量用来储存等下ajax获取的数据
	  let robotData = ''
	  // 处理输入的内容，设置self为true，作为一个标记。
	  commit('changeList', { self: true, _id, message })
	  // 进行ajax请求，此处的that是从组件内传来的对象this
	  // await that.$http.get('http://192.168.0.76:5001/qaRequest', {
	await that.$http.get('http://122.112.148.65:9004/qaRequest', {
	    params: {
	      question: message
	    }
	  }).then(res => {
	    // 将获取到的数据赋值给先前设置的变量
			robotData = res.data
			var len = robotData.help_question.length
			var help_question = []
			var more_question = []
			var question = []
			var message = ''
			if(robotData.final_answers instanceof Array){
				message = robotData.final_answers [0]
			}else{
				message = robotData.final_answers
			}
			if(len>5){
				for(var i = 0;i<len;i++){
					if(i<5){
						help_question.push(robotData.help_question[i])
					}else{
						more_question.push(robotData.help_question[i])
					}
				}
				commit('changeList', { _id, message: message ,help_question:help_question,more_question:more_question,question:question,more:true,less:false})
			}else{
				commit('changeList', { _id, message: message ,help_question:robotData.help_question,more:false,less:false})
			}
	  })
	},
}

export default actions
