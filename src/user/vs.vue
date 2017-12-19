<template>
  <div class="vs">
    <img src="../assets/vstop.jpg" class="top" @click="changebox('red')">
    <img src="../assets/vs.png" class="middle">
    <img src="../assets/vsbottom.jpg" class="bottom" @click="changebox('blue')">
    <Popover v-if="box" :content="content" @cancel="cancel()" @confirm="confirm()"></Popover>
  </div>
</template>
<script>
import Popover from '@/components/Popover';
import Toast from '@/components/toast/toast.js'
import API from '../api/API'
const api = new API();
export default {
  created() {
    if (this.$store.state.team > 0) {
      //选择了角色跳到用户界面
      this.$router.push({ path: '/userinfo' });
    }
  },
  data() {
    return {
      box: false,
      content: '',
      team:1,
    }
  },
  components: {
    Popover
  },
  methods: {
    changebox(team) {
      if (team == 'red') {
      	this.team=1;
        this.content = '确认加入红队?';
      } else {
      	this.team=2;
        this.content = '确认加入蓝队?';
      }
      this.box = !this.box;
    },
    //取消选择
    cancel() {
      this.box = !this.box;
    },
    //确认选择
    confirm() {
      api.lineup({ 'uid': this.$store.state.uid, 'team': this.team}).then((rs) => {
        if (rs.data.error == 0) {
          //写入缓存
          this.$store.dispatch('lineup', { 'id': this.team });
          this.$router.push({ path: '/userinfo' });
        } else {
          Toast({
            message: rs.data.msg,
            position: 'top',
            duration: 2000
          });
        }
      });
      this.box = !this.box;
    },
  }
}

</script>
<style scoped>
.vs {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.vs .middle {
  width: 100%;
  height: 200px;
  position: absolute;
  top: calc(50% - 100px);
}

.vs .top {
  width: 100%;
  height: 50%;
}

.vs .bottom {
  width: 100%;
  height: 50%;
}

</style>
