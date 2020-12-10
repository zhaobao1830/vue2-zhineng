<template>
	<div class="intelligent">
		<mu-drawer :open="show" width="100%">
			<mu-appbar style="height: 45px;background-color: #fff;box-shadow: 10px 10px 10px rgba(0,0,0,0.1)">
				<!-- <mu-icon-button slot="left" icon="arrow_back_ios" @click="changeOpen()" style="color:#BBBBBB"/> -->
				<img slot="left" src="/static/images/ic_back_grey.png" style="width:24px;height:24px" @click="changeOpen()"/>
				<span style="color:black;top:0;left:49%;transform: translate(-49%, -10%);position:absolute;font-size:16px;font-weight:500">症状导诊</span>
			</mu-appbar>
			<div class="sidenav">
				<div class="sidenav-left">
					<div class="title">人体部位</div>
					<ul class="mui-table-view mui-table-view-chevron mui-table-view-inverted" style="color: #ddd;" id="part">
						<li class="mui-table-view-cell" v-for="part_item in part_data">
							<a class="mui-navigate-right" href="#" v-bind:name="part_item.part_code">{{part_item.part_name}}</a>
						</li>
					</ul>
				</div>
				<div class="sidenav-right" @touchstart="touchstart">
					<div class="bar">
						<input type="text" class="find-disease" v-model="searchString" placeholder="请输入疾病" @keyup.enter="get_search_data" />
					</div>
					<div class="page-item" style="position:relative;top:8%;text-align:center">第{{page}}页&nbsp;&nbsp;共{{page_size}}页</div>
					<div style="position:relative;top:8%" class="dis-data">
					<ul class="mui-table-view mui-table-view-inverted" style="color: #ddd;">
						<li v-if="page == 1" style="display:none" class="mui-table-view-cell"><a>上一页</a></li>
						<li v-else class="mui-table-view-cell"><a>上一页</a></li>
						<li class="mui-table-view-cell" v-for="dis in disease_data">
							<a>{{dis.disease_name}}</a>
						</li>
						<li v-if="page == page_size" style="display:none" class="mui-table-view-cell"><a>下一页</a></li>
						<li v-else class="mui-table-view-cell"><a>下一页</a></li>
					</ul>
					</div>
					<div class="search-item" style="display:none;position:relative;top:8%;text-align:center">暂无您搜索的疾病</div>
				</div>
			</div>
			<mu-dialog :open="dialog"  @close="closeDialog()">
				<mu-card class="mu-card">
				  <mu-card-media :title="dialogName" :subTitle="subTitle">
					<img src="../../../static/images/card_bg.jpg" />
				  </mu-card-media>
				  <div class="card-content">
				  <mu-card-text>
					<textarea class="card-text-mobile" readonly="readonly"></textarea>
				  </mu-card-text>
				  <mu-card-actions>
					<mu-flat-button label="去问小智" @click="sendQuestion" />
					<mu-flat-button label="相关科室" @click="changeContent"/>
				  </mu-card-actions>
				  </div>
				  <div class="button-content">
					<mu-card-actions>
						<div class="button"></div>
					</mu-card-actions>
				  </div>
				</mu-card>
				<mu-flat-button slot="actions" @click="closeDialog()" primary label="关闭"/>
			</mu-dialog>
			<div class="mui-content">
				<div style="padding: 10px 80px;">
					<div id="segmentedControl" class="mui-segmented-control">
						<a class="mui-control-item mui-active" href="#item1">男性</a>
						<a class="mui-control-item" href="#item2">女性</a>
						<a class="mui-control-item" href="#item3">儿童</a>
					</div>
				</div>
				<div>
					<div id="item1" class="mui-control-content mui-active" @click="getParts(1)">
						<div class="swiper-container" id="swiper-1" >
						    <div class="swiper-wrapper">
						        <div class="swiper-slide" @click="manclick">
						        	<div class="person-front" @click="onfront">
						        		<div class="m-head" @click="onfhead">
						        			<div class="m-big-head"></div>
						        			<div class="m-big-ear"></div>
						        			<div class="m-big-eyes"></div>
						        			<div class="m-big-nose"></div>
						        			<div class="m-big-mouth"></div>
						        		</div>
						        		<div class="m-face"></div>
						        		<div class="m-neck"></div>
						        		<div class="m-left-arm"></div>
						        		<div class="m-right-arm"></div>
						        		<div class="m-belly"></div>
						        		<div class="m-chest"></div>
						        		<div class="m-middle" ></div>
						        		<div class="m-left-leg"></div>
						        		<div class="m-right-leg"></div>
						        	</div>
						        </div>
						        <div class="swiper-slide" @click="manclick">
						        	<div class="person-back" @click="onback">
						        		<div class="m-back-neck"></div>
						        		<div class="m-back-left-arm"></div>
						        		<div class="m-back-right-arm"></div>
						        		<div class="m-back"></div>
						        		<div class="m-back-belly"></div>
						        		<div class="m-back-pelvis"></div>
						        		<div class="m-back-middle"></div>
						        		<div class="m-back-leg"></div>
						        	</div>
						        </div>
						    </div>
						</div>
					</div>
					<div id="item2" class="mui-control-content" @click="getParts(2)">
						<div class="swiper-container" id="swiper-2">
						    <div class="swiper-wrapper">
						        <div class="swiper-slide" @click="womanclick">
						        	<div class="female-front" @click="onfemale">
						        		<div class="f-head" @click="onghead">
						        			<div class="f-big-head"></div>
						        			<div class="f-big-face"></div>
						        			<div class="f-big-ear"></div>
											<div class="f-big-eyes"></div>
											<div class="f-big-nose"></div>
											<div class="f-big-mouth"></div>
						        		</div>
						        		<div class="f-face"></div>
						        		<div class="f-neck"></div>
						        		<div class="f-left-arm"></div>
						        		<div class="f-right-arm"></div>
						        		<div class="f-chest"></div>
						        		<div class="f-belly"></div>
						        		<div class="f-middle"></div>
						        		<div class="f-left-leg"></div>
						        		<div class="f-right-leg"></div>
						        	</div>
						        </div>
						        <div class="swiper-slide" @click="womanclick">
						        	<div class="female-back" @click="onfback">
						        		<div class="f-back-left-arm"></div>
						        		<div class="f-back-right-arm"></div>
						        		<div class="f-back"></div>
						        		<div class="f-back-bone"></div>
						        		<div class="f-back-lion"></div>
						        		<div class="f-back-pelvis"></div>
						        		<div class="f-back-hip"></div>
						        		<div class="f-back-leg"></div>
						        	</div>
						        </div>
						    </div>
						</div>
					</div>
					<div id="item3" class="mui-control-content" @click="getParts(3)">
						<div class="swiper-container" id="swiper-3">
						    <div class="swiper-wrapper">
						        <div class="swiper-slide" @click="childclick">
						        	<div class="children-front" @click="oncmale">
						        		<div class="c-head" @click="onchead">
						        			<div class="c-big-head"></div>
						        			<div class="c-big-face"></div>
						        			<div class="c-big-ear"></div>
											<div class="c-big-eyes"></div>
											<div class="c-big-nose"></div>
											<div class="c-big-mouth"></div>
						        		</div>
						        		<div class="c-neck"></div>
						        		<div class="c-left-arm"></div>
						        		<div class="c-right-arm"></div>
						        		<div class="c-chest"></div>
						        		<div class="c-belly"></div>
						        		<div class="c-middle"></div>
						        		<div class="c-left-leg"></div>
						        		<div class="c-right-leg"></div>
						        	</div>
						        </div>
						        <div class="swiper-slide" @click="childclick">
						        	<div class="children-back" @click="oncback">
						        		<div class="c-back-bone"></div>
						        		<div class="c-back-arm"></div>
						        		<div class="c-back-arm-right"></div>
						        		<div class="c-back-buttocks"></div>
						        		<div class="c-back-loins"></div>
						        		<div class="c-back-leg"></div>
						        	</div>
						        </div>
						    </div>
						</div>
					</div>
				</div>
			</div>
		</mu-drawer>
	</div>
</template>

<script>
import $ from 'jquery'
import Swiper from 'swiper'
import mui from '../../../static/js/mui.min.js'

export default{
  name: 'intelligent',
  props: ['show'],
  data(){
	return {
	  open: true,
	  g_open: false,
	  s: 1,
	  dialog: false,
	  dialogName: "",
	  subTitle: "",
	  flag : false,
	  searchString: "",
	  disease_data: [],
	  part_data: [],
	  floatX:0,
	  floatY:0,
	  page: 1,
	  part_name: '',
	  max_height: 0,
	  scrollTop: -1,
	  windowHeight: -1,
	  startY: 0,
	  times: 0,
	  page_size: 0
	}
  },
  created() {
	let that = this
	that.getParts(1);
	this.phoneFlag()
	$(document).on('tap','.mui-control-item',function(){
		that.searchString = ""
		if ($(this).text() == '男性'){
			that.getParts(1)
			that.s = 1
		}
		else if ($(this).text() == '女性'){
			that.getParts(2)
			that.s = 2
		}
		else{
			that.getParts(3)
			that.s = 3
		}
	});
	$(document).on('tap','#part li',function(){
	  console.log('1111111111')
		that.page = 1
		$(this).children('a').addClass('deep');
		$(this).siblings().children('a').removeClass('deep');
		$(this).siblings().find('li').children('a').removeClass('deep');
		$(this).parents('li').siblings().children('a').removeClass('deep');
		that.part_name = $(this).children('a').attr('name')
		that.partCode(that.part_name, that.s,that.page);
	});
	$(document).on('tap','.sidenav-right li',function(){
	  console.log('eeeeeeeeeeeee')
		that.subTitle = "疾病详情"
		var question = $(this).children('a').text()
		that.dialogName = question
		if(question == "上一页"){
			that.page = that.page-1
			$(".dis-data").slideToggle(600);
			$(".dis-data").slideToggle(600);
			setTimeout(function (){
				that.partCode(that.part_name, that.s, that.page)
			}, 600);
		}else if(question == "下一页"){
			that.page = that.page+1
			$(".dis-data").slideToggle(600);
			$(".dis-data").slideToggle(600);
			setTimeout(function (){
				that.partCode(that.part_name, that.s, that.page)
			}, 600);
		}else{
			that.getDiseaseDeatial(question)
			that.tapHide()
			that.openDialog()
		}
	});
  },
  methods: {
	 phoneFlag() {
		let ua = navigator.userAgent.toLowerCase();
		let isAndroid = ua.indexOf('android') > -1;
		if(isAndroid){
			this.floatX = 20
			this.floatY = 40
		}else{
			this.floatX = 0
			this.floatY = 0
		}
	  },
	  changeContent(){
	  		  $(".card-content").hide()
	  		  $(".button-content").show()
	  		  this.subTitle = "相关科室"
	  		  this.$http.get('http://122.112.148.65:9004/get_dept', {
	  		    params: {
	  		  	  	disease: this.dialogName
	  		    }
	  		  }).then(res => {
	  			  var deptcode = res.data.deptcode
	  			  var deptname = res.data.deptname
	  			  if(typeof(deptname) == "undefined"){
	  				  $(".button").html("暂无相关科室")
	  			  }else{
	  				  var htmlStr = ""
	  				  for(var i = 0; i < deptname.length; i++){
	  					var code = deptcode[i]
						if(code == null){
							code = '02'
						}
	  					if(code.length == 4){
	  						code = code.substring(0,2)+"."+code.substring(2,4)
	  					}else if(code.length == 6){
	  						code = code.substring(0,2)+"."+code.substring(2,4)+"."+code.substring(4,6)
	  					}
	  				  	htmlStr += "<button>"+deptname[i]+"</button>"
	  				  }
	  				  $(".button").html(htmlStr)
	  			  }
	  		  })
	  },
	  manclick(e){
		  var obj = $(e.target)
		  var fhead = $('.m-head')
		  if(obj[0].className == "swiper-slide swiper-slide-active"){
			this.tapHide()
			fhead.fadeOut().children().fadeOut();
		  }
	  },
	  womanclick(e){
		  var obj = $(e.target)
		  var fhead = $('.f-head')
		  if(obj[0].className == "swiper-slide swiper-slide-active"){
			this.tapHide()
			fhead.fadeOut().children().fadeOut();
		  }
	  },
	  childclick(e){
		  var obj = $(e.target)
		  var fhead = $('.c-head')
		  if(obj[0].className == "swiper-slide swiper-slide-active"){
			this.tapHide()
			fhead.fadeOut().children().fadeOut();
		  }
	  },
	  sendQuestion(){
		  this.$parent.sendHelpQuestion(this.dialogName)
		  this.$parent.num = 1
		  this.$emit('toggle')
		  this.$emit('scrollC')
		  this.closeDialog()
		  this.tapHide()
	  },
	  getDiseaseDeatial(question){
		  this.subTitle = "疾病详情"
		  this.$http.get('http://122.112.148.65:9004/qaRequest', {
			params: {
						question: question
			}
		  }).then(res => {
					var message = ''
					if(res.data.final_answers instanceof Array){
						message = res.data.final_answers[0]
					}else{
						message = res.data.final_answers
					}
					if(message == "这个问题太难了,小智回答不上来,\n你可以参考下面的方式进行咨询"){
						message = "暂无详情"
					}
					this.flag = true
					$(".card-text-mobile").empty()
					$(".card-text-mobile").html(message)
		  })
	  },
	  openDialog () {
	    this.dialog = true
	  },
	  closeDialog () {
		if(this.flag){
			this.dialog = false
			this.flag = false
		}
	  },
	  onfront(e){
	  		let that = this
	  		var obj = $(e.target)
	  		var fhead = $('.m-head')
	  		var containX = e.clientX - obj.offset().left - that.floatX;
	  		var containY = e.clientY - obj.offset().top ;
			that.searchString = ""
	  		if((103 < containX) && (containX < 156) && (1 < containY) && (containY < 70)){
	  			fhead.fadeIn().siblings().fadeOut();
	  		}else if((106 < containX) && (containX < 147) && (70 < containY) && (containY < 98)){
	  			if(fhead.css('display') == 'none'){
	  				obj.children('.m-neck').fadeIn().siblings().fadeOut();
	  				obj.children('.m-neck').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('颈部')
					}, 250);
	  			}
	  		}else if((0 < containX) && (containX < 88) && (84 < containY) && (containY < 290) && ((-2.37 * containX + 292.42) < (containY + 30)) && ((-2.37 * containX + 292.42) > (containY - 30))){
	  			if(fhead.css('display') == 'none'){
	  				obj.children('.m-right-arm').fadeIn().siblings().fadeOut();
	  				obj.children('.m-right-arm').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('上肢')
					}, 250);
	  			}
	  		}else if((169 < containX) && (containX < 253) && (86 < containY) && (containY < 296) && ((2.47 * containX - 331.14) < (containY + 30)) && ((2.47 * containX - 331.14) > (containY - 30))){
	  			if(fhead.css('display') == 'none'){
	  				obj.children('.m-left-arm').fadeIn().siblings().fadeOut();
	  				obj.children('.m-left-arm').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('上肢')
					}, 250);
	  			}
	  		}else if((89 < containX) && (containX < 164) && (101 < containY) && (containY < 156)){
	  			if(fhead.css('display') == 'none'){
	  				obj.children('.m-chest').fadeIn().siblings().fadeOut();
	  				obj.children('.m-chest').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('胸部')
					}, 250);
	  			}
	  		}else if((88 < containX) && (containX < 166) && (156 < containY) && (containY < 225)){
	  			if(fhead.css('display') == 'none'){
	  				obj.children('.m-belly').fadeIn().siblings().fadeOut();
	  				obj.children('.m-belly').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('腹部')
					}, 250);
	  			}
	  		}else if((80 < containX) && (containX < 172) && (233 < containY) && (containY < 261)){
	  			if(fhead.css('display') == 'none'){
	  				obj.children('.m-middle').fadeIn().siblings().fadeOut();
	  				obj.children('.m-middle').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('生殖部位')
					}, 250);
	  			}
	  		}else if((148 < containX) && (containX < 175) && (270 < containY) && (containY < 538)){
	  			if(fhead.css('display') == 'none'){
	  				obj.children('.m-left-leg').fadeIn().siblings().fadeOut();
	  				obj.children('.m-left-leg').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('下肢')
					}, 250);
	  			}
	  		}else if((83 < containX) && (containX < 112) && (270 < containY) && (containY < 538)){
	  			if(fhead.css('display') == 'none'){
	  				obj.children('.m-right-leg').fadeIn().siblings().fadeOut();
	  				obj.children('.m-right-leg').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('下肢')
					}, 250);
	  			}
	  		}else{
	  			if(fhead.css('display') == 'none'){
	  				that.tapHide();
	  				obj.children().fadeOut().children().fadeOut();
	  			}
	  		}
	  },
	  onfhead(e){
	  		  let that = this
	  		  var obj = $(e.target)
	  		  var containX = e.clientX  - obj.offset().left;
	  		  var containY = e.clientY - obj.offset().top -that.floatX;
			  that.searchString = ""
	  		  if((43 < containX) && (containX < 215) && (43 < containY) && (containY < 107)){
	  		  	obj.children('.m-big-head').fadeIn().siblings().fadeOut();
	  			obj.children('.m-big-head').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('头部')
				}, 250);
	  		  }else if((30 < containX) && (containX < 56) && (158 < containY) && (containY < 235)){
	  		  	obj.children('.m-big-ear').fadeIn().siblings().fadeOut();
				obj.children('.m-big-ear').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('耳')
				}, 250);
	  		  }else if((196 < containX) && (containX < 235) && (158 < containY) && (containY < 235)){
	  		  	obj.children('.m-big-ear').fadeIn().siblings().fadeOut();
				obj.children('.m-big-ear').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('耳')
				}, 250);
			 }else if((106 < containX) && (containX < 138) && (170 < containY) && (containY < 205)){
				obj.children('.m-big-nose').fadeIn().siblings().fadeOut();
				obj.children('.m-big-nose').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('鼻')
				}, 250);
			 }else if((50 < containX) && (containX < 200) && (149 < containY) && (containY < 162)){
				obj.children('.m-big-eyes').fadeIn().siblings().fadeOut();
				obj.children('.m-big-eyes').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('眼')
				}, 250);
			 }else if((56 < containX) && (containX < 188) && (218 < containY) && (containY < 240)){
				obj.children('.m-big-mouth').fadeIn().siblings().fadeOut();
				obj.children('.m-big-mouth').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('口')
				}, 250);
			}else if((57 < containX) && (containX < 209) && (107 < containY) && (containY < 307)){
			}else{
				that.tapHide();
				obj.fadeOut().children().fadeOut();
			}
	  },
	  onback(e){
	  		 let that = this
	  		 var obj = $(e.target)
	  		 var containX = e.clientX - obj.offset().left - that.floatX;
	  		 var containY = e.clientY - obj.offset().top - that.floatY;
			 that.searchString = ""
	  		 if((102 < containX) && (containX < 155) && (62 < containY) && (containY < 95)){
	  		 	obj.children('.m-back-neck').fadeIn().siblings().fadeOut();
	  		 	obj.children('.m-back-left-arm').fadeIn().siblings().fadeOut();
	  		 	obj.children('.m-back-right-arm').fadeIn().siblings().fadeOut();
	  		 	obj.children('.m-back-neck').fadeOut().siblings().fadeOut();
	  		 	obj.children('.m-back-left-arm').fadeOut().siblings().fadeOut();
	  		 	obj.children('.m-back-right-arm').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('皮肤')
				}, 250);
	  		 }else if((0 < containX) && (containX < 88) && (84 < containY) && (containY < 290) && ((-2.37 * containX + 262.42) < (containY + 30)) && ((-2.37 * containX + 262.42) > (containY - 30))){
	  			obj.children('.m-back-neck').fadeIn().siblings().fadeOut();
	  			obj.children('.m-back-left-arm').fadeIn().siblings().fadeOut();
	  			obj.children('.m-back-right-arm').fadeIn().siblings().fadeOut();
	  			obj.children('.m-back-neck').fadeOut().siblings().fadeOut();
	  			obj.children('.m-back-left-arm').fadeOut().siblings().fadeOut();
	  			obj.children('.m-back-right-arm').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('皮肤')
				}, 250);
			 }else if((169 < containX) && (containX < 253) && (86 < containY) && (containY < 296) && ((2.47 * containX - 331.14) < (containY + 30)) && ((2.47 * containX - 331.14) > (containY - 30))){
				obj.children('.m-back-neck').fadeIn().siblings().fadeOut();
				obj.children('.m-back-left-arm').fadeIn().siblings().fadeOut();
				obj.children('.m-back-right-arm').fadeIn().siblings().fadeOut();
				obj.children('.m-back-neck').fadeOut().siblings().fadeOut();
				obj.children('.m-back-left-arm').fadeOut().siblings().fadeOut();
				obj.children('.m-back-right-arm').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('皮肤')
				}, 250);
	  		 }else if((92 < containX) && (containX < 168) && (98 < containY) && (containY < 154)){
	  		 	obj.children('.m-back').fadeIn().siblings().fadeOut();
	  			obj.children('.m-back').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('全身')
				}, 250);
	  		 }else if((88 < containX) && (containX < 166) && (154 < containY) && (containY < 195)){
	  		 	obj.children('.m-back-belly').fadeIn().siblings().fadeOut();
	  			obj.children('.m-back-belly').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('腰部')
				}, 250);
	  		 }else if((81 < containX) && (containX < 172) && (195 < containY) && (containY < 211)){
	  		 	obj.children('.m-back-pelvis').fadeIn().siblings().fadeOut();
	  			obj.children('.m-back-pelvis').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('腰部')
				}, 250);
	  		 }else if((78 < containX) && (containX < 176) && (211 < containY) && (containY < 246)){
	  		 	obj.children('.m-back-middle').fadeIn().siblings().fadeOut();
	  			obj.children('.m-back-middle').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('排泄部位')
				}, 250);
			 }else if((130 < containX) && (containX < 160) && (275 < containY) && (containY < 498)){
				obj.children('.m-back-leg').fadeIn().siblings().fadeOut();
				obj.children('.m-back-leg').fadeOut().siblings().fadeOut();
				setTimeout(function (){
				that.tapMenu('下肢')
				}, 250);
			 }else if((83 < containX) && (containX < 114) && (275 < containY) && (containY < 498)){
				obj.children('.m-back-leg').fadeIn().siblings().fadeOut();
				obj.children('.m-back-leg').fadeOut().siblings().fadeOut();
				setTimeout(function (){
				that.tapMenu('下肢')
				}, 250);
	  		 }else{
	  		 	that.tapHide();
	  			obj.children().fadeOut();
	  		 }
	  },
	  onfemale(e){
	  		let that = this
	  		var obj = $(e.target)
	  		var ghead = $('.f-head');
	  		var containX = e.clientX - obj.offset().left - that.floatX;
	  		var containY = e.clientY - obj.offset().top  - that.floatX;
			that.searchString = ""
	  		if((96 < containX) && (containX < 141) && (0 < containY) && (containY < 48)){
	  			ghead.fadeIn().siblings().fadeOut();
	  		}else if((108 < containX) && (containX < 131) && (48 < containY) && (containY < 72)){
	  			if(ghead.css('display') == 'none'){
	  				obj.children('.f-neck').fadeIn().siblings().fadeOut();
	  				obj.children('.f-neck').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('颈部')
					}, 250);
	  			}
	  		}else if((0 < containX) && (containX < 91) && (69 < containY) && (containY < 215) && ((-1.43 * containX + 203.55) < (containY + 30)) && ((-1.43 * containX + 203.55) > (containY - 30))){
	  			if(ghead.css('display') == 'none'){
	  				obj.children('.f-right-arm').fadeIn().siblings().fadeOut();
	  				obj.children('.f-right-arm').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('上肢')
					}, 250);
	  			}
	  		}else if((147 < containX) && (containX < 254) && (68 < containY) && (containY < 194) && ((1.18 * containX - 104.80) < (containY + 30)) && ((1.18 * containX - 104.80) > (containY - 30))){
	  			if(ghead.css('display') == 'none'){
	  				obj.children('.f-left-arm').fadeIn().siblings().fadeOut();
	  				obj.children('.f-left-arm').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('上肢')
					}, 250);
	  			}
	  		}else if((89 < containX) && (containX < 148) && (71 < containY) && (containY < 120)){
	  			if(ghead.css('display') == 'none'){
	  				obj.children('.f-chest').fadeIn().siblings().fadeOut();
	  				obj.children('.f-chest').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('胸部')
					}, 250);
	  			}
	  		}else if((94 < containX) && (containX < 144) && (120 < containY) && (containY < 171)){
	  			if(ghead.css('display') == 'none'){
	  				obj.children('.f-belly').fadeIn().siblings().fadeOut();
	  				obj.children('.f-belly').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('腹部')
					}, 250);
	  			}
	  		}else if((83 < containX) && (containX < 157) && (181 < containY) && (containY < 204)){
	  			if(ghead.css('display') == 'none'){
	  				obj.children('.f-middle').fadeIn().siblings().fadeOut();
	  				obj.children('.f-middle').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('生殖部位')
					}, 250);
	  			}
	  		}else if((96 < containX) && (containX < 118) && (204 < containY) && (containY < 420)){
	  			if(ghead.css('display') == 'none'){
	  				obj.children('.f-right-leg').fadeIn().siblings().fadeOut();
	  				obj.children('.f-right-leg').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('下肢')
					}, 250);
	  			}
	  		}else if((122 < containX) && (containX < 145) && (204 < containY) && (containY < 420)){
	  			if(ghead.css('display') == 'none'){
	  				obj.children('.f-left-leg').fadeIn().siblings().fadeOut();
	  				obj.children('.f-left-leg').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('下肢')
					}, 250);
	  			}
	  		}else{
	  			if(ghead.css('display') == 'none'){
	  				that.tapHide();
	  				obj.children().fadeOut();
	  			}
	  		}
	  },
	  onghead(e){
	  		let that = this
	  		var obj = $(e.target)
	  		var containX = e.clientX - obj.offset().left;
	  		var containY = e.clientY - obj.offset().top - that.floatX;
			that.searchString = ""
	  		if((69 < containX) && (containX < 187) && (69 < containY) && (containY < 108)){
	  			obj.children('.f-big-head').fadeIn().siblings().fadeOut();
	  			obj.children('.f-big-head').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('头部')
				}, 250);
	  		}else if((54 < containX) && (containX < 75) && (143 < containY) && (containY < 191)){
	  			obj.children('.f-big-ear').fadeIn().siblings().fadeOut();
	  			obj.children('.f-big-ear').fadeOut().siblings().fadeOut();
	  			setTimeout(function (){
	  				that.tapMenu('耳')
	  			}, 250);
	  		}else if((187 < containX) && (containX < 225) && (143 < containY) && (containY < 191)){
	  			obj.children('.f-big-ear').fadeIn().siblings().fadeOut();
	  			obj.children('.f-big-ear').fadeOut().siblings().fadeOut();
	  			setTimeout(function (){
	  				that.tapMenu('耳')
	  			}, 250);
	  		}else if((71 < containX) && (containX < 183) && (148 < containY) && (containY < 163)){
	  			obj.children('.f-big-eyes').fadeIn().siblings().fadeOut();
	  			obj.children('.f-big-eyes').fadeOut().siblings().fadeOut();
	  			setTimeout(function (){
	  				that.tapMenu('眼')
	  			}, 250);
	  		}else if((120 < containX) && (containX < 155) && (151 < containY) && (containY < 189)){
	  			obj.children('.f-big-nose').fadeIn().siblings().fadeOut();
	  			obj.children('.f-big-nose').fadeOut().siblings().fadeOut();
	  			setTimeout(function (){
	  				that.tapMenu('鼻')
	  			}, 250);
	  		}else if((80 < containX) && (containX < 172) && (200 < containY) && (containY < 235)){
	  			obj.children('.f-big-mouth').fadeIn().siblings().fadeOut();
	  			obj.children('.f-big-mouth').fadeOut().siblings().fadeOut();
	  			setTimeout(function (){
	  				that.tapMenu('口')
	  			}, 250);
			}else if((69 < containX) && (containX < 187) && (108 < containY) && (containY < 240)){
	  		}else{
	  			that.tapHide();
	  			obj.fadeOut().children().fadeOut();
	  		}
	  },
	  onfback(e){
	  		let that = this
	  		var obj = $(e.target)
	  		var containX = e.clientX - obj.offset().left - that.floatX;
	  		var containY = e.clientY - obj.offset().top - that.floatY;
			that.searchString = ""
	  		if((13 < containX) && (containX < 94) && (70 < containY) && (containY < 209) && ((-1.74 * containX + 203.42) < (containY + 30)) && ((-1.74 * containX + 203.42) > (containY - 30))){
	  			obj.children('.f-back-left-arm').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back-right-arm').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back').fadeOut().siblings().fadeOut();
	  			obj.children('.f-back-left-arm').fadeOut().siblings().fadeOut();
	  			obj.children('.f-back-right-arm').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('皮肤')
				}, 250);
	  		}else if((94 < containX) && (containX < 146) && (47 < containY) && (containY < 75)){
	  			obj.children('.f-back-left-arm').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back-right-arm').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back').fadeOut().siblings().fadeOut();
	  			obj.children('.f-back-left-arm').fadeOut().siblings().fadeOut();
	  			obj.children('.f-back-right-arm').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('皮肤')
				}, 250);
			}else if((147 < containX) && (containX < 254) && (68 < containY) && (containY < 194) && ((1.18 * containX - 104.80) < (containY + 30)) && ((1.18 * containX - 104.80) > (containY - 30))){
				obj.children('.f-back-left-arm').fadeIn().siblings().fadeOut();
				obj.children('.f-back-right-arm').fadeIn().siblings().fadeOut();
				obj.children('.f-back').fadeIn().siblings().fadeOut();
				obj.children('.f-back').fadeOut().siblings().fadeOut();
				obj.children('.f-back-left-arm').fadeOut().siblings().fadeOut();
				obj.children('.f-back-right-arm').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('皮肤')
				}, 250);
	  		}else if((88 < containX) && (containX < 150) && (90 < containY) && (containY < 121)){
	  			obj.children('.f-back-bone').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back-bone').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('全身')
				}, 250);
	  		}else if((93 < containX) && (containX < 145) && (121 < containY) && (containY < 162)){
	  			obj.children('.f-back-lion').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back-pelvis').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back-pelvis').fadeOut().siblings().fadeOut();
	  			obj.children('.f-back-lion').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('腰部')
				}, 250);
	  		}else if((88 < containX) && (containX < 149) && (162 < containY) && (containY < 176)){
	  			obj.children('.f-back-lion').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back-pelvis').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back-pelvis').fadeOut().siblings().fadeOut();
	  			obj.children('.f-back-lion').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('腰部')
				}, 250);
	  		}else if((83 < containX) && (containX < 154) && (176 < containY) && (containY < 213)){
	  			obj.children('.f-back-hip').fadeIn().siblings().fadeOut();
	  			obj.children('.f-back-hip').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('排泄部位')
				}, 250);
			}else if((124 < containX) && (containX < 164) && (218 < containY) && (containY < 391)){
				obj.children('.f-back-leg').fadeIn().siblings().fadeOut();
				obj.children('.f-back-leg').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('下肢')
				}, 250);
			}else if((76 < containX) && (containX < 115) && (218 < containY) && (containY < 391)){
				obj.children('.f-back-leg').fadeIn().siblings().fadeOut();
				obj.children('.f-back-leg').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('下肢')
				}, 250);
	  		}else{
	  			that.tapHide();
	  			obj.children().fadeOut();
	  		}
	  },
	  oncmale(e){
	  		let that = this
	  		var obj = $(e.target)
	  		var chead = $('.c-head');
	  		var containX = e.clientX - obj.offset().left - that.floatX;
	  		var containY = e.clientY - obj.offset().top -that.floatY;
			that.searchString = ""
	  		if((93 < containX) && (containX < 166) && (121 < containY) && (containY < 202)){
	  			chead.fadeIn().siblings().fadeOut();
	  		}else if((107 < containX) && (containX < 155) && (202 < containY) && (containY < 221)){
	  			if(chead.css('display') == 'none'){
	  				obj.children('.c-neck').fadeIn().siblings().fadeOut();
	  				obj.children('.c-neck').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('颈部')
					}, 250);
	  			}
	  		}else if((13 < containX) && (containX < 98) && (214 < containY) && (containY < 291) && ((-0.68 * containX + 288.75) < (containY + 30)) && ((-0.68 * containX + 288.75) > (containY - 30))){
	  			if(chead.css('display') == 'none'){
	  				obj.children('.c-right-arm').fadeIn().siblings().fadeOut();
	  				obj.children('.c-right-arm').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('上肢')
					}, 250);
	  			}
	  		}else if((164 < containX) && (containX < 247) && (214 < containY) && (containY < 291) && ((0.32 * containX + 202.56) < (containY + 30)) && ((0.32 * containX + 202.56) > (containY - 30))){
	  			if(chead.css('display') == 'none'){
	  				obj.children('.c-left-arm').fadeIn().siblings().fadeOut();
	  				obj.children('.c-left-arm').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('上肢')
					}, 250);
	  			}
	  		}else if((98 < containX) && (containX < 164) && (221 < containY) && (containY < 256)){
	  			if(chead.css('display') == 'none'){
	  				obj.children('.c-chest').fadeIn().siblings().fadeOut();
	  				obj.children('.c-chest').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('胸部')
					}, 250);
	  			}
	  		}else if((94 < containX) && (containX < 168) && (256 < containY) && (containY < 304)){
	  			if(chead.css('display') == 'none'){
	  				obj.children('.c-belly').fadeIn().siblings().fadeOut();
	  				obj.children('.c-belly').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('腹部')
					}, 250);
	  			}
	  		}else if((91 < containX) && (containX < 170) && (304 < containY) && (containY < 330)){
	  			if(chead.css('display') == 'none'){
	  				obj.children('.c-middle').fadeIn().siblings().fadeOut();
	  				obj.children('.c-middle').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('生殖部位')
					}, 250);
	  			}
	  		}else if((94 < containX) && (containX < 120) && (330 < containY) && (containY < 439)){
	  			if(chead.css('display') == 'none'){
	  				obj.children('.c-right-leg').fadeIn().siblings().fadeOut();
	  				obj.children('.c-right-leg').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('下肢')
					}, 250);
	  			}
	  		}else if((140 < containX) && (containX < 166) && (330 < containY) && (containY < 439)){
	  			if(chead.css('display') == 'none'){
	  				obj.children('.c-left-leg').fadeIn().siblings().fadeOut();
	  				obj.children('.c-left-leg').fadeOut().siblings().fadeOut();
					setTimeout(function (){
						that.tapMenu('下肢')
					}, 250);
	  			}
	  		}else{
	  			if(chead.css('display') == 'none'){
	  				that.tapHide();
	  				obj.children().fadeOut();
	  			}
	  		}
	  },
	  onchead(e){
	  		let that = this
	  		var obj = $(e.target)
	  		var containX = e.clientX - obj.offset().left
	  		var containY = e.clientY - obj.offset().top - that.floatY
			that.searchString = ""
	  		if((62 < containX) && (containX < 204) && (81 < containY) && (containY < 140)){
	  			obj.children('.c-big-head').fadeIn().siblings().fadeOut();
	  			obj.children('.c-big-head').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('头部')
				}, 250);
				setTimeout(function (){
					that.tapMenu('眼')
				}, 250);
			}else if((109 < containX) && (containX < 160) && (195 < containY) && (containY < 220)){
				obj.children('.c-big-nose').fadeIn().siblings().fadeOut();
				obj.children('.c-big-nose').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('鼻')
				}, 250);
			}else if((71 < containX) && (containX < 174) && (225 < containY) && (containY < 245)){
				obj.children('.c-big-mouth').fadeIn().siblings().fadeOut();
				obj.children('.c-big-mouth').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('口')
				}, 250);
			}else if((79 < containX) && (containX < 200) && (159 < containY) && (containY < 190)){
				obj.children('.c-big-eyes').fadeIn().siblings().fadeOut();
				obj.children('.c-big-eyes').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('眼')
				}, 250);
			}else if((52 < containX) && (containX < 72) && (165 < containY) && (containY < 210)){
				obj.children('.c-big-ear').fadeIn().siblings().fadeOut();
				obj.children('.c-big-ear').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('耳')
				}, 250);
			}else if((200 < containX) && (containX < 236) && (165 < containY) && (containY < 210)){
				obj.children('.c-big-ear').fadeIn().siblings().fadeOut();
				obj.children('.c-big-ear').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('耳')
				}, 250);
			}else if((68 < containX) && (containX < 197) && (140 < containY) && (containY < 263)){
	  		}else{
	  			that.tapHide();
	  			obj.fadeOut().children().fadeOut();
	  		}
	  },
	  oncback(e){
	  		let that = this
	  		var obj = $(e.target)
	  		var containX = e.clientX - obj.offset().left - that.floatX
	  		var containY = e.clientY - obj.offset().top - that.floatY
			that.searchString = ""
			if((86 < containX) && (containX < 160) && (202 < containY) && (containY < 245)){
				obj.children('.c-back-bone').fadeIn().siblings().fadeOut();
				obj.children('.c-back-bone').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('全身')
				}, 250);
			}else if((13 < containX) && (containX < 98) && (214 < containY) && (containY < 291) && ((-0.68 * containX + 288.75) < (containY + 30)) && ((-0.68 * containX + 288.75) > (containY - 30))){
				obj.children('.c-back-arm').fadeIn().siblings().fadeOut();
				obj.children('.c-back-arm').fadeOut().siblings().fadeOut();
				obj.children('.c-back-arm-right').fadeIn().siblings().fadeOut();
				obj.children('.c-back-arm-right').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('皮肤')
				}, 250);
			}else if((164 < containX) && (containX < 247) && (214 < containY) && (containY < 291) && ((0.32 * containX + 182.56) < (containY + 30)) && ((0.32 * containX + 182.56) > (containY - 30))){
				obj.children('.c-back-arm').fadeIn().siblings().fadeOut();
				obj.children('.c-back-arm').fadeOut().siblings().fadeOut();
				obj.children('.c-back-arm-right').fadeIn().siblings().fadeOut();
				obj.children('.c-back-arm-right').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('皮肤')
				}, 250);
			}else if((95 < containX) && (containX < 160) && (300 < containY) && (containY < 340)){
				obj.children('.c-back-buttocks').fadeIn().siblings().fadeOut();
				obj.children('.c-back-buttocks').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('排泄部位')
				}, 250);
			}else if((90 < containX) && (containX < 150) && (275 < containY) && (containY < 300)){
				obj.children('.c-back-loins').fadeIn().siblings().fadeOut();
				obj.children('.c-back-loins').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('腰部')
				}, 250);
			}else if((136 < containX) && (containX < 167) && (340 < containY) && (containY < 430)){
				obj.children('.c-back-leg').fadeIn().siblings().fadeOut();
				obj.children('.c-back-leg').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('下肢')
				}, 250);
			}else if((90 < containX) && (containX < 121) && (340 < containY) && (containY < 430)){
				obj.children('.c-back-leg').fadeIn().siblings().fadeOut();
				obj.children('.c-back-leg').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('下肢')
				}, 250);
	  		}else{
	  			that.tapHide();
	  			obj.children().fadeOut();
	  		}
	  },
	  changeOpen(){
		  this.$emit('toggle')
	  },
	  getParts(x){
		this.$http.get(http+'/getParts', {
			params: {
			sex: x
		}
		}).then(res => {
			this.part_data = [...res.data.data]
		})
	  },
	  tapHide(){
		$('.sidenav').css('width','0');
		$('.mui-content').css('margin-left','0')
	  },
	  taparr(){
		if($('.sidenav')[0].clientWidth == 0){
			return false
		}else{
			return true
		}
	  },
	  partCode(bodyCode,sex,page){
	   console.log('11')
	  		this.$http.get(http+'/getSymptomByBody', {
	  			params: {
	  				bodyCode: bodyCode,
	  				sex: sex,
	  				page: page
	  			}
	  	}).then(res => {
	  			if(res.data.data.length != 0){
	  				this.disease_data = res.data.data
					this.page_size = res.data.page_size
	  			}
	  	  })
	  },
	  tapMenu(x){
		    let that = this
	    	$('.sidenav').css('width','70vw')
	    	$('.mui-content').css('margin-left','70vw');
	    	$('#part').children('li').each(function(){
	    		if($(this).children('a').text() == x){
	    			that.page = 1
	    			$(this).children('a').addClass('deep');
	    			$(this).siblings().children('a').removeClass('deep');
	    			$(this).siblings().find('li').children('a').removeClass('deep');
	    			that.part_name = $(this).children('a').attr('name')
	    			that.partCode(that.part_name, that.s,that.page)
	    		}
	    	})
	    },
		touchstart(e){
			this.startY = e.changedTouches[0].pageY
		},
		touchend(e){
			let that = this
			var moveEndY = e.changedTouches[0].pageY
			var Y = moveEndY - that.startY
			if (Y > 0){
				that.times = 0
			}
		},
		handleScroll(e){
			if(e.target == $('.sidenav-right')[0]){
				this.scrollTop = e.target.scrollTop;
				this.windowHeight = e.target.clientHeight;
				var scrollHeight = e.target.scrollHeight;
				if(this.max_height == 0){
					this.max_height = scrollHeight
				}
			}
		},
		get_search_data(){
	   console.log('222')
			this.page = 1
			if(this.searchString == ""){
				this.$http.get(http+'/getSymptomByBody', {
					params: {
						bodyCode: this.part_name,
						sex: this.s,
						page: 1
					}
				}).then(res => {
					if(res.data.data.length != 0){
						this.disease_data = res.data.data
						this.page_size = res.data.page_size
						$('.search-item').hide()
						$('.page-item').show()
					}
				})
			}else{
				this.$http.get(http+'/getSymptomByBody', {
					params: {
						bodyCode: this.part_name,
						sex: this.s,
						filter: this.searchString
					}
				}).then(res => {
					if(res.data.data.length != 0){
						this.disease_data = res.data.data
						this.page_size = 1
						$('.search-item').hide()
						$('.page-item').show()
					}else{
						this.disease_data = res.data.data
						$('.search-item').show()
						$('.page-item').hide()
					}
				})
			}
		},
  },
  mounted(){
	var swiper = new Swiper('#swiper-1', {
		effect: 'cube',
		grabCursor: true,
		cubeEffect: {
			shadow: false,
		},
		observer: true,
		observeParents: true,
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		}
	});
	var swipers = new Swiper('#swiper-2', {
		effect: 'cube',
		grabCursor: true,
		cubeEffect: {
			shadow: false,
		},
		observer: true,
		observeParents: true,
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		}
	});
	var swiperse = new Swiper('#swiper-3', {
		effect: 'cube',
		grabCursor: true,
		cubeEffect: {
			shadow: false,
		},
		observer: true,
		observeParents: true,
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		}
	});
  },
}
</script>

<style>
* { touch-action: pan-y; }
.appbar_color{
	background-color: white;
	color: #000000;
}
.mui-content{
	background: transparent;
	width:100vw;
	height:700px;
	position:relative;
	transition:all 0.25s;
}
.swiper-container{
	width: 100vw;
	height: auto;
	position: absolute;
	left:0;
	top:0
}
.swiper-slide{
	width:100vw;
}
.mu-card-media-title{
	height: 100%;
}
.bar{
	z-index:9999;
	position: absolute;
}
.bar .find-disease{
	background:#fff no-repeat 10px 10px;
	background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU5NEY0RTlFMTA4NzExRTM5RTEzQkFBQzMyRjkyQzVBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU5NEY0RTlGMTA4NzExRTM5RTEzQkFBQzMyRjkyQzVBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTk0RjRFOUMxMDg3MTFFMzlFMTNCQUFDMzJGOTJDNUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTk0RjRFOUQxMDg3MTFFMzlFMTNCQUFDMzJGOTJDNUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DjA/RAAABK0lEQVR42pTSQUdEURjG8dOY0TqmPkGmRcqYD9CmzZAWJRHVRIa0iFYtM6uofYaiEW2SRJtEi9YxIklp07ZkWswu0v/wnByve7vm5ee8M+85zz1jbt9Os+WiGkYdYxjCOx5wgFeXUHmtBSzpcCGa+5BJTCjEP+0nKWAT8xqe4ArPGEEVC1hHEbs2oBwdXkM7mj/JLZrad437sCGHOfUtcziutuYu2v8XUFF/4f6vMK/YgAH1HxkBYV60AR31gxkBYd6xAeF3VzMCwvzOBpypX8V4yuFRzX2d2gD/l5yjH4fYQEnzkj4fae5rJulF2sMXVrAsaTWttRFu4Osb+1jEDT71/ZveyhouTch2fINQL9hKefKjuYFfuznXWzXMTabyrvfyIV3M4vhXgAEAUMs7K0J9UJAAAAAASUVORK5CYII=);
	border: none;
	width: 100%;
	line-height: 19px;
	padding: 11px 0;
	border-radius: 2px;
	box-shadow: 0 2px 8px #c4c4c4 inset;
	text-align: left;
	font-size: 14px;
	font-family: inherit;
	color: #738289;
	font-weight: bold;
	outline: none;
	text-indent: 40px;
}
.card-text-mobile{
	border:0;
	border-radius:5px;
	width:100%;
	height: 200px;
	padding: 10px;
	font-size: 14px;
}
</style>
