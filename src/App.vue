<template>
  <div id="app" :style="{'min-height':s_h}" >
  	<transition name="router-fade" mode="out-in">
      <router-view></router-view>
   	</transition>
  </div>
</template>

<script>
// var s_h=window.screen.height; 
let s_h = document.documentElement.scrollTop == 0 ? document.body.clientHeight : document.documentElement.clientHeight; // 屏幕高度
export default {
  data(){
  	return{
  		s_h:s_h+'px',
  	}
  }
}
</script>

<style lang="scss">
  @import './style/common.scss';
.router-fade-enter-active, .router-fade-leave-active {
  	transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
  	opacity: 0;
}
#app{
  height:100%;
}
html,body{
  height:100%;
}
</style>
