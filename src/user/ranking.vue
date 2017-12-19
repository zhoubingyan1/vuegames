<template>
  <div class="ranking">
    <loading v-show="loading"></loading>
    <header><img src="../assets/ranking.png"></header>
    <div class="rank">
      <div class="red">
        <div class="head">红队</div>
        <ul>
          <li v-for="(i,index) in red">
            <div><img :src="i.headimgurl"></div>
            <div>
              <p>No.{{index+1}}</p>
              <p>{{i.nickname}}</p>
            </div>
            <div><img src="../assets/money.png">{{i.order_integral}}</div>
            <span class="icon" v-show="index<3"><img :src="tu(index)"></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="rank">
      <div class="blue">
        <div class="head">蓝队</div>
        <ul>
          <li v-for="(i,index) in blue">
            <div><img :src="i.headimgurl"></div>
            <div>
              <p>No.{{index+1}}</p>
              <p>{{i.nickname}}</p>
            </div>
            <div><img src="../assets/money.png">{{i.order_integral}}</div>
            <span class="icon" v-show="index<3"><img :src="tu(index)"></span>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <div>
        <img :src="headurl">
      </div>
      <div>
        <p>No.{{num}}</p>
        <p>{{this.$store.state.nickname}}</p>
      </div>
      <div><img src="../assets/money2.png">{{this.$store.state.integral}}</div>
      </p>
    </footer>
  </div>
</template>
<script>
import Toast from '@/components/toast/toast.js'
import API from '../api/API'
const api = new API();
export default {
  created() {
    this.loading = true;
    api.ranking({ 'uid': this.$store.state.uid }).then((rs) => {
      this.loading = false;
      if (rs.data.error == 0) {
        this.red = rs.data.data.red_list;
        this.blue = rs.data.data.blue_list;
        this.num = rs.data.data.num;
      } else {
        Toast({
          message: rs.data.msg,
          position: 'top',
          duration: 2000
        });
      }
    });
  },
  data() {
    return {
      loading: false,
      red: [],
      blue: [],
      num: '', //用户当前排名
      headurl: this.$store.state.headimgurl,
    }
  },
  methods: {
    tu: function(e) {
      let src = ''
      if (e < 3) {
        src = require('../assets/guan' + (e + 1) + '.png');
      }
      return src;
    },
  }
}

</script>
<style scoped lang="scss">
.ranking {
  height: 100%;
  background-color: #fff;
  header {
    height: 10%;
    text-align: center;
  }
  header img {
    margin-top: 10px;
    height: 100%;
  }
  .rank {
    width: 50%;
    padding-top: 20px;
    float: left;
    margin-bottom: 60px;
    .head {
      font-weight: 600;
      font-size: 16px;
      font-family: '黑体';
      width: 50px;
      background-color: rgb(255, 212, 63);
      height: 50px;
      border-radius: 50%;
      line-height: 50px;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }
    ul {
      height: 100%;
    }
    li {
      height: 40px;
      width: calc(100% - 15px);
      line-height: 30px;
      box-shadow: 0px 0px 8px #999;
      border-radius: 5px;
      margin: 8px 10px;
      box-sizing: border-box;
      padding: 0px;
      position: relative;
      div {
        display: inline-block;
        height: 100%;
        overflow: hidden;
        float: left;
      }
      div:nth-child(1) {
        width: 25%;
        height: 100%;
        box-sizing: border-box;
        text-align: center;
        img {
          height: 94%;
          border-radius: 50%;
          border: 2px solid rgb(255, 239, 186);
          box-sizing: border-box;
          margin-top: 3%;
        }
      }
      div:nth-child(2) {
        width: 40%;
        box-sizing: border-box;
        p:nth-child(1) {
          font-size: 12px;
          height: 50%;
          font-weight: bold;
          line-height: 25px;
        }
        p:nth-child(2) {
          font-size: 12px;
          height: 50%;
          line-height: 20px;
          color: #999;
        }
      }
      div:nth-child(3) {
        width: 35%;
        background-color: rgb(255, 142, 134);
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        line-height: 40px;
        color: #fff;
      }
      span {
        position: absolute;
        left: -15px;
        top: -15px;
      }
    }
  }
}

.ranking .blue ul li div:nth-child(3) {
  background-color: rgb(171, 212, 232);
}

footer {
  height: 60px;
  line-height: 60px;
  background-color: rgb(255, 212, 62);
  width: 100%;
  position: fixed;
  bottom: 0px;
  overflow: hidden;
}

footer>div {
  float: left;
}

footer>div:nth-child(1) img {
  width: 40px;
  height: 40px;
  margin-left: 30px;
  border: 2px solid rgb(255, 180, 0);
  border-radius: 50%;
  margin-bottom: 3px;
}

footer>div:nth-child(2) {
  margin-left: 15px;
  p:nth-child(1) {
    height: 30px;
    font-weight: 600;
    line-height: 35px;
    font-size: 14px;
  }
  p:nth-child(2) {
    height: 20px;
    line-height: 20px;
    color: #333;
    font-size: 12px;
    width: 120px;
    overflow: hidden;
  }
}

footer>div:nth-child(3) {
  float: right;
  margin-right: 30px;
}

@media screen and (width: 320px) {
  ul li>div:nth-child(3) img {
    width: 20px;
  }
}

</style>
