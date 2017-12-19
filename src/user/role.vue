<template>
  <div class="role">
    <loading v-show="loading"></loading>
    <div class="head">
      <ul>
        <li v-for="i in list"><img :src="i.head" @click="open(i.url,i.id)"></li>
      </ul>
    </div>
    <div class="view">
      <img :src="view">
      <span @click="submit"></span>
    </div>
    <tomsg :content="'确认选择该角色嘛'" v-if="ismsg" @cancel="cancel()" @confirm="confirm()"></tomsg>
  </div>
</template>
<script>
import tomsg from '@/components/Popover'
import Toast from '@/components/toast/toast.js'
import API from '../api/API'
const api = new API();
export default {
  components: { tomsg },
  created() {
    if (this.$store.state.team > 0) {
      //选择了角色跳到用户界面
      this.$router.push({ path: '/userinfo' });
    } else if (this.$store.state.role > 0) {
      //如果选择过了角色跳到阵容
      this.$router.push({ path: '/Vs' });
    }
  },
  data() {
    return {
      list: [{
          'id': 1,
          'head': require('../assets/head1.png'),
          'url': require('../assets/1.png')
        },
        {
          'id': 2,
          'head': require('../assets/head2.png'),
          'url': require('../assets/2.png')
        },
        {
          'id': 3,
          'head': require('../assets/head3.png'),
          'url': require('../assets/3.png')
        },
        {
          'id': 4,
          'head': require('../assets/head4.png'),
          'url': require('../assets/4.png')
        },
        {
          'id': 5,
          'head': require('../assets/head5.png'),
          'url': require('../assets/5.png')
        },
        {
          'id': 6,
          'head': require('../assets/head6.png'),
          'url': require('../assets/6.png')
        },
        {
          'id': 7,
          'head': require('../assets/head7.png'),
          'url': require('../assets/7.png')
        },
        {
          'id': 8,
          'head': require('../assets/head8.png'),
          'url': require('../assets/8.png')
        }
      ],
      view: require('../assets/1.png'),
      ismsg: false,
      select: 1,
      loading: false,
    }
  },
  methods: {
    open: function(e, i) {
      this.view = e;
      this.select = i;
    },
    //取消选择
    cancel: function() {
      this.ismsg = false;
    },
    //确认选择
    confirm: function() {
      this.loading = true;
      api.role({ 'uid': this.$store.state.uid, 'role': this.select }).then((rs) => {
        this.loading = false;
        if (rs.data.error == 0) {
          //写入缓存
          this.$store.dispatch('role', { 'id': this.select });
          this.$router.push({ path: '/Vs' });
        } else {
          Toast({
            message: rs.data.msg,
            position: 'top',
            duration: 2000
          });
        }
      });
      this.ismsg = false;
    },
    submit: function() {
      this.ismsg = true;
    }
  }
}

</script>
<style scoped>
.role {
  position: relative;
  height: 100%;
}

.role .head {
  width: 90%;
  top: 30px;
  margin-left: 5%;
  position: absolute;
  overflow: hidden;
}

.role .head ul {
  width: 100%;
}

.role .head li {
  float: left;
  width: 20%;
  margin-top: 5%;
}

.role .head li:nth-child(n+2) {
  margin-left: calc((20% - 6px) / 3);
}

.role .head li:nth-child(5) {
  margin-left: 0px;
}

.role .head img {
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  border: 3px solid #000;
}

.view img {
  height: 300px;
  margin-left: calc(50% - 70px);
  position: fixed;
  bottom: 100px;
}

.view span {
  width: 100px;
  height: 32px;
  line-height: 32px;
  display: block;
  background-color: #fff;
  background-image: url('../assets/button.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100px 32px;
  text-align: center;
  position: fixed;
  bottom: 30px;
  left: calc(50% - 50px);
}

@media screen and (max-width: 320px) {
  .role .head li {
    margin-top: 5px;
  }
  .view img {
    position: relative;
    top:190px;
  }
}

</style>
