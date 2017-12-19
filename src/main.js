// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import loading from './components/loading'
Vue.config.productionTip = false

Vue.component('loading', loading) //全局注册-加载组件
//访问控制
router.beforeEach((to, from, next) => {
  let isRouter = true; // 是否走路由访问控制
  //进入角色选择不用登录
  if (to.path == '/index' && from.path == '/') {
    isRouter = false;
    next();
  }
  if (to.path == '/login' && from.path == '/') {
    isRouter = false;
    next();
  }
  if (to.path == '/userinfo' && from.path == '/index') {
    isRouter = false;
    next();
  }
  //判断是否是NPC登录
  if (to.path == '/npc' && !store.state.isNpc && from.path!='/') {
    isRouter = false;
    next({
      path:'login',
    });
  }
  if (isRouter) {
    if (store.state.logState == false) { // 登录信息为空
      //刷新和第一次登录走这里
      let hls_localhost = localStorage.getItem('hls_localhost') ? JSON.parse(localStorage.getItem('hls_localhost')) : ''; //判断本地缓存是否为空，不为空则转为对象
      if (hls_localhost.logState == true) { //判断缓存对象是否还处于登录状态
        for (let i in hls_localhost) { //读取本地缓存放入vuex
          //去除不需要的缓存变量
          if (i != 'container' && i != 'click' && i != 'level' && i != 'type') {
            store.state[i] = hls_localhost[i];
          }
        }
        next();
      } else if (to.path == '/login') {
        //进入登录不需要登录
        next();
      } else if (to.path == '/index') {
        //进入角色不需要登录
        next();
      } else if (to.path == '/error') {
        //防止死循环
        next();
      } else {
        //其他都跳错
        next({
          path: '/error',
          // query: { redirect: to.path} // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    } else {
      //正常跳转
      next();
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
