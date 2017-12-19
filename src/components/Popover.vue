<template>
	<div class="popover">
		<div class="box">
			<div class="box-up">{{content}}</div>
			<div class="box-down">
				<a class="down-left" @click="cancel()">取消</a>
				<a class="down-right" @click="confirm()">确认</a>
			</div>
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
			content:{
				type:String,
				default:'消息提示'
			}
		},
		methods:{
			cancel(){
				this.$emit('cancel');
			},
			confirm(){
				this.$emit('confirm');
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.popover{
		width:100%;
		height:100%;
		z-index: 1000;
		position: absolute;
		background-color: rgba(0,0,0,0.5);
		top:0px;
	}
	.popover .box{
		width:60%;
		height:140px;
		margin:50% auto;
		/*border-radius: 5px;*/
		background-color: #fff;
	}
	.box-up{
		width:100%;
		height:100px;
		line-height: 100px;
		font-size: 18px;
		text-align: center;
	}
	.box-down{
		width:100%;
		height:40px;
		line-height: 39px;
		font-size: 14px;
		border-top: 1px solid #ccc;
	}
	.box-down a{
		width:50%;
		text-align: center; 
	}
	.down-right{

		float: right;
		color:#fff;
		background-color: rgb(45,140,240);
	}
</style>
