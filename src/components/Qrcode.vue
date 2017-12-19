<template>
	<div class="code">
		<div class="box">
			<a @click = "changebox()"><i></i></a>
			<h2>{{title}}</h2>
			<div>
				<img :src="imgurl">
			</div>
			<p>使用时向NPC出示</p>
		</div>
	</div>
</template>

<script>
	export default{
		data () {
		    return {
		    }
		},
		props:{
			imgurl:'',
			title:'',
		},
		methods:{
			changebox(){
				this.$emit('fromcode');
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.code{
		width:100%;
		height:100%;
		z-index: 1000;
		position: fixed;
		background-color: rgba(0,0,0,0.5);
		top:0;
	}
	.code .box{
		width:80%;
		height:350px;
		border-radius: 10px;
		background-color: rgb(255,212,62);
		margin:150px 10% 0 10%;
		text-align: center;
		position: absolute;
	}
	.box a{
		position: absolute;
		width:30px;
		height:30px;
		border-radius: 15px;
		border:1px solid #000;
		background-color: #fff;
		top:-7px;
		right:-7px;
	}
	.box i{ display: inline-block; width: 20px;height:2px; background: #000;line-height: 0;font-size:0;vertical-align: middle;-webkit-transform: rotate(50deg);margin-top: 8px;}
	.box i:after{content:'/';display:block;width: 20px;height:2px; background: #000;-webkit-transform: rotate(-100deg);}
	.box h2{
		font-size: 22px;
		margin-top: 40px;
	}
	.box div{
		margin:30px auto;
		width:160px;
		height: 160px;
		background-color: #fff;
		border-radius: 10px;
	}
	.box div img{
		width:86%;
		height:86%;
		margin-top:7%;
	}
</style>
