<template>
<div id="item">
    <div class="sidebar">
        <card></card>
        <list @changePage="changePage"></list>
    </div>
    <div class="main">
		<message @scrollC="scrollC"></message>
        <texts @scrollC="scrollC"></texts>
    </div>
	<div class="intell">
		<intelligent @scrollC="scrollC"></intelligent>
	</div>
</div>
</template>

<script>

import Card from './components/card';
import List from './components/list';
import Texts from './components/text';
import Message from './components/message';
import Intelligent from './components/intelligent';

export default {
	data() {
		return{
			num:0,
		}
	},
    components: { Card, List, Texts, Message,Intelligent },
	methods : {
		scrollC() {
			if(this.num == 1){
				this.$nextTick(() => {    
					var container = this.$el.querySelector(".message");     
					container.scrollTop = container.scrollHeight;
					})
			}
		},
		changePage(tag){
			if(tag == "智杰小智"){
				$(".main").show()
				$(".intell").hide()
			}else if(tag == "症状导诊"){
				$(".main").hide()
				$(".intell").show()
			}
		},
	},
	created() {
		this.num=1
		this.scrollC(1)
		document.querySelector('body').setAttribute('style', 'background:url("../../../static/images/bg.jpg")')
	},
}
</script>
<style lang="less" scoped>
#item {
    margin: 20px auto;
    width: 800px;
    height: 580px;
    overflow: hidden;
    border-radius: 3px;
    .sidebar, .main {
        height: 100%;
    }
	.demo-chip{
		position: relative;
		left: 10%;
		top: 10%;
	}
	.demo-float-button{
		width:30px;
		height:30px;
		// display:none;
		position: relative;
		left: 20%;
		top: 80%;
	}
    .sidebar {
        float: left;
        width: 200px;
        color: #f4f4f4;
        background-color: #2e3238;
    }
    .main {
		// display: none;
        position: relative;
        overflow: hidden;
        background-color: #eee;
    }
	.intell {
		display: none;
	    position: relative;
	    overflow: hidden;
	    background-color: #eee;
	}
    .text {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
    }
    .message {
        height: ~'calc(100% - 160px)';
    }
}
</style>
