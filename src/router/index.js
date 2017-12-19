import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//user
const index = r => require.ensure([], () => r(require('../components/welcome')), 'index') //用户加载页面
const role = r => require.ensure([], () => r(require('../user/role')), 'role') // 用户选择角色
const vs = r => require.ensure([], () => r(require('../user/vs')), 'vs') // 用户选择团队
const userinfo = r => require.ensure([], () => r(require('../user/userinfo')), 'userinfo') //用户中心
const map = r => require.ensure([], () => r(require('../user/map/index.vue')), 'map') //地图
const raffle = r => require.ensure([], () => r(require('../user/raffle/index.vue')), 'raffle') //抽奖
const integral = r => require.ensure([], () => r(require('../user/integral.vue')), 'integral') //积分
const bag = r => require.ensure([], () => r(require('../user/bag.vue')), 'bag') //背包
const ranking = r => require.ensure([], () => r(require('../user/ranking.vue')), 'ranking') //排行榜
const error = r => require.ensure([], () => r(require('../components/404/404.vue')), 'error') //404页面
const arena = r => require.ensure([], () => r(require('../user/arena.vue')), 'arena') //角斗场
const reward = r => require.ensure([], () => r(require('../user/reward.vue')), 'reward') //兑换奖励
const qa = r => require.ensure([], () => r(require('../user/qa.vue')), 'qa') //qa页面


//NPC
const numstall = r => require.ensure([], () => r(require('../npc/numstall')), 'numstall') //NPC选择档位加分
const numput = r => require.ensure([], () => r(require('../npc/numput')), 'numput') //NPC自定义加分
const login = r => require.ensure([], () => r(require('../npc/Login')), 'Login') //NPC登录
const npcinfo = r => require.ensure([], () => r(require('../npc/npcinfo')), 'npcinfo') //NPC菜单
const pk = r => require.ensure([], () => r(require('../npc/pk')), 'pk') //NPC开启pk
const exchange = r => require.ensure([], () => r(require('../npc/exchange')), 'exchange') //NPC奖品兑换
export default new Router({
  routes: [
    //欢迎页面
    {
      path: '',
      // redirect: '/userinfo'
      component:index,
    },
    // 首页
    {
      path: '/index',
      component: index,
    },
    //npc 登录
    {
      path: '/login',
      component: login
    },
    // 用户中心
    {
      path:'/userinfo',
      component:userinfo,
    },
    // 选择角色
    {
      path: '/role',
      component: role,
    },
    // 选择阵容
    {
      path:'/vs',
      component:vs,
    },
    // 打开地图
    {
      path:'/map',
      component:map
    },
    // FQA
    // 礼品列表(背包)
    {
      path:'/bag',
      component:bag,
    },
    // 积分记录
    {
      path:'/integral',
      component:integral,
    },
    // 排行榜
    // 转盘
    {
      path:'/raffle',
      component:raffle,
    },
    // PK
    {
      path: '/pk',
      component: pk
    },
    // 档位分发积分
    {
      path: '/numstall',
      component: numstall
    },
    // 自定义分发积分
    {
      path: '/numput',
      component: numput
    },
    // NPC界面 
    {
      path: '/npc',
      component: npcinfo
    },
    // 404 
    {
      path: '*' ,
      component: error
    },
    // 排行榜 
    {
      path: '/ranking' ,
      component: ranking
    },
    //奖品兑换
    {
      path:'/exchange',
      component:exchange,
    },
    //角斗场
    {
      path:'/arena',
      component:arena,
    },
    //兑换奖励
    {
      path:'/reward',
      component:reward,
    },
    //qa页面
    {
      path:'/qa',
      component:qa,
    }
  ]
})
