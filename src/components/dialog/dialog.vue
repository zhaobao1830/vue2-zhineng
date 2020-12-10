<template>
  <div class="dialog">
		<mu-appbar
		           :zDepth="0">
			<!-- <mu-icon-button slot="left" icon="arrow_back_ios" style="color:#BBBBBB" @click="$router.back(-1)"/> -->
			<img slot="left" src="/static/images/ic_back_grey.png" style="width:24px;height:24px" @click="$router.back(-1)"/>
			<span class="span-title">智能问诊</span>
    </mu-appbar>
		<my-intelligent ref="intell" :show="open" @toggle="toggle" @scrollC="scrollC"></my-intelligent>
    <!--对话内容-->
    <div>
      <div class="patch-1"></div>
      <my-dialogue :userData="userData"
                   class="dialogue"
                   @scrollC="scrollC"></my-dialogue>
      <div class="patch-2"></div>
      <!--锚点-->
      <a name="mobile"
         href="#mobile"
         ref="end"
         style="height:0;color:rgba(0,0,0,0)">.</a>
    </div>
		<mu-chip class="demo-chip" @delete="handleClose" showDelete>
			<span style="font-size: 15px">不知道什么病,去<a @click="toggle()">症状导诊</a>一下吧</span>
		</mu-chip>
		<mu-float-button icon="add" mini class="demo-float-button" @click="showChip" />
    <div class="footer" ref="footer">
      <div class="top">
        <mu-text-field hintText="输入文字"
                       v-model="value"
                       @focus="focus"
                       @blur="blur"
                       @keyup.enter.native="sendValue"
					    multiLine :rows="1.2" :rowsMax="10"
                        />
			<mu-raised-button @click="sendValue" label="发送" class="demo-raised-button" primary/>
      <!-- <mu-icon-button
                        @click="sendValue"/> -->
      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import myDialogue from './dialogue'
import myIntelligent from './intelligent'

export default {
  name: 'dialog_b',
  components: {
    myDialogue,
		myIntelligent
  },
  data() {
    return {
	  num: 0,
      value: '',
      timer: {},
	  open: false,
	  history_len: 0,
    }
  },
	created() {
		this.history_len = window.history.length + 1
		let open = this.$route.query.open
		if(typeof open == "undefined" || open == null || open == ""){
			this.open = false;
		}else{
			if(open == "true"){
				this.open = true;
			}
		}
		document.querySelector('body').setAttribute('style', 'background:url("")')
	},
  computed: {
    ...mapState({
      self: state => state.data.self,
      headerTitle: 'headerTitle'
    }),
    userData() {
      return {
					self: {
					"_id": 0,
					"avatar": "/static/images/patient.png",
					"name": "不忘初心",
				},
        friend: {
					"_id": 1,
					"avatar": "/static/images/p.png",
					"name": "智杰小智",
				}
      }
    }
  },
  mounted() {  //使用keep-alive时可以放在activated内
    if (window.history && window.history.pushState) {
		history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.listenBack, false);
    }
  },
  methods: {
    ...mapMutations(['showDialog', 'getActiveId', 'showPersonindex']),
    showDialog_x() {
      this.showDialog()
      this.getActiveId({ activeId: 1 })
      this.$router.push(this.headerTitle)
    },
	listenBack() {
		console.log(this.history_len, window.history.length)
		if(window.history.length == this.history_len){
			if(this.open == true){
				if(this.$refs.intell.taparr()){
					this.$refs.intell.tapHide()
				}else{
					this.open = false
					this.history_len = this.history_len-1
				}
			}else{
				var backNum = window.history.length
				this.$router.back(-backNum);
			}
		}else{
			this.history_len = window.history.length
		}
	},
    showPersonindex_x() {
      this.showDialog()
      this.showPersonindex()
      this.$router.push(this.headerTitle)
    },
		sendValue(){
			this.num = 1
			if (this.value.length) {
			  this.$store.dispatch('sendValue2', {
			    _id: this.userData.friend._id,
			    message: this.value,
			    that: this
			  })
			} else {
			  console.log('不能为空')
			}
			this.value = ''
		},
		sendHelpQuestion(msg){
			if (msg.length) {
			  this.$store.dispatch('sendValue2', {
			    _id: this.userData.friend._id,
			    message: msg,
			    that: this
			  })
			} else {
			  console.log('不能为空')
			}
			this.value = ''
		},
		handleClose() {
			$(".demo-chip").hide()
			$(".demo-float-button").show()
    },
		showChip(){
			$(".demo-chip").show()
			$(".demo-float-button").hide()
		},
    // 监听子组件事件
    scrollC() {
      // 取巧的方法，每次组件更新后模拟点击，破坏性的修改哈希值，但是简便（此处可以修改为正常控制滚动条）
		if(this.num){
			this.$refs.end.click()
		}
    },
	scrollC_open(){
		this.$refs.end.click()
	},
    // 输入框获得焦点时触发
    focus() {
      this.timer.T = setInterval(() => {
        // 完美解决输入框被软键盘遮挡
        this.$refs.footer.scrollIntoView(false)
      }, 200)
    },
    blur() {
      // 输入框失去焦点时清除定时器
      clearInterval(this.timer.T)
    },
	toggle(){
      this.open = !this.open
			// if(this.open == true && this.history_len != window.history.length){
			// 	this.history_len = window.history.length
			// 	// console.log(this.history_len, window.history.length)
			// }
    },
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.dialog
  z-index: 999
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background: color-g
  .patch-1
    height: 60px
  .patch-2
    height: 90px
    background: color-g
  .mu-appbar
    box-shadow: 10px 10px 10px rgba(0,0,0,0.1)
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 45px
    background: color-w
    color: #000000
		.span-title
			top:0
			left:49%
			transform: translate(-49%, -10%);
			position:absolute
			font-size:16px
			font-weight:500
		.demo-chip
			position: absolute
			right: 5%
			bottom: 10%
		.demo-float-button
			width:30px
			height:30px
			display:none
			position: absolute
			right: 5%
			bottom: 10%
  .dialogue
    width: 98%
  .footer
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    min-height: 50px
    text-align: center
    background: color-w
    .top
      width:100%
      display: flex
      justify-content: center
      padding: 10 10px
      .mu-text-field
        width:100%
      .mu-icon-button
        width:10%
        display: inline-block
        margin-left:0
        vertical-align: top
</style>
