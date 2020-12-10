<script>

export default {
	data () {
		return{
			
		}
	},
	methods: {
		changeWindow(tag){
			this.$emit('changePage', tag);
		}
	}
};
</script>

<template>
<div class="list">
    <ul>
        <li @click="changeWindow('智杰小智')">
            <img class="avatar"  width="30" height="30" alt="智杰小智" src="static/images/p.png">
            <p class="name">智杰小智</p>
        </li>
		<li @click="changeWindow('症状导诊')">
		    <img class="avatar"  width="30" height="30" alt="症状导诊" src="static/images/person.png">
		    <p class="name">症状导诊</p>
		</li>
    </ul>
</div>
</template>

<style scoped lang="less">
.list {
    li {
        padding: 12px 15px;
        border-bottom: 1px solid #292C33;
        cursor: pointer;
        transition: background-color .1s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.03);
        }
        &.active {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
    .avatar, .name {
        vertical-align: middle;
    }
    .avatar {
        border-radius: 2px;
    }
    .name {
        display: inline-block;
        margin: 0 0 0 15px;
    }
	.demo-popup-bottom {
	  width: 100%;
	  max-width: 375px;
	}
}
</style>