<template>
  <div class="stall">
    <h1>{{this.$store.state.taskname?this.$store.state.taskname:'任务点出错了'}}</h1>
    <img @click="scanning" :src="userhead?userhead:require('../assets/default.png')">
    <div class="input">
      <label>您输入的分数是:{{num}}分</label>
      <input v-model.number="num" type="number">
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
      num: 0, //加分分值
      userhead: '', //用户微信头像+
      openid: '', //用户身份凭证
      team: '', //用户所处队伍
      code: this.$store.state.code, //NPC身份证
    }
  },
  methods: {
    //打开扫一扫
    scanning() {
      // Toast("执行了方法");
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
        } else if (this.team == '' || this.openid == '') {
          Toast({
            message: '请先扫描玩家出示的二维码',
            position: 'top',
            duration: 2000
          });
          return false;
        }
        api.plus({ 'openid': this.openid, 'code': this.$store.state.code, 'integral': this.num, 'team': this.team }).then((rs) => {
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
    }
  },
  computed: {

  }
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

.stall .input {
  margin-top: 50px;
}

.stall label {
  font-size: 24px;
  text-align: center;
  width: 100%;
  display: block;
  height: 40px;
}

.stall input {
  height: 25px;
  text-align: center;
  border: 10px solid rgb(255, 255, 255);
  width: calc(100% - 20px);
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

@media screen and (width: 320px) {
  .stall label {
    font-size: 18px;
    text-align: center;
    width: 100%;
    display: block;
    height: 30px;
  }
  .stall button {
    margin-top: 20px;
  }
  .stall input {
    height: 15px;
  }
  .stall .input {
    margin-top: 20px;
  }
}

</style>
