<template>
  <div class="bag">
    <loading v-show="loading"></loading>
    <ul>
      <li v-for="i in list">
        <img :src="require('../assets/gift.png')">
        <div class="left">
          <p>{{i.name}}(还剩：{{i.num}})</p>
          <span>{{i.describe}}</span>
        </div>
        <div class="right" v-show="i.num>0?true:false">
          <img src="../assets/button3.png" @click="change(i.id)">
          <span>积分{{i.integral}}</span>
        </div>
      </li>
    </ul>
    <tomsg :content="'您确认兑换嘛'" v-if="ismsg" @cancel="cancel()" @confirm="confirm()"></tomsg>
  </div>
</template>
<script>
import Toast from '@/components/toast/toast.js'
import tomsg from '@/components/Popover'
import API from '../api/API'
const api = new API();
export default {
  created() {
    this.loading = true;
    api.reward({}).then((rs) => {
      this.loading = false;
      if (rs.data.error == 0) {
        this.list = rs.data.data;
      }
    });
  },
  data() {
    return {
      list: '',
      loading: false,
      ismsg: false,
      id:'',//选择兑换的ID
    }
  },
  components: {tomsg},
  methods: {
    change(id) {
      this.id=id;
      this.ismsg=true;
    },
    //取消选择
    cancel: function() {
      this.ismsg = false;
    },
    //确认选择
    confirm: function() {
      api.change({ 'openid': this.$store.state.openid, 'ranking_id': this.id }).then((rs) => {
        if (rs.data.error == 0) {
          Toast({
            message: "兑换成功",
            position: 'top',
            duration: 3000
          });
          //更新列表
          this.list = rs.data.data.list;
          //更新积分
          this.$store.dispatch('upine', rs.data.data);
        } else {
          Toast({
            message: rs.data.msg,
            position: 'top',
            duration: 3000
          });
        }
      });
      this.ismsg = false;
    },
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
  position: relative;
}

.bag .right img {
  margin: 35px 0 0 12px;
  width: 76px;
  height: 28px;
}

.bag .right span {
  text-align: center;
  color: #f00;
  position: absolute;
  bottom: 20px;
  left: 30px;
}

@media screen and (max-width: 350px) {
  .bag .left p {
    font-size: 12px;
    margin-top: -10px;
  }
  .bag .left {
    width: 80px;
  }
  .bag .left span {
    margin-top: -10px;
    position: relative;
  }
}

@media screen and (min-width:351px) and (max-width: 375px) {
  .bag .left p {
    font-size: 14px;
  }
  .bag .left {
    width: 120px;
  }
  .bag .left span {
    margin-top: -5px;
    position: relative;
  }
}

</style>
