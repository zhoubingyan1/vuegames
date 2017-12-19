<template>
  <div class="welcome" :style="{'top':t_h}">
    <p>LOADING......</p>
    <transition name="fade">
      <div class="progress-bar" v-if="isShow">
        <div class="tiao" :style="{'width':val}"> </div>
      </div>
    </transition>
  </div>
</template>
<script>
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return null;
  }
}
var code = GetQueryString("code");
var s_h = window.screen.height;
import Toast from '@/components/toast/toast.js'
import API from '../api/API'
const api = new API();
export default {
  created() {},
  data() {
    return {
      t_h: s_h / 2 - 50 + 'px', //上边距
      isShow: true, // 是否显示进度条
      val: this.initVal + '%', // 进度
      url: '/map',
      exe:false,//执行命令
    }
  },
  methods: {

  },
  props: {
    /**
     * 间隔时间
     */
    time: {
      type: Number,
      default: 1000,
    },
    /**
     * 每10毫秒自增幅度
     */
    step: {
      type: Number,
      default: 10,
    },
    /**
     * 初始值
     */
    initVal: {
      type: Number,
      default: 0,
    },
    /**
     * 到一定进度停止
     */
    stopVal: {
      type: Number,
      default: 100,
    },
    /**
     * 进度条继续到成功
     */
    isOk: {
      type: Boolean,
      default: false,
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      // if (this.$store.state.uid != '' && this.$store.state.role >0 && this.$store.state.team >0 ) {
      //   //防止用户返回授权页面
      //   this.$router.push({ path: '/userinfo' });
      // }
      // if (code != null) {
      //   api.author({ 'code': code }).then((rs) => {
      //     if (rs.data.error == 0) {
      //       //写入缓存
      //       this.$store.dispatch('author', rs.data.data);
      //     }
      //     if (this.$store.state.team > 0) {
      //       //选择了角色跳到用户界面
      //       this.url = '/userinfo';
      //       this.$router.push({ path: '/userinfo' });
      //     } else if (this.$store.state.role > 0) {
      //       //如果选择过了角色跳到阵容
      //       this.url = '/Vs';
      //       this.$router.push({ path: '/Vs' });
      //     } else {
      //       this.url = '/role';
      //       this.$router.push({ path: '/role' });
      //     }
      //   });
      // }else {
      //   Toast({
      //     message: 'code获取失败',
      //     position: 'top',
      //     duration: 2000
      //   });
      // }
      //初始化后加载进度，加载到百分之多少由stopVal决定
      let num = this.initVal;
      let step = this.step;
      let timer = setInterval(() => {
        num = num + step;
        this.val = num + '%';
        // 父组件数据加载完前进度条最多到stopVal的这个百分值
        if (num >= this.stopVal) {
          clearInterval(timer)
          this.$router.push({ path: this.url });
        }
      }, this.time)
    })
  },
  watch: {
    /**
     * 监听组件props变化决定是否继续加载，一般在父组件数据加载完后改变此标志位
     */
    isOk() {
      let val = this.val
      let step = this.step
      let timer = setInterval(() => {
        val = val + step
        this.val = val + '%'
        // 加载到百分百完成
        if (val >= 100) {
          // 关闭定时器
          clearInterval(timer)
          // 加载完成关闭进度条
          this.isShow = false
          // 加载完成的回调
          // this.$emit('callback', 'load success')
        }
      }, 1000)
    },
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome {
  position: relative;
  width: 90%;
  margin-left: 5%;
}

.welcome p {
  text-align: center;
  font-size: 14px;
}

.progress-bar {
  width: 90%;
  height: 10px;
  margin-left: 5%;
  margin-top: 10px;
  border-radius: 50px;
  background-color: #fff;
  border: 5px solid rgb(255, 234, 159);
}

.tiao {
  width: 0%;
  background-color: rgb(255, 212, 62);
  border-radius: 50px;
  height: 10px;
  transition: width 1s;
  -moz-transition: width 1s;
  /* Firefox 4 */
  -webkit-transition: width 1s;
  /* Safari and Chrome */
  -o-transition: width 1s;
  /* Opera */
}

</style>
