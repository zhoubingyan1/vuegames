<template>
	<div class="code">
		<p class="name">当前任务点名称</p>
		<div class="pic"><img src="../assets/code.png"></div>
	</div>
</template>

<script>
	export default{
		data () {
		    return {
		        num1:'',
		    }
		},
		components:{
			
		},
		methods:{
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.code{
		width: 100%;
		height:100%;
		background-color: rgb(255,212,62);
		text-align: center;
		position: absolute;
	}
	.code .name{
		margin:60px 0;
		text-align: center;
		font-size: 30px;
		font-weight: 700;
	}
	.code .pic{
		width:160px;
		height:160px;
		margin:0 auto;
		background-color: #fff;
		border-radius: 10px;
	}
	.pic img{
		width:140px;
		height:140px;
		margin-top:10px;
	}
</style>
