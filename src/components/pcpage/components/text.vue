<script>

export default {
    data () {
        return {
            content: '',
        };
    },
    methods: {
        onKeyup (e) {
			this.$parent.num = 1
            if (e.keyCode === 13 && this.content.replace(/\s*/g,"").length) {
                this.$store.dispatch('sendValue2', {
                  _id: 1,
                  message: this.content,
                  that: this
                });
                this.content = '';
				this.$emit('scrollC');
            }
        }
    },
};
</script>

<template>
	<div class="text">
		<textarea placeholder="按 Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
	</div>
</template>

<style lang="less" scoped>
.text {
    height: 160px;
    border-top: solid 1px #ddd;

    textarea {
        padding: 10px;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        font-family: "Micrsofot Yahei";
        resize: none;
    }
}
</style>