<template>
  <div class="stall">
    <h1>奖品兑换中心</h1>
    <img @click="scanning" :src="require('../assets/default.png')">
    <div class="input">
      <label>您扫描的兑换码是:</label>
      <p>{{num}}</p>
      <label>您的兑换结果是:</label>
      <p>{{msg}}</p>
    </div>
    <button @click="sub">兑换</button>
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
      num:'', //兑换码
      msg:'',//兑换结果
      openid:this.$store.state.openid,
    }
  },
  methods: {
    //打开扫一扫
    scanning() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: (res) => {
          this.msg='';
          var str = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          this.num = str;
        }
      });
    },
    //奖品兑换
    sub() {
        api.exchange({ 'code': this.num}).then((rs) => {
          if (rs.data.error == 0) {
            //触发回调
            api.trigger({ 'openid': this.openid }).then((rs) => {});
            Toast({
              message: '兑换成功',
              position: 'top',
              duration: 2000
            });
            this.msg='兑换成功';
          } else {
            Toast({
              message: rs.data.msg,
              position: 'top',
              duration: 2000
            });
            this.msg="兑换失败";
          }
        });
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
  overflow: hideen;
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
  margin-top: 20%;
  border: 10px solid rgba(255, 255, 255, 0.5);
}

.stall .input {
  margin-top: 10px;
}

.stall label {
  font-size: 18px;
  text-align: center;
  width: 100%;
  display: block;
  height: 30px;
  margin-top:10px;
}

.stall input {
  height: 25px;
  text-align: center;
  border: 10px solid rgb(255, 255, 255);
  width: calc(100% - 20px);
}

.stall button {
  width: 100%;
  height: 35px;
  background-color: rgb(255, 212, 62);
  border: 1px solid #fff;
  margin-top: 30px;
  color: #fff;
}

.stall button:focus {
  border: #000 solid 1px;
}
.input p{
  height:30px;
  width:100%;
  background-color: #fff;
  text-align: center;
  line-height: 30px;
  font-size:14px;
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
