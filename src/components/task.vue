<template>
  <div class="task" @click="close" >
    <div class="head">
      <div class="img">
        <img :src="this.$store.state.qrcode">
      </div>
      <div>
        <p>任务名称：{{this.name }}</p>
        <p>积分值：{{this.integral}}</p>
      </div>
    </div>
    <div class="middle" v-html="text" >
    </div>
    <button>关闭任务详情</button>
  </div>
</template>
<script>
export default {
  name:'aaa',
  data() {
    return {

    }
  },
  props:{
    text:{
      default:'游戏说明跑路了'
    },
    name:{
      default:'游戏名称跑路了'
    },
    integral:{
      default:'积分跑路了',
    }
  },
  methods:{
    close(){
      this.$emit('close');
    }
  }
}

</script>
<style scoped>
.task {
  height: 100%;
}

.head {
  height: 30%;
  width: 100%;
}

.head div {
  display: inline-block;
  box-sizing: border-box;
}
.head div:nth-child(2){
  width:45%;
  position: relative; 
  top:10px;
}
.head .img {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: inline-block;
}

.head .img img {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
}
.head p{  
  line-height: 30px;
  font-size:16px;
  font-weight: bold;
  width:100%;
}

.middle {
  height: 60%;
  margin: 10px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  text-indent: 2em;
  line-height: 20px;
  padding: 20px;
  position: relative;
}
.task  button{
  position: absolute;
  bottom: 100px;
  width:100px;
  height:35px;
  background-color:rgb(22,21,22);
  border:0px;
  border-radius: 5px;
  color:#fff;
  left:calc(50% - 50px);
}

</style>
