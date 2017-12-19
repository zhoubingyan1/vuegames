<template>
  <div class="stall">
    <h1>{{this.$store.state.taskname?this.$store.state.taskname:'任务点出错了'}}</h1>
    <img @click="scanning" :src="userhead?userhead:require('../assets/default.png')">
    <div>
      <ul>
        <li @click="select('isA',5)" :class="{'select':isA}">5</li>
        <li @click="select('isB',10)" :class="{'select':isB}">10</li>
        <li @click="select('isC',15)" :class="{'select':isC}">15</li>
        <li @click="select('isD',25)" :class="{'select':isD}">25</li>
      </ul>
    </div>
    <button @click="sub">确认</button>
  </div>
</template>
<script>
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
      isA: true,
      isB: false,
      isC: false,
      isD: false,
      num: 5, //加分分值
      userhead: '', //用户微信头像+
      openid: '', //用户身份凭证
      team: '', //用户所处队伍
      code: this.$store.state.code, //NPC身份证
    }
  },
  methods: {
    select(e, n) {
      this.isA = this.isB = this.isC = this.isD = false;
      this.num = n;
      this[e] = true;
    },
    //打开扫一扫
    scanning() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: (res) => {
          var openid = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          this.openid = openid;
          if (openid) {
            api.userhead({ 'openid': openid, 'code': this.code }).then((rs) => {
              if (rs.data.error == 0) {
                //触发回调
                api.trigger({ 'openid': openid }).then((rs) => {});
                // 获取参赛用户
                this.userhead = rs.data.data.headimgurl;
                this.team = rs.data.data.team;
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
      if (this.team == '' || this.openid == '') {
        Toast({
          message: '请先扫描玩家出示的二维码',
          position: 'top',
          duration: 2000
        });
        return false;
      }
      api.plus({ 'openid': this.openid, 'code': this.$store.state.code, 'integral': this.num, 'team': this.team }).then((rs) => {
        // api.plus({ 'openid': 'o3oNfwLS-fN1DYqh2liOCJRBudpM', 'code': 'b21isd', 'integral': 50, 'team': 1 }).then((rs) => {
        if (rs.data.error == 0) {
          Toast({
            message: '加分成功',
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
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stall {
  width: 90%;
  margin-left: 5%;
  position: relative;
  height: 100%;
}

.stall h1 {
  text-align: center;
  top: 10%;
  position: relative;
}

.stall img {
  border-radius: 50%;
  position: relative;
  height: 200px;
  width: 200px;
  margin-left: calc(50% - 110px);
  margin-top: 25%;
  border: 10px solid rgba(255, 255, 255, 0.5);
}

.stall ul {
  margin-top: 50px;
}

.stall ul li {
  float: left;
  height: 30px;
  width: calc(20% - 2px);
  text-align: center;
  background-color: #fff;
  border: 1px solid rgb(255, 212, 62);
  line-height: 30px;
}

.stall ul li:nth-child(n+2) {
  margin-left: 6.66%;
}

.stall ul .select {
  background-color: rgb(255, 212, 62);
  border: 1px solid #fff;
}

.stall button {
  width: 100%;
  height: 40px;
  background-color: rgb(255, 212, 62);
  border: 1px solid #fff;
  margin-top: 30px;
  color: #fff;
}

.stall button:focus {
  border: #000 solid 1px;
}

</style>
