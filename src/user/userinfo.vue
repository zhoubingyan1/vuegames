<template>
  <div class="userinfo">
    <div class="head">
      {{this.$store.state.nickname}}
    </div>
    <div class="middle"><img :src="role_img"></div>
    <div class="left">
      <ul>
        <router-link to="/map">
          <li><img src="../assets/icon1.png">
            <p>探索</p>
          </li>
        </router-link>
        <router-link to="/bag">
          <li><img src="../assets/icon2.png">
            <p>背包</p>
          </li>
        </router-link>
        <router-link to="/integral">
          <li><img src="../assets/icon3.png">
            <p>历史</p>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="right">
      <ul>
        <router-link to="/raffle">
          <li><img src="../assets/icon4.png">
            <p>转盘</p>
          </li>
        </router-link>
        <router-link to="/ranking">
          <li><img src="../assets/icon5.png">
            <p>排行榜</p>
          </li>
        </router-link>
        <router-link to="/qa">
          <li><img src="../assets/icon6.png">
            <p>Q&A</p>
          </li>
        </router-link>
        <router-link to="/reward">
          <li><img src="../assets/icon7.png">
            <p>兑换</p>
          </li>
        </router-link>
      </ul>
    </div>
    <span class="span">目前积分：<b>{{this.$store.state.integral}}<a @click="update">刷新积分</a></b></span>
  </div>
</template>
<script>
import Toast from '@/components/toast/toast.js'
import API from '@/api/API'
const api = new API();
export default {
  name: 'hello',
  data() {
    return {
      msg: '',
      role_img: require("../assets/" + this.$store.state.role + ".png"),
    }
  },
  methods: {
    update() {
      api.update({ 'uid': this.$store.state.uid }).then((rs) => {
        //更新积分
      this.$store.dispatch('upine', rs.data.data);
          Toast({
            message: '刷新成功',
            position: 'top',
            duration: 2000
          });
      });
    }
  }
}

</script>
<style scoped>
.userinfo {
  height: 100%;
}

.userinfo p {
  text-align: center;
}

.head {
  text-align: center;
  width: 70%;
  margin-left: 15%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  top: 10%;
  height: 30px;
  line-height: 30px;
  position: absolute;
  color: #666;
}

.middle {
  position: absolute;
  left: calc(50% - 75px);
  top: 20%;
}

.middle img {
  height: 320px;
}

.userinfo li {
  width: 50px;
  height: 50px;
  background-color: rgb(208, 240, 255);
  border-radius: 50%;
  margin-top: 30%;
}

.userinfo ul a {
  display: block;
}

.userinfo li img {
  width: 30px;
  margin-left: 10px;
}

.left {
  position: absolute;
  top: 20%;
  left: 20px;
}

.right {
  position: absolute;
  top: 20%;
  right: 20px;
}

.span {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 50px;
  display: block;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
}

.span a {
  text-decoration: underline;
  font-size: 18px;
  margin-left: 5px;
  line-height: 40px;
  height: 40px;
  display: inline-block;
  color: #0d7bb7;
  font-weight: 400;
}

@media screen and (min-width: 400px) {
  .userinfo li {
    width: 60px;
    height: 60px;
  }
  .userinfo li img {
    width: 40px;
    margin-left: 10px;
  }
}
@media screen and (width: 320px) {
  .span{
    bottom: 20px;
  }
}
</style>
