<template>
  <div class="layout">
    <!-- <keep-alive> -->
      <GmMap></GmMap>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import GmMap from '@/user/plugin/map' //组件加载
export default {
  components: {
    GmMap
  },
  data() {
    return {

    }
  },
  methods: {
    //时间操作函数执行
  }
}

</script>
<style scoped>
.layout {
  height: 100%;
  background: -webkit-linear-gradient(#99FFFF, rgb(0, 150, 207));
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#99FFFF, rgb(0, 150, 207));
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#99FFFF, rgb(0, 150, 207));
  /* Firefox 3.6 - 15 */
  background: linear-gradient(#99FFFF, rgb(0, 150, 207));
  /* 标准的语法 */
}

</style>
