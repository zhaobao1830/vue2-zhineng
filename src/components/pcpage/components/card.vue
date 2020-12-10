<script>

export default {
	data() {
		return {
			userData:{
				self: {
					"_id": 0,
					"avatar": "/static/images/patient.png",
					"name": "不忘初心",
				}
			}
		}
	},
};
</script>

<template>
<div class="card">
    <header>
        <img class="avatar" width="40" height="40" :alt="userData.self.name" :src="userData.self.avatar">
        <p class="name">{{userData.self.name}}</p>
    </header>
    <footer>
		<hr/> 
    </footer>
</div>
</template>

<style scoped lang="less">
.card {
    padding: 12px;
    border-bottom: solid 1px #24272C;
	
    footer {
        margin-top: 20px;
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
        font-size: 16px;
    }
    .search {
        padding: 0 10px;
        width: 100%;
        font-size: 12px;
        color: #fff;
        height: 30px;
        line-height: 30px;
        border: solid 1px #3a3a3a;
        border-radius: 4px;
        outline: none;
        background-color: #26292E;
    }
}
</style>