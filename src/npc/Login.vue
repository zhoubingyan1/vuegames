<template>
  <div class="login">
    <img src="../assets/7m.png" class="top-pic">
    <div class="input"><img src="../assets/user.png">
      <input type="text" placeholder="请输入用户名" v-model="name">
    </div>
    <div class="input"><img src="../assets/password.png">
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <a class="button" @click="onLogin">登录</a>
  </div>
</template>
<script>
import Toast from '@/components/toast/toast.js'
import API from '../api/API'
const api = new API();
export default {
  data() {
    return {
      name: '',
      password: '',
    }
  },
  components: {

  },
  methods: {
    onLogin(val) {
      api.login({ 'name': this.name, 'password': this.password }).then((rs) => {
        if (rs.data.error == 0) {
          this.$store.dispatch('login',{code:rs.data.data.code,taskname:rs.data.data.taskname});//异步调用vuex登录方法
          let redirect = this.$route.query.redirect;
          if ( redirect == '' || redirect == undefined) { //判断是否存在路由断点
            this.$router.push({ path: '/npc' });
          } else {
            this.$router.push({ path: redirect });
          }
        } else {
          Toast({
            message: rs.data.msg,
            position: 'top',
            duration: 2000
          });
        }
      });
    },
  },
  watch: {

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 212, 62);
  text-align: center;
  position: absolute;
}

.login .top-pic {
  margin: 80px 0;
  width: 55%;
}

.input {
  width: 75%;
  height: 32px;
  line-height: 30px;
  border: 8px solid rgb(255, 234, 159);
  margin: 0 auto;
  margin-bottom: 10px;
}

.input img {
  width: 15%;
  height: 32px;
  float: left;
}

.input input {
  border: none;
  display: inline-block;
  width: 82%;
  float: right;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  padding-left: 3%;
}

.button {
  margin: 40px auto;
  width: 75%;
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  border: 2px solid #fff;
}

</style>
