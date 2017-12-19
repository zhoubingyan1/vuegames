<template>
  <transition name="fade">
    <div class="message">
      <div class="box">
        <div class="box-up">{{content}}</div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    content: {
      type: String,
      default: '信息提示'
    },
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.box-up {
  position: fixed;
  top: 20px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  height: 25px;
  line-height: 25px;
  width: 80%;
  margin-left: 10%;
  border-radius: 5px;
  color: #7604c5;
}

</style>
