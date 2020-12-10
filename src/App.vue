<template>

  <div id="app">
    <!--内容-->
    <div class="container-content">
      <router-view></router-view>
    </div>
		<my-dialog class="my-dialog" v-if="dialog"></my-dialog>
		</div>
</template>

<script>
import { mapState } from 'vuex'
// 加载需要用到的组件
import myDialog from './components/dialog/dialog'
import myPcPage from './components/pcpage/pcPage'

export default {
  name: 'app',
  components: {
    myDialog,
	  myPcPage
  },
  // mapState是vuex的方法之一
  computed: mapState(['dialog']),
	created() {
		this.scrollToBottom()
	},
	methods: {
		scrollToBottom() {     
			this.$nextTick(() => {	    
				var container = this.$el.querySelector(".container-content");        
				document.body.scrollTop = container.scrollHeight;
				})},
	}
}
</script>
