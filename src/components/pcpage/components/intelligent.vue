<template>
	<div class="intelligent" >
		<div class="sidenav">
			<div class="sidenav-left-2">
				<div class="title">人体部位</div>
				<ul class="mui-table-view mui-table-view-chevron mui-table-view-inverted" style="color: #ddd;" id="part">
					<li class="mui-table-view-cell" v-for="part_item in part_data">
						<a class="mui-navigate-right" href="#" v-bind:name="part_item.part_code">{{part_item.part_name}}</a>
					</li>
				</ul>
			</div>
			<div class="sidenav-right-2">
				<div class="bar">
					<input class="search-input" type="text" v-model="searchString" placeholder="按 Enter 进行搜索" @keyup.enter="get_search_data"/>
				</div>
				<div class="page-item" style="width:50%;position:absolute;top:5.5%;text-align:center;z-index:9998;background:black">
					{{page}}/{{page_size}}
				</div>
				<div v-if="page == 1" style="display:none" class="left-box" @click="changeListPage('prev')"></div>
				<div v-else class="left-box" @click="changeListPage('prev')"></div>
				<div v-if="page == page_size" style="display:none" class="right-box" @click="changeListPage('next')"></div>
				<div v-else class="right-box" @click="changeListPage('next')"></div>
				<div style="position:relative;top:12%" class="dis-data">
					<ul class="mui-table-view mui-table-view-inverted" style="color: #ddd;">
						<li class="mui-table-view-cell" v-for="dis in disease_data">
							<a>{{dis.disease_name}}</a>
						</li>
					</ul>
				</div>
				<div class="search-item" style="display:none;position:relative;top:8%;text-align:center">暂无您搜索的疾病</div>
			</div>
		</div>
		<mu-dialog :open="dialog"  @close="closeDialog()">
			<mu-card class="mu-card">
			  <mu-card-media :title="dialogName" :subTitle="title">
				<img src="static/images/card_bg2.jpg"/>
			  </mu-card-media>
			  <div class="card-content">
			  <mu-card-text>
				<div class="card-text"></div>
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
					<mu-float-button icon="autorenew" id="next-1" mini class="demo-float-button" @click="changeImage(1)" 
					style="position:absolute;z-index:20;top:35%;right:10%"/>
					<div class="swiper-container" id="swiper-1">
						<div class="swiper-wrapper">
							<div class="swiper-slide" @click="manclick">
								<div class="person-front-2" @click="onfront">
									<div class="m-head-2" @click="onfhead">
										<div class="m-big-head-2"></div>
										<div class="m-big-ear-2"></div>
										<div class="m-big-eyes-2"></div>
										<div class="m-big-nose-2"></div>
										<div class="m-big-mouth-2"></div>
									</div>
									<div class="m-face-2"></div>
									<div class="m-neck-2"></div>
									<div class="m-left-arm-2"></div>
									<div class="m-right-arm-2"></div>
									<div class="m-belly-2"></div>
									<div class="m-chest-2"></div>
									<div class="m-middle-2" ></div>
									<div class="m-left-leg-2"></div>
									<div class="m-right-leg-2"></div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="person-back-2" @click="onback">
									<div class="m-back-neck-2"></div>
									<div class="m-back-left-arm-2"></div>
									<div class="m-back-right-arm-2"></div>
									<div class="m-back-2"></div>
									<div class="m-back-belly-2"></div>
									<div class="m-back-pelvis-2"></div>
									<div class="m-back-middle-2"></div>
									<div class="m-back-leg-2"></div>
								</div>
							</div>
						</div>
						<div id="button-next-1" class="swiper-button-next" style="display:none"></div>
						<div id="button-prev-1" class="swiper-button-prev" style="display:none"></div>
					</div>
				</div>
				<div id="item2" class="mui-control-content" @click="getParts(2)">
					<mu-float-button icon="autorenew" id="next-2" mini class="demo-float-button" @click="changeImage(2)" 
					style="position:absolute;z-index:20;top:35%;right:10%"/>
					<div class="swiper-container" id="swiper-2">
						<div class="swiper-wrapper">
							<div class="swiper-slide" @click="womanclick">
								<div class="female-front-2" @click="onfemale">
									<div class="f-head-2" @click="onghead">
										<div class="f-big-head-2"></div>
										<div class="f-big-face-2"></div>
										<div class="f-big-ear-2"></div>
										<div class="f-big-eyes-2"></div>
										<div class="f-big-nose-2"></div>
										<div class="f-big-mouth-2"></div>
									</div>
									<div class="f-face-2"></div>
									<div class="f-neck-2"></div>
									<div class="f-left-arm-2"></div>
									<div class="f-right-arm-2"></div>
									<div class="f-chest-2"></div>
									<div class="f-belly-2"></div>
									<div class="f-middle-2"></div>
									<div class="f-left-leg-2"></div>
									<div class="f-right-leg-2"></div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="female-back-2" @click="onfback">
									<div class="f-back-left-arm-2"></div>
									<div class="f-back-right-arm-2"></div>
									<div class="f-back-2"></div>
									<div class="f-back-bone-2"></div>
									<div class="f-back-lion-2"></div>
									<div class="f-back-pelvis-2"></div>
									<div class="f-back-hip-2"></div>
									<div class="f-back-leg-2"></div>
								</div>
							</div>
						</div>
						<div id="button-next-2" class="swiper-button-next" style="display:none"></div>
						<div id="button-prev-2" class="swiper-button-prev" style="display:none"></div>
					</div>
				</div>
				<div id="item3" class="mui-control-content" @click="getParts(3)">
					<mu-float-button icon="autorenew" id="next-3" mini class="demo-float-button" @click="changeImage(3)" 
					style="position:absolute;z-index:20;top:35%;right:10%"/>
					<div class="swiper-container" id="swiper-3">
						<div class="swiper-wrapper">
							<div class="swiper-slide" @click="childclick">
								<div class="children-front-2" @click="oncmale">
									<div class="c-head-2" @click="onchead">
										<div class="c-big-head-2"></div>
										<div class="c-big-face-2"></div>
										<div class="c-big-ear-2"></div>	
										<div class="c-big-eyes-2"></div>	
										<div class="c-big-nose-2"></div>	
										<div class="c-big-mouth-2"></div>	
									</div>
									<div class="c-neck-2"></div>
									<div class="c-left-arm-2"></div>
									<div class="c-right-arm-2"></div>
									<div class="c-chest-2"></div>
									<div class="c-belly-2"></div>
									<div class="c-middle-2"></div>
									<div class="c-left-leg-2"></div>
									<div class="c-right-leg-2"></div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="children-back-2" @click="oncback">
									<div class="c-back-bone-2"></div>
									<div class="c-back-arm-2"></div>
									<div class="c-back-arm-right-2"></div>
									<div class="c-back-buttocks-2"></div>
									<div class="c-back-loins-2"></div>
									<div class="c-back-leg-2"></div>
								</div>
							</div>
						</div>
						<div id="button-next-3" class="swiper-button-next" style="display:none"></div>
						<div id="button-prev-3" class="swiper-button-prev" style="display:none"></div>
					</div>
				</div>
			</div>
			<div class="shadow" @click="tapHide"></div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import Swiper from 'swiper'
import mui from '../../../../static/js/mui.min.js'

export default{
  name: 'intelligent',
  props: ['show'],
  data(){
	return {
	  open: true,
	  g_open: false,
	  s: 1,
	  part: "",
	  dialog: false,
	  dialogName: "",
	  title: "",
	  flag: false,
	  searchString: "",
	  disease_data: [],
	  part_data: [],
	  page: 1,
	  part_name: '',
	  page_size: 0,
	  man_flag: true,
	  woman_flag: true,
	  child_flag: true
	}
  },
  created() {
	let that = this
	that.getParts(1);
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
		that.page = 1
		$(this).children('a').addClass('deep');
		$(this).siblings().children('a').removeClass('deep');
		$(this).siblings().find('li').children('a').removeClass('deep');
		$(this).parents('li').siblings().children('a').removeClass('deep');
		that.part_name = $(this).children('a').attr('name')
		that.partCode(that.part_name, that.s,that.page);
	});
	$(document).on('tap','.sidenav-right-2 li',function(){
		var question = $(this).children('a').text()
		// that.$emit('changeState','')
		that.dialogName = question
		that.title = "疾病详情"
		that.getDiseaseDeatial(question)
		that.tapHide()
		that.openDialog()
	});
  },
  methods: {
	  changeImage(sex){
		if(sex == 1){
			if(this.man_flag){
				$('#button-next-1').click()
				this.man_flag = false
			}else{
				$('#button-prev-1').click()
				this.man_flag = true
			}
		}else if(sex == 2){
			if(this.woman_flag){
				$('#button-next-2').click()
				this.woman_flag = false
			}else{
				$('#button-prev-2').click()
				this.woman_flag = true
			}
		}else{
			if(this.child_flag){
				$('#button-next-3').click()
				this.child_flag = false
			}else{
				$('#button-prev-3').click()
				this.child_flag = true
			}
		}
	  },
	  manclick(e){
		  var obj = $(e.target)
		  var fhead = $('.m-head-2')
		  if(obj[0].className == "swiper-slide swiper-slide-active"){
				fhead.fadeOut().children().fadeOut();
				$('#next-1').show()
		  }
	  },
	  womanclick(e){
		  var obj = $(e.target)
		  var fhead = $('.f-head-2')
		  if(obj[0].className == "swiper-slide swiper-slide-active"){
				fhead.fadeOut().children().fadeOut();
				$('#next-2').show()
		  }
	  },
	  childclick(e){
		  var obj = $(e.target)
		  var fhead = $('.c-head-2')
		  if(obj[0].className == "swiper-slide swiper-slide-active"){
				fhead.fadeOut().children().fadeOut();
				$('#next-3').show()
		  }
	  },
	  changeContent(){
		  $(".card-content").hide()
		  $(".button-content").show()
		  this.title = "相关科室"
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
	  sendQuestion() {
		var msg = this.dialogName
		this.$parent.num = 1
		if (msg.length) {
		  this.$store.dispatch('sendValue2', {
		    _id: 1,
		    message: msg,
		    that: this
		  })
		  this.closeDialog()
		  this.$parent.changePage('智杰小智')
		  this.$emit('scrollC')
		} else {
		  console.log('不能为空')
		}
	  },
	  openDialog () {
	    this.dialog = true
	  },
	  closeDialog () {
		this.dialog = false
	  },
	  getDiseaseDeatial(question){
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
			$(".card-text").empty()
			$(".card-text").html(message)
		  })
	  },
	  onfront(e){
		let that = this
		var obj = $(e.target)
		var fhead = $('.m-head-2')
		var containX = e.clientX - obj.offset().left;
		var containY = e.clientY - obj.offset().top;
		that.searchString = ""
		if((103 < containX) && (containX < 156) && (1 < containY) && (containY < 70)){
			fhead.fadeIn().siblings().fadeOut();
			$('#next-1').hide()
		}else if((106 < containX) && (containX < 147) && (70 < containY) && (containY < 98)){
			if(fhead.css('display') == 'none'){
				obj.children('.m-neck-2').fadeIn().siblings().fadeOut();
				obj.children('.m-neck-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('颈部')
				}, 250);
			}
		}else if((0 < containX) && (containX < 88) && (84 < containY) && (containY < 290) && ((-2.37 * containX + 292.42) < (containY + 30)) && ((-2.37 * containX + 292.42) > (containY - 30))){
			if(fhead.css('display') == 'none'){
				obj.children('.m-right-arm-2').fadeIn().siblings().fadeOut();
				obj.children('.m-right-arm-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('上肢')	
				}, 250);
			}
		}else if((169 < containX) && (containX < 253) && (86 < containY) && (containY < 296) && ((2.47 * containX - 331.14) < (containY + 30)) && ((2.47 * containX - 331.14) > (containY - 30))){
			if(fhead.css('display') == 'none'){
				obj.children('.m-left-arm-2').fadeIn().siblings().fadeOut();
				obj.children('.m-left-arm-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('上肢')	
				}, 250);
			}
		}else if((89 < containX) && (containX < 164) && (101 < containY) && (containY < 156)){
			if(fhead.css('display') == 'none'){
				obj.children('.m-chest-2').fadeIn().siblings().fadeOut();
				obj.children('.m-chest-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('胸部')	
				}, 250);
			}
		}else if((88 < containX) && (containX < 166) && (156 < containY) && (containY < 225)){
			if(fhead.css('display') == 'none'){
				obj.children('.m-belly-2').fadeIn().siblings().fadeOut();
				obj.children('.m-belly-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('腹部')
				}, 250);
			}
		}else if((80 < containX) && (containX < 172) && (233 < containY) && (containY < 261)){
			if(fhead.css('display') == 'none'){
				obj.children('.m-middle-2').fadeIn().siblings().fadeOut();
				obj.children('.m-middle-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('生殖部位')
				}, 250);
			}
		}else if((148 < containX) && (containX < 175) && (270 < containY) && (containY < 538)){
			if(fhead.css('display') == 'none'){
				obj.children('.m-left-leg-2').fadeIn().siblings().fadeOut();
				obj.children('.m-left-leg-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('下肢')	
				}, 250);
			}
		}else if((83 < containX) && (containX < 112) && (270 < containY) && (containY < 538)){
			if(fhead.css('display') == 'none'){
				obj.children('.m-right-leg-2').fadeIn().siblings().fadeOut();
				obj.children('.m-right-leg-2').fadeOut().siblings().fadeOut();
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
		  var containX = e.clientX - obj.offset().left;
		  var containY = e.clientY - obj.offset().top;
		  that.searchString = ""
		  if((43 < containX) && (containX < 215) && (43 < containY) && (containY < 107)){
		  	obj.children('.m-big-head-2').fadeIn().siblings().fadeOut();
			obj.children('.m-big-head-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('头部')
			}, 250);
		  }else if((30 < containX) && (containX < 56) && (166 < containY) && (containY < 235)){
		  	obj.children('.m-big-ear-2').fadeIn().siblings().fadeOut();
			obj.children('.m-big-ear-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('耳')	
			}, 250);
		  }else if((196 < containX) && (containX < 213) && (166 < containY) && (containY < 235)){
		  	obj.children('.m-big-ear-2').fadeIn().siblings().fadeOut();
			obj.children('.m-big-ear-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('耳')	
			}, 250);
			}else if((106 < containX) && (containX < 138) && (170 < containY) && (containY < 205)){
				obj.children('.m-big-nose-2').fadeIn().siblings().fadeOut();
				obj.children('.m-big-nose-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('鼻')	
				}, 250);
			}else if((68 < containX) && (containX < 104) && (149 < containY) && (containY < 162)){
				obj.children('.m-big-eyes-2').fadeIn().siblings().fadeOut();
				obj.children('.m-big-eyes-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('眼')	
				}, 250);
			}else if((141 < containX) && (containX < 177) && (149 < containY) && (containY < 162)){
				obj.children('.m-big-eyes-2').fadeIn().siblings().fadeOut();
				obj.children('.m-big-eyes-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('眼')	
				}, 250);
			}else if((56 < containX) && (containX < 188) && (218 < containY) && (containY < 240)){
				obj.children('.m-big-mouth-2').fadeIn().siblings().fadeOut();
				obj.children('.m-big-mouth-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('口')	
				}, 250);
			}else{
				that.tapHide();
				obj.fadeOut().children().fadeOut();
				$('#next-1').show()
		  }
	  },
	  onback(e){
		 let that = this
		 var obj = $(e.target)
		 var containX = e.clientX - obj.offset().left;
		 var containY = e.clientY - obj.offset().top;
		 that.searchString = ""
		 if((102 < containX) && (containX < 155) && (62 < containY) && (containY < 95)){
		 	obj.children('.m-back-neck-2').fadeIn().siblings().fadeOut();
		 	obj.children('.m-back-left-arm-2').fadeIn().siblings().fadeOut();
		 	obj.children('.m-back-right-arm-2').fadeIn().siblings().fadeOut();
		 	obj.children('.m-back-neck-2').fadeOut().siblings().fadeOut();
		 	obj.children('.m-back-left-arm-2').fadeOut().siblings().fadeOut();
		 	obj.children('.m-back-right-arm-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('皮肤')
			}, 250);
		 }else if((0 < containX) && (containX < 88) && (84 < containY) && (containY < 290) && ((-2.37 * containX + 292.42) < (containY + 30)) && ((-2.37 * containX + 292.42) > (containY - 30))){
			obj.children('.m-back-neck-2').fadeIn().siblings().fadeOut();
			obj.children('.m-back-left-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.m-back-right-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.m-back-neck-2').fadeOut().siblings().fadeOut();
			obj.children('.m-back-left-arm-2').fadeOut().siblings().fadeOut();
			obj.children('.m-back-right-arm-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('皮肤')	
			}, 250);
		 }else if((169 < containX) && (containX < 253) && (86 < containY) && (containY < 296) && ((2.47 * containX - 331.14) < (containY + 30)) && ((2.47 * containX - 331.14) > (containY - 30))){
			obj.children('.m-back-neck-2').fadeIn().siblings().fadeOut();
			obj.children('.m-back-left-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.m-back-right-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.m-back-neck-2').fadeOut().siblings().fadeOut();
			obj.children('.m-back-left-arm-2').fadeOut().siblings().fadeOut();
			obj.children('.m-back-right-arm-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('皮肤')	
			}, 250);
		 }else if((92 < containX) && (containX < 168) && (98 < containY) && (containY < 154)){
		 	obj.children('.m-back-2').fadeIn().siblings().fadeOut();
			obj.children('.m-back-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('全身')
			}, 250);
		 }else if((88 < containX) && (containX < 166) && (156 < containY) && (containY < 205)){
		 	obj.children('.m-back-belly-2').fadeIn().siblings().fadeOut();
			obj.children('.m-back-belly-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('腰部')
			}, 250);
		 }else if((81 < containX) && (containX < 172) && (205 < containY) && (containY < 221)){
		 	obj.children('.m-back-pelvis-2').fadeIn().siblings().fadeOut();
			obj.children('.m-back-pelvis-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('腰部')
			}, 250);
		 }else if((78 < containX) && (containX < 176) && (221 < containY) && (containY < 256)){
		 	obj.children('.m-back-middle-2').fadeIn().siblings().fadeOut();
			obj.children('.m-back-middle-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('排泄部位')	
			}, 250);
		 }else if((130 < containX) && (containX < 160) && (275 < containY) && (containY < 498)){
			 obj.children('.m-back-leg-2').fadeIn().siblings().fadeOut();
			 obj.children('.m-back-leg-2').fadeOut().siblings().fadeOut();
			 setTimeout(function (){
			 	that.tapMenu('下肢')	
			 }, 250);
		 }else if((83 < containX) && (containX < 114) && (275 < containY) && (containY < 498)){
			 obj.children('.m-back-leg-2').fadeIn().siblings().fadeOut();
			 obj.children('.m-back-leg-2').fadeOut().siblings().fadeOut();
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
		var ghead = $('.f-head-2');
		var containX = e.clientX - obj.offset().left;
		var containY = e.clientY - obj.offset().top;
		that.searchString = ""
		if((96 < containX) && (containX < 141) && (0 < containY) && (containY < 48)){
			ghead.fadeIn().siblings().fadeOut();
			$('#next-2').hide()
		}else if((108 < containX) && (containX < 131) && (48 < containY) && (containY < 72)){
			if(ghead.css('display') == 'none'){
				obj.children('.f-neck-2').fadeIn().siblings().fadeOut();
				obj.children('.f-neck-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('颈部')
				}, 250);
			}
		}else if((0 < containX) && (containX < 91) && (69 < containY) && (containY < 215) && ((-1.43 * containX + 203.55) < (containY + 30)) && ((-1.43 * containX + 203.55) > (containY - 30))){
			if(ghead.css('display') == 'none'){
				obj.children('.f-right-arm-2').fadeIn().siblings().fadeOut();
				obj.children('.f-right-arm-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('上肢')	
				}, 250);
			}
		}else if((147 < containX) && (containX < 254) && (68 < containY) && (containY < 194) && ((1.18 * containX - 104.80) < (containY + 30)) && ((1.18 * containX - 104.80) > (containY - 30))){
			if(ghead.css('display') == 'none'){
				obj.children('.f-left-arm-2').fadeIn().siblings().fadeOut();
				obj.children('.f-left-arm-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('上肢')	
				}, 250);
			}
		}else if((89 < containX) && (containX < 148) && (71 < containY) && (containY < 120)){
			if(ghead.css('display') == 'none'){
				obj.children('.f-chest-2').fadeIn().siblings().fadeOut();	
				obj.children('.f-chest-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('胸部')
				}, 250);
			}
		}else if((94 < containX) && (containX < 144) && (120 < containY) && (containY < 171)){
			if(ghead.css('display') == 'none'){
				obj.children('.f-belly-2').fadeIn().siblings().fadeOut();
				obj.children('.f-belly-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('腹部')
				}, 250);
			}
		}else if((83 < containX) && (containX < 157) && (181 < containY) && (containY < 204)){
			if(ghead.css('display') == 'none'){
				obj.children('.f-middle-2').fadeIn().siblings().fadeOut();
				obj.children('.f-middle-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('生殖部位')	
				}, 250);
			}
		}else if((96 < containX) && (containX < 118) && (204 < containY) && (containY < 420)){
			if(ghead.css('display') == 'none'){
				obj.children('.f-right-leg-2').fadeIn().siblings().fadeOut();
				obj.children('.f-right-leg-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('下肢')	
				}, 250);
			}
		}else if((122 < containX) && (containX < 145) && (204 < containY) && (containY < 420)){
			if(ghead.css('display') == 'none'){
				obj.children('.f-left-leg-2').fadeIn().siblings().fadeOut();
				obj.children('.f-left-leg-2').fadeOut().siblings().fadeOut();
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
		var containY = e.clientY - obj.offset().top;
		that.searchString = ""
		if((69 < containX) && (containX < 187) && (69 < containY) && (containY < 108)){
			obj.children('.f-big-head-2').fadeIn().siblings().fadeOut();
			obj.children('.f-big-head-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('头部')
			}, 250);
		}else if((54 < containX) && (containX < 69) && (143 < containY) && (containY < 191)){
			obj.children('.f-big-ear-2').fadeIn().siblings().fadeOut();
			obj.children('.f-big-ear-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('耳')
			}, 250);
		}else if((187 < containX) && (containX < 208) && (143 < containY) && (containY < 191)){
			obj.children('.f-big-ear-2').fadeIn().siblings().fadeOut();
			obj.children('.f-big-ear-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('耳')	
			}, 250);
		}else if((86 < containX) && (containX < 112) && (148 < containY) && (containY < 163)){
			obj.children('.f-big-eyes-2').fadeIn().siblings().fadeOut();
			obj.children('.f-big-eyes-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('眼')
			}, 250);
		}else if((145 < containX) && (containX < 171) && (148 < containY) && (containY < 163)){
			obj.children('.f-big-eyes-2').fadeIn().siblings().fadeOut();
			obj.children('.f-big-eyes-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('眼')	
			}, 250);
		}else if((120 < containX) && (containX < 140) && (151 < containY) && (containY < 189)){
			obj.children('.f-big-nose-2').fadeIn().siblings().fadeOut();
			obj.children('.f-big-nose-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('鼻')
			}, 250);
		}else if((80 < containX) && (containX < 172) && (200 < containY) && (containY < 220)){
			obj.children('.f-big-mouth-2').fadeIn().siblings().fadeOut();
			obj.children('.f-big-mouth-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('口')	
			}, 250);
		}else{
			that.tapHide();
			obj.fadeOut().children().fadeOut();
			$('#next-2').show()
		}
	  },
	  onfback(e){
		let that = this
		var obj = $(e.target)
		var containX = e.clientX - obj.offset().left;
		var containY = e.clientY - obj.offset().top;
		that.searchString = ""
		if((13 < containX) && (containX < 94) && (70 < containY) && (containY < 209) && ((-1.74 * containX + 233.42) < (containY + 30)) && ((-1.74 * containX + 233.42) > (containY - 30))){
			obj.children('.f-back-left-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-right-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-2').fadeOut().siblings().fadeOut();
			obj.children('.f-back-left-arm-2').fadeOut().siblings().fadeOut();
			obj.children('.f-back-right-arm-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('皮肤')	
			}, 250);
		}else if((147 < containX) && (containX < 254) && (68 < containY) && (containY < 194) && ((1.18 * containX - 104.80) < (containY + 30)) && ((1.18 * containX - 104.80) > (containY - 30))){
			obj.children('.f-back-left-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-right-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-2').fadeOut().siblings().fadeOut();
			obj.children('.f-back-left-arm-2').fadeOut().siblings().fadeOut();
			obj.children('.f-back-right-arm-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('皮肤')	
			}, 250);
		}else if((94 < containX) && (containX < 146) && (62 < containY) && (containY < 90)){
			obj.children('.f-back-left-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-right-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-2').fadeOut().siblings().fadeOut();
			obj.children('.f-back-left-arm-2').fadeOut().siblings().fadeOut();
			obj.children('.f-back-right-arm-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('皮肤')	
			}, 250);
		}else if((88 < containX) && (containX < 150) && (90 < containY) && (containY < 121)){
			obj.children('.f-back-bone-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-bone-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('全身')	
			}, 250);
		}else if((93 < containX) && (containX < 145) && (121 < containY) && (containY < 162)){
			obj.children('.f-back-lion-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-pelvis-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-pelvis-2').fadeOut().siblings().fadeOut();
			obj.children('.f-back-lion-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('腰部')	
			}, 250);
		}else if((88 < containX) && (containX < 149) && (162 < containY) && (containY < 176)){
			obj.children('.f-back-lion-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-pelvis-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-pelvis-2').fadeOut().siblings().fadeOut();
			obj.children('.f-back-lion-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('腰部')	
			}, 250);
		}else if((83 < containX) && (containX < 154) && (176 < containY) && (containY < 213)){
			obj.children('.f-back-hip-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-hip-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('排泄部位')	
			}, 250);
		}else if((120 < containX) && (containX < 141) && (218 < containY) && (containY < 391)){
			obj.children('.f-back-leg-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-leg-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('下肢')	
			}, 250);
		}else if((81 < containX) && (containX < 105) && (218 < containY) && (containY < 391)){
			obj.children('.f-back-leg-2').fadeIn().siblings().fadeOut();
			obj.children('.f-back-leg-2').fadeOut().siblings().fadeOut();
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
		var chead = $('.c-head-2');
		var containX = e.clientX - obj.offset().left;
		var containY = e.clientY - obj.offset().top;
		that.searchString = ""
		if((93 < containX) && (containX < 166) && (111 < containY) && (containY < 192)){
			chead.fadeIn().siblings().fadeOut();
			$('#next-3').hide()
		}else if((107 < containX) && (containX < 155) && (192 < containY) && (containY < 211)){
			if(chead.css('display') == 'none'){
				obj.children('.c-neck-2').fadeIn().siblings().fadeOut();
				obj.children('.c-neck-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('颈部')	
				}, 250);
			}
		}else if((13 < containX) && (containX < 98) && (214 < containY) && (containY < 291) && ((-0.68 * containX + 288.75) < (containY + 30)) && ((-0.68 * containX + 288.75) > (containY - 30))){
			if(chead.css('display') == 'none'){
				obj.children('.c-right-arm-2').fadeIn().siblings().fadeOut();
				obj.children('.c-right-arm-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('上肢')	
				}, 250);
			}
		}else if((164 < containX) && (containX < 247) && (214 < containY) && (containY < 291) && ((0.32 * containX + 202.56) < (containY + 30)) && ((0.32 * containX + 202.56) > (containY - 30))){
			if(chead.css('display') == 'none'){
				obj.children('.c-left-arm-2').fadeIn().siblings().fadeOut();
				obj.children('.c-left-arm-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('上肢')	
				}, 250);
			}
		}else if((98 < containX) && (containX < 164) && (221 < containY) && (containY < 256)){
			if(chead.css('display') == 'none'){
				obj.children('.c-chest-2').fadeIn().siblings().fadeOut();	
				obj.children('.c-chest-2').fadeOut().siblings().fadeOut();	
				setTimeout(function (){
					that.tapMenu('胸部')	
				}, 250);
			}
		}else if((94 < containX) && (containX < 168) && (246 < containY) && (containY < 294)){
			if(chead.css('display') == 'none'){
				obj.children('.c-belly-2').fadeIn().siblings().fadeOut();
				obj.children('.c-belly-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('腹部')	
				}, 250);
			}
		}else if((91 < containX) && (containX < 170) && (294 < containY) && (containY < 320)){
			if(chead.css('display') == 'none'){
				obj.children('.c-middle-2').fadeIn().siblings().fadeOut();
				obj.children('.c-middle-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('生殖部位')
				}, 250);
			}
		}else if((94 < containX) && (containX < 120) && (310 < containY) && (containY < 429)){
			if(chead.css('display') == 'none'){
				obj.children('.c-right-leg-2').fadeIn().siblings().fadeOut();
				obj.children('.c-right-leg-2').fadeOut().siblings().fadeOut();
				setTimeout(function (){
					that.tapMenu('下肢')
				}, 250);
			}
		}else if((140 < containX) && (containX < 166) && (310 < containY) && (containY < 429)){
			if(chead.css('display') == 'none'){
				obj.children('.c-left-leg-2').fadeIn().siblings().fadeOut();
				obj.children('.c-left-leg-2').fadeOut().siblings().fadeOut();
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
		var containX = e.clientX  - obj.offset().left
		var containY = e.clientY - obj.offset().top
		that.searchString = ""
		if((62 < containX) && (containX < 204) && (81 < containY) && (containY < 140)){
			obj.children('.c-big-head-2').fadeIn().siblings().fadeOut();
			obj.children('.c-big-head-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('头部')
			}, 250);
		}else if((77 < containX) && (containX < 107) && (159 < containY) && (containY < 176)){
			obj.children('.c-big-eyes-2').fadeIn().siblings().fadeOut();
			obj.children('.c-big-eyes-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('眼')	
			}, 250);
		}else if((140 < containX) && (containX < 167) && (159 < containY) && (containY < 176)){
			obj.children('.c-big-eyes-2').fadeIn().siblings().fadeOut();
			obj.children('.c-big-eyes-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('眼')	
			}, 250);
		}else if((109 < containX) && (containX < 137) && (176 < containY) && (containY < 202)){
			obj.children('.c-big-nose-2').fadeIn().siblings().fadeOut();
			obj.children('.c-big-nose-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('鼻')	
			}, 250);
		}else if((71 < containX) && (containX < 174) && (202 < containY) && (containY < 229)){
			obj.children('.c-big-mouth-2').fadeIn().siblings().fadeOut();
			obj.children('.c-big-mouth-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('口')	
			}, 250);
		}else if((140 < containX) && (containX < 167) && (159 < containY) && (containY < 176)){
			obj.children('.c-big-eyes-2').fadeIn().siblings().fadeOut();
			obj.children('.c-big-eyes-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('眼')	
			}, 250);
		}else if((52 < containX) && (containX < 68) && (173 < containY) && (containY < 210)){
			obj.children('.c-big-ear-2').fadeIn().siblings().fadeOut();
			obj.children('.c-big-ear-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('耳')	
			}, 250);
		}else if((197 < containX) && (containX < 212) && (173 < containY) && (containY < 210)){
			obj.children('.c-big-ear-2').fadeIn().siblings().fadeOut();
			obj.children('.c-big-ear-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('耳')
			}, 250);
		}else{
			that.tapHide();
			obj.fadeOut().children().fadeOut();
			$('#next-3').show()
		}
	  },
	  oncback(e){
		let that = this
		var obj = $(e.target)
		var containX = e.clientX  - obj.offset().left
		var containY = e.clientY - obj.offset().top
		that.searchString = ""
		if((86 < containX) && (containX < 160) && (202 < containY) && (containY < 245)){
			obj.children('.c-back-bone-2').fadeIn().siblings().fadeOut();
			obj.children('.c-back-bone-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('全身')	
			}, 250);
		}else if((13 < containX) && (containX < 98) && (214 < containY) && (containY < 291) && ((-0.68 * containX + 288.75) < (containY + 30)) && ((-0.68 * containX + 288.75) > (containY - 30))){
			obj.children('.c-back-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.c-back-arm-2').fadeOut().siblings().fadeOut();
			obj.children('.c-back-arm-right-2').fadeIn().siblings().fadeOut();
			obj.children('.c-back-arm-right-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('皮肤')
			}, 250);
		}else if((164 < containX) && (containX < 247) && (214 < containY) && (containY < 291) && ((0.32 * containX + 182.56) < (containY + 30)) && ((0.32 * containX + 182.56) > (containY - 30))){
			obj.children('.c-back-arm-2').fadeIn().siblings().fadeOut();
			obj.children('.c-back-arm-2').fadeOut().siblings().fadeOut();
			obj.children('.c-back-arm-right-2').fadeIn().siblings().fadeOut();
			obj.children('.c-back-arm-right-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('皮肤')	
			}, 250);
		}else if((95 < containX) && (containX < 160) && (280 < containY) && (containY < 320)){
			obj.children('.c-back-buttocks-2').fadeIn().siblings().fadeOut();
			obj.children('.c-back-buttocks-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('排泄部位')
			}, 250);
		}else if((90 < containX) && (containX < 150) && (255 < containY) && (containY < 280)){
			obj.children('.c-back-loins-2').fadeIn().siblings().fadeOut();
			obj.children('.c-back-loins-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('腰部')
			}, 250);
		}else if((131 < containX) && (containX < 150) && (330 < containY) && (containY < 400)){
			obj.children('.c-back-leg-2').fadeIn().siblings().fadeOut();
			obj.children('.c-back-leg-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('下肢')
			}, 250);
		}else if((90 < containX) && (containX < 110) && (330 < containY) && (containY < 400)){
			obj.children('.c-back-leg-2').fadeIn().siblings().fadeOut();
			obj.children('.c-back-leg-2').fadeOut().siblings().fadeOut();
			setTimeout(function (){
				that.tapMenu('下肢')
			}, 250);
		}else{
			that.tapHide();
			obj.children().fadeOut();
		}
	  },
	  changeOpen(){
		  this.$emit('changeState','参数')
	  },
	  getParts(x){
		this.$http.get(http+'/getParts', {
		  params: {
			sex: x
		  }
		}).then(res => {
			this.part_data = res.data.data
		})
	  },
	  tapHide(){
		$('.sidenav').css('width','0');
		$('.mui-content').css('margin-left','0')
		$(".shadow").css({'width':'0%'});
	  },
	  partCode(bodyCode,sex,page){
		this.$http.get(http+'/getSymptomByBody', {
			params: {
				bodyCode: bodyCode,
				sex: sex,
				page: page
			}
	  	}).then(res => {
			if(res.data.data.length != 0){
				this.disease_data = res.data.data
				this.page_size =  res.data.page_size
			}
	  	  })
	  },
	  tapMenu(x){
		    let that = this
	    	$('.sidenav').css('width','60%')
	    	$('.mui-content').css('margin-left','61%');
	    	$('#part').children('li').each(function(){
	    		if($(this).text() == x){
					that.page = 1
	    			$(this).children('a').addClass('deep');
	    			$(this).siblings().children('a').removeClass('deep');
	    			$(this).siblings().find('li').children('a').removeClass('deep');
					that.part_name = $(this).children('a').attr('name')
	    			that.partCode(that.part_name, that.s,that.page)
	    		}
	    	})
			$(".shadow").css({'width':'100%'});
	    },
		changeListPage(np){
			let that = this
			if(np == 'next'){
				if(that.page == that.page_size){
					return
				}
				that.page = that.page+1
				$(".dis-data").toggle(500);
				$(".dis-data").toggle(500);
				setTimeout(function (){
					that.partCode(that.part_name, that.s, that.page)
				}, 500);
			}else if(np == 'prev'){
				if(that.page == 1){
					return
				}
				that.page = that.page-1
				$(".dis-data").toggle(500);
				$(".dis-data").toggle(500);
				setTimeout(function (){
					that.partCode(that.part_name, that.s, that.page)
				}, 500);
			}
		},
		get_search_data(){
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
		}
  },
  mounted(){
	var swiper = new Swiper('#swiper-1', {
		effect: 'cube',
		cubeEffect: {
			shadow: false,
		},
		observer: true,
		observeParents: true,
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
	});
	swiper.allowTouchMove= false;
	var swipers = new Swiper('#swiper-2', {
		effect: 'cube',
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
	swipers.allowTouchMove= false;
	var swiperse = new Swiper('#swiper-3', {
		effect: 'cube',
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
	swiperse.allowTouchMove= false;
  }
}
</script>

<style>
* { touch-action: pan-y; }
.sidenav{
	position:absolute;
	top:0;
	left:0;
	bottom:0;
	width:0;
	background: #323c3c; 
	transition: all 0.25s; 
	overflow: hidden;
	color:#eee;
	font-size:14px;
}
.sidenav-left-2{
	display:block;
	float:left;
	width:50%;
	height:80%;
	overflow-x: hidden;
}
.deep{
	background: #2c3535;
}
.sidenav-right-2{
	overflow-x: hidden;
	display:block;
	float:right;
	width:50%;
	height:80%;
	background: #2c3535; 
}
.title{
	position:relative;
	padding:35px 10px;
	overflow:hidden;
}
.mui-table-view-inverted{
	background: transparent;
}
.mui-table-view-inverted:before,.mui-table-view-inverted:after{
	background-color:#2c2c2d
}
.mui-table-view-chevron{
	background: transparent;	 
}
.mui-table-view-cell.mui-collapse .mui-table-view .mui-table-view-cell{
	padding-left:15px
}
.mui-table-view-inverted .mui-table-view-cell:after{
	left:0
}
.mui-table-view-cell.mui-collapse .mui-table-view .mui-table-view-cell:after{
	left:0
}
.mui-navigate-right:after, .mui-push-right:after{
	right:12px
}
.mui-table-view-cell.mui-collapse .mui-table-view .mui-table-view-cell:after {
	background-color: #555
}
.mui-table-view-chevron .mui-table-view-cell {
    padding-right: 0;
}
.mui-table-view-chevron .mui-table-view-cell > a:not(.mui-btn) {
    margin-right: 0;
}
.mui-content{
	background: transparent;
	width:100%;
	height:700px;
	position:relative;
	transition:all 0.25s;
}
.swiper-container{
	width: 100%;
	height: auto;
	position: absolute;
	left:0;
	top:0
}
.swiper-slide{
	width:100%;
}
.person-front-2,.person-back-2,.female-front-2,.female-back-2,.children-front-2,.children-back-2{
	width:40%;
	height:600px;
	position:relative;
	margin:0 auto;
}
.person-front-2{
	background: url(../../../../static/images/man.png) no-repeat;
	background-size: contain;
}
.person-back-2{
	background: url(../../../../static/images/man_back.png) no-repeat;
	background-size: contain;
}
.female-front-2{
	background: url(../../../../static/images/woman.png) no-repeat;
	background-size: contain;	
}
.female-back-2{
	background: url(../../../../static/images/woman_back.png) no-repeat;
	background-size: contain;		
}
.children-front-2{
	background: url(../../../../static/images/child.png) no-repeat;
	background-size: contain;		
}
.children-back-2{
	background: url(../../../../static/images/child_back.png) no-repeat;
	background-size: contain;		
}
.m-head-2,.m-face-2,.m-neck-2,.m-left-arm-2,.m-right-arm-2,.m-belly-2,.m-chest-2,.m-middle-2,.m-left-leg-2,.m-right-leg-2,.m-back-neck-2,.m-back-left-arm-2,.m-back-right-arm-2,.m-back-2,.m-back-belly-2,.m-back-pelvis-2,.m-back-middle-2,.m-back-middle-2,.m-big-head-2,.m-big-ear-2,.m-big-eyes-2,.m-big-nose-2,.m-big-mouth-2,.m-back-leg-2{
	width:100%;
	height:636px;
	position:absolute;
	left:0;
	top:0;
	display:none;
}
.m-head-2{
	background: url(../../../../static/images/diagnos_man_big_head.png);
	background-size: contain;	
	z-index:1;
}
.m-face-2{
	background: url(../../../../static/images/diagnose_man_face.png);
	background-size: contain;	
	z-index:2;	
}
.m-neck-2{
	background: url(../../../../static/images/diagnose_man_neck.png);
	background-size: contain;	
	z-index:3;
}
.m-left-arm-2{
	background: url(../../../../static/images/diagnose_man_left_arm.png);
	background-size: contain;	
	z-index:4;	
}
.m-right-arm-2{
	background: url(../../../../static/images/diagnose_man_right_arm.png);
	background-size: contain;	
	z-index:5;	
}
.m-chest-2{
	background: url(../../../../static/images/diagnose_man_chest.png);
	background-size: contain;	
	z-index:6;	
}
.m-belly-2{
	background: url(../../../../static/images/diagnose_man_belly.png);
	background-size: contain;	
	z-index:7;
}
.m-middle-2{
	background: url(../../../../static/images/diagnose_man_middle.png);
	background-size: contain;	
	z-index:8;
}
.m-left-leg-2{
	background: url(../../../../static/images/diagnose_man_left_leg.png);
	background-size: contain;	
	z-index:9;	
}
.m-right-leg-2{
	background: url(../../../../static/images/diagnose_man_right_leg.png);
	background-size: contain;	
	z-index:10;		
}
.m-back-neck-2{
	background: url(../../../../static/images/diagnose_man_back_neck.png);
	background-size: contain;	
	z-index:1;
}
.m-back-left-arm-2{
	background: url(../../../../static/images/diagnose_man_back_left_arm.png);
	background-size: contain;	
	z-index:2;
}
.m-back-right-arm-2{
	background: url(../../../../static/images/diagnose_man_back_right_arm.png);
	background-size: contain;	
	z-index:2;
}
.m-back-2{
	background: url(../../../../static/images/diagnose_man__back.png);
	background-size: contain;	
	z-index:3;
}
.m-back-belly-2{
	background: url(../../../../static/images/diagnose_man_back_belly.png);
	background-size: contain;	
	z-index:4;	
}
.m-back-pelvis-2{
	background: url(../../../../static/images/diagnose_man_back_pelvis.png);
	background-size: contain;	
	z-index:5;	
}
.m-back-middle-2{
	background: url(../../../../static/images/diagnose_man_back_middle.png);
	background-size: contain;	
	z-index:6;
}
.m-back-leg-2{
	background: url(../../../../static/images/diagnose_man_back_legs.png);
	background-size: contain;	
	z-index:6;
}
.m-big-head-2{
	background: url(../../../../static/images/diagnose_man_big_top.png);
	background-size: contain;	
	z-index:9;
}
.m-big-ear-2{
	background: url(../../../../static/images/diagnose_man_ear.png);
	background-size: contain;	
	z-index:11;	
}
.m-big-eyes-2{
	background: url(../../../../static/images/diagnose_man_eyes.png);
	background-size: contain;	
	z-index:11;	
}
.m-big-nose-2{
	background: url(../../../../static/images/diagnose_man_nose.png);
	background-size: contain;	
	z-index:11;	
}
.m-big-mouth-2{
	background: url(../../../../static/images/diagnose_man_mouth.png);
	background-size: contain;	
	z-index:11;	
}
.f-face-2,.f-neck-2,.f-left-arm-2,.f-right-arm-2,.f-chest-2,.f-belly-2,.f-middle-2,.f-left-leg-2,.f-right-leg-2,.f-back-left-arm-2,.f-back-right-arm-2,.f-back-2,.f-back-bone-2,.f-back-lion-2,.f-back-pelvis-2,.f-back-hip-2,.f-back-leg-2,.f-big-head-2,.f-big-face-2,.f-big-ear-2,.f-big-eyes-2,.f-big-nose-2,.f-big-mouth-2{
	width:100%;
	height:495px;
	position:absolute;
	left:0;
	top:0;
	display:none;	
}
.f-head-2{
	background: url(../../../../static/images/woman_big_head.png);
	background-size: contain;	
	z-index:1;
	width:110%;
	height:495px;
	position:absolute;
	left:-5%;
	top:0;
	display:none;
}
.f-face-2{
	background: url(../../../../static/images/diagnose_woman_face.png);
	background-size: contain;	
	z-index:2;	
}
.f-neck-2{
	background: url(../../../../static/images/diagnose_woman_neck.png);
	background-size: contain;	
	z-index:3;
}
.f-left-arm-2{
	background: url(../../../../static/images/diagnose_woman_leftarm.png);
	background-size: contain;	
	z-index:4;	
}
.f-right-arm-2{
	background: url(../../../../static/images/diagnose_woman_right_arm.png);
	background-size: contain;	
	z-index:5;
}
.f-chest-2{
	background: url(../../../../static/images/diagnose_woman_chest.png);
	background-size: contain;	
	z-index:6;
}
.f-belly-2{
	background: url(../../../../static/images/diagnose_woman_belly.png);
	background-size: contain;	
	z-index:7;		
}
.f-middle-2{
	background: url(../../../../static/images/diagnose_woman_middle.png);
	background-size: contain;	
	z-index:8;	
}
.f-left-leg-2{
	background: url(../../../../static/images/diagnose_woman_left_leg.png);
	background-size: contain;	
	z-index:9;	
}
.f-right-leg-2{
	background: url(../../../../static/images/diagnose_woman_right_leg.png);
	background-size: contain;	
	z-index:10;		
}
.f-back-left-arm-2{
	background: url(../../../../static/images/diagnose_woman_back_left_arm.png);
	background-size: contain;	
	z-index:1;
	height:70%;
}
.f-back-right-arm-2{
	background: url(../../../../static/images/diagnose_woman_back_right-arm.png);
	background-size: contain;
	z-index:1;
	height:70%;
}
.f-back-2{
	background: url(../../../../static/images/diagnose_woman_back.png);
	background-size: contain;	
	z-index:2;
	height:70%;
}
.f-back-bone-2{
	background: url(../../../../static/images/diagnose_woman_bone.png);
	background-size: contain;	
	z-index:3;	
}
.f-back-lion-2{
	background: url(../../../../static/images/diagnose_woman_lion.png);
	background-size: contain;	
	z-index:4;	
}
.f-back-pelvis-2{
	background: url(../../../../static/images/diagnose_woman_pelvis.png);
	background-size: contain;	
	z-index:5;	
}
.f-back-hip-2{
	background: url(../../../../static/images/diagnose_woman_hip.png);
	background-size: contain;	
	z-index:6;
}
.f-back-leg-2{
	background: url(../../../../static/images/diagnose_woman_back_legs.png);
	background-size: contain;	
	z-index:6;
}
.f-big-head-2{
	background: url(../../../../static/images/diagnose_woman_big_top.png);
	background-size: contain;	
	z-index:9;	
}
.f-big-face-2{
	background: url(../../../../static/images/diagnose_woman_big_face.png);
	background-size: contain;	
	z-index:10;	
}
.f-big-ear-2{
	background: url(../../../../static/images/diagnose_woman_big_ear.png);
	background-size: contain;	
	z-index:11;	
}
.f-big-eyes-2{
	background: url(../../../../static/images/diagnose_woman_big_eyes.png);
	background-size: contain;	
	z-index:11;	
}
.f-big-nose-2{
	background: url(../../../../static/images/diagnose_woman_big_nose.png);
	background-size: contain;	
	z-index:11;	
}
.f-big-mouth-2{
	background: url(../../../../static/images/diagnose_woman_big_mouth.png);
	background-size: contain;	
	z-index:11;	
}
.c-neck-2,.c-head-2,.c-left-arm-2,.c-right-arm-2,.c-chest-2,.c-belly-2,.c-middle-2,.c-right-leg-2,.c-left-leg-2,.c-big-head-2,.c-big-face-2,.c-big-ear-2,.c-big-eyes-2,.c-big-nose-2,.c-big-mouth-2,.c-back-bone-2,.c-back-arm-2,.c-back-arm-right-2,.c-back-buttocks-2,.c-back-loins-2,.c-back-leg-2{
	width:100%;
	height:636px;
	position:absolute;
	left:0;
	top:0;
	display:none;
}
.c-head-2{
	background: url(../../../../static/images/child_big_head.png);
	background-size: contain;	
	z-index:1;
}
.c-neck-2{
	background: url(../../../../static/images/diagnose_child_neck.png);
	background-size: contain;	
	z-index:2;
}
.c-left-arm-2{
	background: url(../../../../static/images/diagnose_child_right_arm.png);
	background-size: contain;	
	z-index:3;
}
.c-right-arm-2{
	background: url(../../../../static/images/diagnose_child_left_arm.png);
	background-size: contain;	
	z-index:4;	
}
.c-chest-2{
	background: url(../../../../static/images/diagnose_child_chest.png);
	background-size: contain;	
	z-index:5;	
}
.c-belly-2{
	background: url(../../../../static/images/diagnose_child_belly.png);
	background-size: contain;	
	z-index:6;		
}
.c-middle-2{
	background: url(../../../../static/images/diagnose_child_middle.png);
	background-size: contain;	
	z-index:7;	
}
.c-left-leg-2{
	background: url(../../../../static/images/diagnose_child_right_leg.png);
	background-size: contain;	
	z-index:8;	
}
.c-right-leg-2{
	background: url(../../../../static/images/diagnose_child_left_leg.png);
	background-size: contain;	
	z-index:9;	
}
.c-big-head-2{
	background: url(../../../../static/images/diagnose_child_big_head_select.png);
	background-size: contain;	
	z-index:10;	
}
.c-big-face-2{
	background: url(../../../../static/images/diagnose_child_big_face_select.png);
	background-size: contain;
	z-index:11;		
}
.c-big-ear-2{
	background: url(../../../../static/images/diagnose_child_big_ear_select.png);
	background-size: contain;	
	z-index:11;	
}
.c-big-eyes-2{
	background: url(../../../../static/images/diagnose_child_big_eyes_select.png);
	background-size: contain;	
	z-index:11;	
}
.c-big-nose-2{
	background: url(../../../../static/images/diagnose_child_big_nose_select.png);
	background-size: contain;	
	z-index:11;	
}
.c-big-mouth-2{
	background: url(../../../../static/images/diagnose_child_big_mouth_select.png);
	background-size: contain;	
	z-index:11;	
}
.c-back-arm-2{
	background: url(../../../../static/images/diagnose_child_back_left_arm.png);
	background-size: contain;	
	z-index:12;	
}
.c-back-arm-right-2{
	background: url(../../../../static/images/diagnose_child_back_right-arms_select.png);
	background-size: contain;	
	z-index:12;	
}
.c-back-buttocks-2{
	background: url(../../../../static/images/diagnose_child_back_buttocks_select.png);
	background-size: contain;	
	z-index:12;	
}
.c-back-loins-2{
	background: url(../../../../static/images/diagnose_child_back_loins_select.png);
	background-size: contain;	
	z-index:12;	
}
.c-back-leg-2{
	background: url(../../../../static/images/diagnose_child_back_legs_select.png);
	background-size: contain;	
	z-index:12;
}
.c-back-bone-2{
	background: url(../../../../static/images/diagnose_child_back.png);
	background-size: contain;	
	z-index:13;	
}
.mu-card-media-title{
	height: 100%;
}
.demo-flat-button{
	position:relative;
	left:25%;
}
.shadow{
    width:0%;
    height:100%;
    position:absolute;
    left:-1%;
    top:0;
    z-index:998;
    background-color:#888888;
    opacity:0.6;
    display:block;
	transition: all 0.25s; 
}
.button-content{
	display:none;
}
.bar {
	z-index:9999;
	position: absolute;
}
.bar .search-input{
	background:#fff no-repeat 13px 13px;
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
.left-box{
	cursor:pointer;
	z-index:9999;
	position: absolute;
	top:5.5%;
	width: 0;
	height: 0;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-left: 10px solid transparent;
	border-right: 10px solid white;
}
.right-box{
	cursor:pointer;
	z-index:9999;
	position: absolute;
	top:5.5%;
	right:0%;
	width: 0;
	height: 0;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-right: 10px solid transparent;
	border-left: 10px solid white;
}

</style>
