<template>
  <div class="bag">
    <loading v-show="loading"></loading>
    <ul>
      <li v-for="i in list">
        <img :src="i.type>1?require('../assets/gift.png'):require('../assets/ticket.png')">
        <div class="left">
          <p>{{i.name}}</p>
          <span>请到服务台领取</span>
        </div>
        <div class="right">
          <img src="../assets/button.png" @click="changebox(i.name,i.qrcode)">
        </div>
      </li>
    </ul>
    <div class="default" v-show="!list">背包空空如也,赶紧去抽几张优惠劵吧！
      <p>
        <router-link to="/raffle">抽奖</router-link>
      </p>
    </div>
    <Qrcode v-if="box" @fromcode="changebox" :imgurl="imgurl" :title="title"></Qrcode>
  </div>
</template>
<script>
import Qrcode from '@/components/Qrcode';
import Toast from '@/components/toast/toast.js'
import API from '../api/API'
const api = new API();
export default {
  created() {
    this.loading = true;
    api.bag({ 'uid': this.$store.state.uid }).then((rs) => {
      this.loading = false;
      if (rs.data.error == 0) {
        this.list = rs.data.data;
      }
    });
    // 链接socket服务器
    var socket = io('http://hls.xuehuiwan.cn:2120');
    // socket连接后以openid登录
    socket.on('connect', () => {
      socket.emit('login', this.$store.state.openid);
    });
    // 后端推送来消息时
    socket.on('new_msg', (msg) => {
      if (msg == 'yes') {
        this.box = false;
        Toast({
          message: "兑换成功",
          position: 'top',
          duration: 3000
        });
        api.bag({ 'uid': this.$store.state.uid }).then((rs) => {
          this.loading = false;
          if (rs.data.error == 0) {
            this.list = rs.data.data;
          }
        });
      }
    });
    // 后端推送来在线数据时
    socket.on('update_online_count', function(online_stat) {
      // console.log(online_stat);
    });
  },
  data() {
    return {
      box: false,
      list: '',
      imgurl: '',
      title: '',
      loading: false,
    }
  },
  components: {
    Qrcode
  },
  methods: {
    changebox(title, img) {
      this.title = title;
      this.imgurl = img;
      this.box = !this.box;
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bag {
  width: 100%;
  height: auto;
  background-color: rgb(255, 212, 62);
  position: absolute;
}

.bag ul {
  margin: 0 auto;
  margin-top: 30px;
  width: 92%;
}

.bag li {
  width: 100%;
  height: 100px;
  border: 2px solid #000;
  box-shadow: 0 3px 0 rgb(208, 153, 47);
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #fff;
}

.bag li img {
  width: 80px;
  height: 80px;
  float: left;
  margin: 10px 10px 0 10px;
}

.bag .left {
  float: left;
  margin-top: 20px;
}

.bag .left p {
  font-size: 18px;
  margin-bottom: 10px;
}

.bag .left span {
  margin-top: 5px;
  font-size: 12px;
  color: rgb(153, 153, 153);
}

.bag .right {
  float: right;
  width: 100px;
  height: 100px;
  border-left: 2px dashed #000;
}

.bag .right img {
  margin: 35px 0 0 12px;
  width: 76px;
  height: 28px;
}

.default {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.default a {
  margin-top: 15px;
  display: block;
  width: 100px;
  height: 35px;
  background-color: #ff9800;
  line-height: 35px;
  color: #fff;
  border-radius: 5px;
  margin-left: calc(50% - 50px);
}

</style>
