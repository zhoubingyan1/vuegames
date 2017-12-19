<template>
  <div class="pk">
    <p class="name">{{this.$store.state.taskname?this.$store.state.taskname:'任务点出错了'}}</p>
    <div class="code">
      <div class="code-left"><img @click="scanning1" :src="userhead1?userhead1:require('../assets/default.png')"></div>
      <p class="code-center">PK</p>
      <div class="code-right"><img @click="scanning2" :src="userhead2?userhead2:require('../assets/default.png')"></div>
    </div>
    <div class="num">
      <input type="text" v-model="num" class="num-left">
      <input type="text" v-model="num" class="num-right">
    </div>
    <div class="player">
      <p class="player-left" :class="{active:A}" @click="choose('A')">A 胜</p>
      <p class="player-right" :class="{active:B}" @click="choose('B')">B 胜</p>
    </div>
    <a class="button" @click="sub">确认</a>
  </div>
</template>
<script>
import Qrcode from '../components/Qrcode';
import Toast from '@/components/toast/toast.js'
import API from '@/api/API'
const api = new API();
export default {
  created() {
    api.wxconfig({ 'url': window.location.href }).then((rs) => {
      if (rs.data.error == 0) {
        var wechat = rs.data.data;
        var addToken = wechat['accessToken'];
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: wechat.appId, // 必填，公众号的唯一标识
          timestamp: wechat.timestamp, // 必填，生成签名的时间戳
          nonceStr: wechat.nonceStr, // 必填，生成签名的随机串
          signature: wechat.signature, // 必填，签名，见附录1
          jsApiList: ['scanQRCode', ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      }
    });
  },
  data() {
    return {
      A: false,
      B: false,
      num: 0, //加分分值
      userhead1: '', //用户1微信头像
      userhead2: '', //用户2微信头像
      openid1: '', //用户1身份凭证
      openid2: '', //用户2身份凭证
      team1: '', //用户1所处队伍
      team2: '', //用户2所处队伍
      code: this.$store.state.code, //NPC身份证
      win: 0, //1:左边赢  2:右边赢
    }
  },
  components: {
    Qrcode
  },
  methods: {
    choose(player) {
      if (player == 'A') {
        this.A = true;
        this.B = false;
        this.win = 1;
      } else {
        this.A = false;
        this.B = true;
        this.win = 2;
      }
    },
    //打开扫一扫
    scanning1() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: (res) => {
          var openid = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          this.openid1 = openid;
          if (openid) {
            api.userhead({ 'openid': openid, 'code': this.code }).then((rs) => {
              // alert(JSON.stringify(rs));
              if (rs.data.error == 0) {
                //触发回调
                api.trigger({ 'openid': openid }).then((rs) => {});
                // 获取参赛用户
                this.userhead1 = rs.data.data.headimgurl;
                this.team1 = rs.data.data.team;
              } else {
                Toast({
                  message: '获取失败,请重新扫描',
                  position: 'top',
                  duration: 2000
                });
              }
            });
          }
        }
      });
    },
    scanning2() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: (res) => {
          var openid = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          this.openid2 = openid;
          if (openid) {
            api.userhead({ 'openid': openid, 'code': this.code }).then((rs) => {
              // alert(JSON.stringify(rs));
              if (rs.data.error == 0) {
                //触发回调
                api.trigger({ 'openid': openid }).then((rs) => {});
                // 获取参赛用户
                this.userhead2 = rs.data.data.headimgurl;
                this.team2 = rs.data.data.team;
              } else {
                Toast({
                  message: '获取失败,请重新扫描',
                  position: 'top',
                  duration: 2000
                });
              }
            });
          }
        }
      });
    },
    //确认加分
    sub() {
      if (this.num > 100) {
        Toast({
          message: '您输入的分值过大',
          position: 'top',
          duration: 2000
        });
        this.num = 0;
        return false;
      } else {
        if (this.num == 0) {
          Toast({
            message: '请输入有效分数',
            position: 'top',
            duration: 2000
          });
          this.num = 0;
          return false;
        } else if (this.team1 == '' || this.openid1 == '' || this.team2 == '' || this.openid2 == '') {
          Toast({
            message: '请先扫描玩家出示的二维码',
            position: 'top',
            duration: 2000
          });
          return false;
        }
        if (this.win == 0) {
          Toast({
            message: '请判断胜负',
            position: 'top',
            duration: 2000
          });
          return false;
        }
        api.pk({ 'code': this.$store.state.code, 'integral': this.num, 'team1': this.team1, 'openid1': this.openid1, 'team2': this.team2, 'openid2': this.openid2, 'num': this.win }).then((rs) => {
          if (rs.data.error == 0) {
            Toast({
              message: '判定成功',
              position: 'top',
              duration: 2000
            });
            this.team = '';
            this.openid = '';
            this.userhead = '';
          } else {
            Toast({
              message: rs.data.msg,
              position: 'top',
              duration: 2000
            });
          }
        });
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pk {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 212, 62);
  text-align: center;
  position: absolute;
}

.pk .name {
  margin: 60px 0;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
}

.pk .code {
  margin: 0 auto;
  width: 90%;
  height: 120px;
  text-align: center;
}

.code p {
  margin: 45px auto;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 15px;
  display: inline-block;
  font-size: 16px;
  line-height: 30px;
}

.code div {
  height: 120px;
  width: 120px;
  display: inline-block;
  background-color: #fff;
}

.code img {
  margin-top: 10px;
  width: 100px;
  height: 100px;
}

.code .code-left {
  float: left;
  border-radius: 10px;
}

.code .code-right {
  float: right;
  border-radius: 10px;
}

.num {
  margin: 0 auto;
  margin-top: 60px;
  width: 80%;
  overflow: hidden;
}

.num input {
  text-align: center;
  display: inline-block;
  width: 90px;
  height: 25px;
  border: 3px solid rgb(255, 234, 159);
}

.num .num-left {
  float: left
}

.num .num-right {
  float: right
}

.player {
  margin: 0 auto;
  margin-top: 20px;
  width: 80%;
  overflow: hidden;
}

.player p {
  display: inline-block;
  border-radius: 3px;
  width: 90px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid #fff;
}

.player .active {
  background-color: #fff;
}

.player .player-left {
  float: left
}

.player .player-right {
  float: right
}

.button {
  margin: 40px auto;
  width: 75%;
  border-radius: 3px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  border: 1px solid #fff;
}

</style>
