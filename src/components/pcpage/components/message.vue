<script>
import { mapGetters } from 'vuex'
import myIntelligent from './intelligent'
export default {
	components: {
		myIntelligent
	},
	 computed: {
		 ...mapGetters(['nowMessageList'])
	 },
	data () {
		return{
			num : 0,
			items : [],
			self: {
				"_id": 0,
				"avatar": "/static/images/patient.png",
				"name": "不忘初心",
			},
			friend: {  
				"_id": 1,
				"avatar": "/static/images/p.png",
				"name": "智杰小智",
			},
		}
	},
	created () {
		this.messageList()
	},
	updated() {
		this.$emit('scrollC');
	},
	methods: {
		messageList() {
			if(typeof(this.nowMessageList) == "undefined"){
				return
			}
			let message = this.nowMessageList[0]
			if(typeof(message.list) != "undefined"){
				for(var i = 0; i<message.list.length ;i++){
					if(typeof(message.list[i].more_question) != "undefined"){
						message.list[i].more = true
						message.list[i].less = false
						message.list[i].question = []
					}
				}
			}
			this.items = message.list
		},
	    sendHelpQuestion(msg) {
		  this.$parent.num = 1
	      if (msg.length) {
	        this.$store.dispatch('sendValue2', {
	          _id: 1,
	          message: msg,
	          that: this
	        })
	      } else {
	        console.log('不能为空')
	      }
	    },
		moreQuestion(item) {
			this.$parent.num = 0
			item.question = item.more_question
			item.more = false
			item.less = true
		},
		lessQuestion(item) {
			this.$parent.num = 0
			item.question = []
			item.more = true
			item.less = false
		},
	},
};
</script>

<template>
<div class="message">
    <ul v-if="items">
        <li class="foo_li" v-for="item in items">
            <p class="time">
                <span>{{  item.time }}</span>
            </p>
            <div class="main" :class="{ self: item.self }">
                <img id="avatar" width="30" height="30" :src="item.self ? self.avatar : friend.avatar" />
                <div class="text">{{ item.message }}</div>
			<!-- 	<div class="help_question">{{ item.help_question }}</div> -->
            </div>
			<ul class="ul_list">
				<li class="sub_li" v-for="subItem in item.help_question">
						<div class="help_question" @click="sendHelpQuestion(subItem)">{{ subItem }}</div>
				</li>
				<li class="sub_li" v-for="subItem in item.question">
						<div class="help_question" @click="sendHelpQuestion(subItem)">{{ subItem }}</div>
				</li>
				<li class="sub_li">
					<div :class="item.more === true?'more':'less'" @click="moreQuestion(item)">更多⇩</div>
					<div :class="item.less === true?'more':'less'" @click="lessQuestion(item)">收起⇧</div>
				</li>
			</ul>
        </li>
    </ul>
</div>
</template>

<style lang="less" scoped>
.demo-chip{
	position: absolute;
	left: 54%;
	top: 66%;
}
.demo-float-button{
	width:30px;
	height:30px;
	display:none;
	position: absolute;
	left: 92%;
	top: 66%;
}
.less{
	display:none
}
.more{
	color: #909090;
	display: inline-block;
	position: relative;
	cursor: pointer;
	padding: 0 20px; 
	min-height: 20px;
	line-height: 2;
	font-size: 12px;
	word-break: normal;
	text-align: right;
	word-break: break-all;
	top:5px;
	background-size:14px;
}
.ul_list{
	width:80%;
	margin-left:40px;
	margin-top:10px;
}
.message {
    padding: 10px 15px;
    overflow-y: scroll;
    .foo_li {
        margin-bottom: 15px;
    }
	.sub_li {
	    margin-bottom:0px;	}
	
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
    #avatar {
        float: left;
        margin: 0 10px 0 0;
        border-radius: 3px;
    }
    .text {
        display: inline-block;
        position: relative;
        padding: 0 10px;
        max-width: ~'calc(100% - 40px)';
        min-height: 30px;
        line-height: 2.5;
        font-size: 12px;
        text-align: left;
        word-break: break-all;
        background-color: #e0e0e0;
        border-radius: 4px;
        &:before {
            content: " ";
            position: absolute;
            top: 9px;
            right: 100%;
            border: 6px solid transparent;
            border-right-color: #e0e0e0;
        }
    }
	.help_question {
	    display: inline-block;
	    position: relative;
	    padding: 0 20px;
	    max-width: ~'calc(100% - 40px)';
	    min-height: 20px;
	    line-height: 2;
	    font-size: 12px;
	    text-align: left;
	    word-break: break-all;
		background:transparent url("../../../../static/images/anwer.png") no-repeat left center;
		background-size:16px;
	    // background-color: transparent;
		cursor: pointer;
		color:orange;
		border-bottom:1px solid orange;
	}

    .self {
        text-align: right;

        #avatar {
            float: right;
            margin: 0 0 0 10px;
        }
        .text {
            background-color: #b2e281;

            &:before {
                right: inherit;
                left: 100%;
                border-right-color: transparent;
                border-left-color: #b2e281;
            }
        }
		
    }
}
</style>