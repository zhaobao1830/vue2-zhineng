<template>
  <div>
    <div class="dialogue" id="dialogue" v-for="item of messageList_x">
			<p class="time">
			    <span>{{ item.time}}</span>
			</p>
      <mu-list-item :disableRipple="true">
        <mu-avatar :src="item._id===0?userData.self.avatar:userData.friend.avatar"
                   :slot="item._id===0?'rightAvatar':'leftAvatar'"/>
        <!-- <span :slot="item._id===0?'after':'title'"> -->
			 <span :class="item._id===0?'self':'friend'">{{item.message}}</span>
        <!-- </span> -->
       <div v-for="subItem in item.help_question">
        <span style="color: orange;display: inline-block;position: relative;cursor: pointer;
        padding: 0 20px; min-height: 20px;line-height: 2;font-size: 14px;word-break: normal;
        text-align: left;word-break: break-all;top:5px;
        background:transparent url('../../../static/images/anwer.png') no-repeat left center;
        background-size:16px;border-bottom:1px solid orange;" @click="sendValue(subItem)">{{ subItem }}</span>
       </div>
       <div v-for="subItem in item.question" >
        <span style="color: orange;display: inline-block;position: relative;cursor: pointer;
        padding: 0 20px; min-height: 20px;line-height: 2;font-size: 14px;word-break: normal;
        text-align: left;word-break: break-all;top:5px;
        background:transparent url('../../../static/images/anwer.png') no-repeat left center;
        background-size:16px;border-bottom:1px solid orange;" @click="sendValue(subItem)">{{ subItem }}</span>
       </div>
       <div :class = "item.more === true?'more':'less'">
        <span style="color: #909090;display: inline-block;position: relative;cursor: pointer;
        padding: 0 20px; min-height: 30px;line-height: 2;font-size: 12px;word-break: normal;
        text-align: right;word-break: break-all;top:5px;
        background-size:16px;" @click="addMore(item)">更多⇩</span>
       </div>
       <div :class = "item.less === true ?'more':'less'">
        <span style="color: #909090;display: inline-block;position: relative;cursor: pointer;
        padding: 0 20px; min-height: 20px;line-height: 2;font-size: 12px;word-break: normal;
        text-align: right;word-break: break-all;top:5px;
        background-size:16px;" @click="removeMore(item)">收起⇧</span>
       </div>
      </mu-list-item>
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	name: 'dialogue_b',
	props: ['userData'],
	computed: {
	...mapGetters(['nowMessageList']),
	// 获取到当前的聊天记录
		messageList_x() {
		  // 赛选信息
			let message = this.nowMessageList[0]
			return message.list;
		}
	},
	mounted(){
		this.$parent.scrollC_open();
	},
	updated() {
		this.$emit('scrollC');
	},
	methods: {
		sendValue(msg) {
			this.$parent.num = 1
			this.$parent.send = true
			this.$parent.sendHelpQuestion(msg);
		},
		addMore(item) {
			this.$parent.num = 0
			item.question = item.more_question
			item.more = false
			item.less = true
		},
		removeMore(item) {
			this.$parent.num = 0
			item.question = []
			item.more = true
			item.less = false
		},
	},
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.less
  display:none
.dialogue
  margin-top: 10px
  font-size: 16px
  background: color-g
  .content
    display: inline-block
    padding: 1.5vh
    background: #fff
.friend
	top:5px;
	border-radius: 4px;
	color: balck;
	display: inline-block;
	position: relative;
	padding: 0 10px;
	min-height: 20px;
	line-height: 2;
	font-size: 14px;
	text-align: left;
	background-color:#E0E0E0;
	word-break: break-all;
	&:before {
	    content: " ";
	    position: absolute;
	    top: 9px;
	    right: 100%;
	    border: 6px solid transparent;
	    border-right-color: #e0e0e0;
	}
.self
	float:right;
	margin-right:12.5px;
	border-radius: 4px;
	color: balck;
	display: inline-block;
	position: relative;
	padding: 0 10px;
	min-height: 20px;
	line-height: 2;
	font-size: 14px;
	text-align: left;
	background-color:#b2e281;
	word-break: break-all;
	&:before {
	    content: " ";
	    position: absolute;
	    top: 9px;
	    left: 100%;
	    border: 6px solid transparent;
	    border-left-color: #b2e281;
	}
.time {
	margin: 7px 0;
	text-align: center;
	> span {
		display: inline-block;
		padding: 0 18px;
		font-size: 12px;
		color: #fff;
		border-radius: 2px;
		background-color: #dcdcdc;
	}
}
</style>
