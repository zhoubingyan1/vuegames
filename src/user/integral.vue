<template>
  <div id="int" style="text-align: center;background-color:#fff;height:100%;">
    <loading v-show="loading"></loading>
    <div class="top">
      <div class="top-main">
        <span class="top-up">{{this.$store.state.integral}}</span>
        <span class="top-down">我的当前积分</span>
      </div>
      <!-- <div class="close"><a></a></div> -->
    </div>
    <div class="top-below">
      <span>我的积分历史</span>
    </div>
    <ul>
      <li v-show="!list">
        <div>暂无数据</div>
      </li>
      <li v-for="i in list">
        <span>{{i.intro}}</span>
        <p :class="i.integral>0? 'jia' : 'jian'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{i.integral}}</p>
      </li>
      <li v-if="more">
        <div>向上拖动加载更多>></div>
      </li>
      <li v-if="!more && list ">
        <div>没有更多数据啦</div>
      </li>
    </ul>
    <router-link class="button" to="/raffle">使用积分</router-link>
  </div>
</template>
<script>
import Toast from '@/components/toast/toast.js'
import API from '../api/API'
const api = new API();
export default {
  //挂载之前
  created() {
    this.loading = true;
    api.integralLog({ 'uid': this.$store.state.uid, 'page': this.page }).then((rs) => {
      this.loading = false;
      if (rs.data.error == 0) {
        this.page += 1;
        this.list = rs.data.data;
      } else {
        this.more = false;
      }
    });
  },
  //挂载完成 
  updated() {
    let startY = ''; //触摸开始Y点
    let box = document.querySelector('body')
    box.addEventListener('touchstart', function(ev) {
      var touch = ev.targetTouches[0];
      startY = touch.pageY;
    }, false)
    box.addEventListener('touchmove', function(ev) {

    }, false)
    box.addEventListener('touchend', (ev) => {
      let view_height = document.documentElement.scrollTop == 0 ? document.body.clientHeight : document.documentElement.clientHeight; // 屏幕高度
      let view_top = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop; //屏幕上边距
      let page_height = document.documentElement.scrollTop == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight; //页面总高度
      let isSub=true;
      var touch = ev.changedTouches[0];
      let h = view_top + view_height;
      //判断页面是否到底
      if (view_height + view_top >= page_height) {
        //判断是否向上拉升了100px
        if (startY - 100 >= touch.pageY) {
          //防止恶意刷新
          if (this.more && isSub) {
            isSub=false;
            api.integralLog({ 'uid': this.$store.state.uid, 'page': this.page }).then((rs) => {
              if (rs.data.error == 0) {
                this.page += 1;
                this.list = this.list.concat(rs.data.data);
                this.loading = false;
              } else {
                this.more = false;
              }
              isSub=true;
            });
          }
        }
      }
    }, false)
  },
  data() {
    return {
      list: '',
      loading: false, //是否显示加载动画
      more: true,
      page: 0,
    }
  },
  methods: {}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  width: 100%;
  height: 240px;
  background-color: rgb(255, 212, 62);
}

.top .top-main {
  height: 160px;
  width: 140px;
  margin: 0 auto;
  top: 60px;
  font-weight: 700;
  position: relative;
  text-align: center;
}

.top .top-up {
  display: inline-block;
  width: 116px;
  height: 116px;
  border: 4px solid rgb(255, 235, 159);
  border-radius: 50%;
  background-color: #fff;
  line-height: 116px;
  font-size: 28px;
}

.top .top-down {
  display: inline-block;
  line-height: 40px;
  font-size: 20px;
}

.top .close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.top a {
  display: inline-block;
  width: 20px;
  height: 2px;
  background: #fff;
  line-height: 0;
  font-size: 0;
  vertical-align: middle;
  -webkit-transform: rotate(50deg);
}

.top a:after {
  content: '/';
  display: block;
  width: 20px;
  height: 2px;
  background: #fff;
  -webkit-transform: rotate(-100deg);
}

.top-below {
  width: 100%;
  height: 45px;
  background-color: rgb(242, 242, 242);
}

.top-below span {
  line-height: 45px;
  color: rgb(152, 151, 151);
  margin-left: 20px;
  float: left;
}

li {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgb(242, 242, 242);
}

ul {
  font-weight: 500;
  font-size: 18px;
}

li span {
  display: inline-block;
  line-height: 60px;
  margin-left: 20px;
  float: left;
}

li p {
  display: inline-block;
  line-height: 60px;
  width: 100px;
  margin-right: 20px;
  float: right;
}

li .jia {
  background: url(../assets/jia.png) no-repeat 0 10px;
  color: rgb(76, 182, 0);
}

li .jian {
  background: url(../assets/jian.png) no-repeat 0 10px;
  color: rgb(255, 74, 5);
}

.button {
  margin: 0 auto;
  margin-top: 50px;
  width: 90%;
  line-height: 40px;
  background-color: rgb(255, 212, 62);
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
  margin-bottom: 30px;
}

ul li div {
  font-size: 14px;
  color: #999;
  line-height: 60px;
}
</style>
