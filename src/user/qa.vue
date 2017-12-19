<template>
  <div class="bag">
    <loading v-show="loading"></loading>
    <ul>
      <div v-for="(i,index) in list">
        <h3>{{index+1}}.{{i.q}}</h3>
        <li>
          {{i.a}}
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      box: false,
      list: [{
          q: '如何获得积分？',
          a: '漫展现场共计30个任务可供玩家选择，玩家通过任务即可获得积分。',
        },
        {
          q: '如何完成任务？',
          a: '在游戏端主界面点击探索按钮进入世界地图，世界地图中的钻石与角斗场既是任务点，点击你选择的任务点查阅具体任务规则，并结合地图在现场找到任务NPC进行任务的完成，完成后将任务界面的二维码交于NPC扫描进行加分。',
        },
        {
          q: '积分能干什么？',
          a: '所有玩家的积分将会进行排名并显示在排行榜上，红蓝双方排行榜的前三名将会获得奖励。积分还能够进行转盘抽奖，转盘分为积分抽取积分，积分抽取奖品。积分最主要的用途是进行奖励兑换，玩家可前往兑换界面查阅可兑换奖励与积分需求。',
        },
        {
          q: '如何兑换奖励？',
          a: '红蓝排行榜前三名的玩家的兑奖时间为11月5日下午16点整于服务台兑换奖品，11月4日当日的前三名玩家于当日前往服务台登记信息，次日工作人员将会与您联系兑奖。通过转盘与积分兑换获得的奖励将会获得一张兑换券在自己背包中，凭借该兑换券前往组委会进行兑奖。',
        },
        {
          q: '角斗场任务会扣分么？',
          a: '会的，角斗场任务是红蓝两名决斗者赌上10积分进行比拼，赢者会夺取败者积分。当积分不足时是无法进行角斗场任务的。',
        },
        {
          q: '任务失败还能再次挑战么？',
          a: '可以的，只有当任务完成后进行加分后才会对您关闭该任务点。',
        },
        {
          q: '如果我将积分进行兑换或转盘消耗会导致我的排行榜名字下降么？',
          a: '不会，排行榜的个人积分是已得积分数量，不会因为主动消耗而减少降低个人排名。',
        },
        {
          q: '排行榜排名的节止判定时间是什么时候？',
          a: '排行榜节止时间为5日下午16时，时间到时工作人员会截取该时间的后台排行信息，一切信息以官方为准，超时后上榜是无效的。',
        },
        {
          q: '我两天都参加漫展可以玩两遍所有任务么？',
          a: '不可以，如果两日都参加活动，第二日只能补充完成第一日的未完成的任务。',
        },
        {
          q: '奖品有数量限制么？',
          a: '有限制的，特等奖全场共20个，一等奖20个，二等奖100个，所有奖品散布在转盘与兑换中，只能说是先到先得了。奖品剩余信息以组委会实际数据为准。',
        },
        {
          q: '我如果有任务实在不擅长却想要完成任务怎么办？',
          a: '当然是找基友代打啦！',
        },
        {
          q: '如果我还有问题没有得到解决怎么办？',
          a: '去组委会咨询工作人员解答疑惑。',
        },
      ],
      imgurl: '',
      title: '',
      loading: false,
    }
  },

  methods: {

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
  text-indent: 2em;
  box-sizing: border-box;
  padding: 10px;
  color: #0f92c1;
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
}

.bag .right img {
  margin: 35px 0 0 12px;
  width: 76px;
  height: 28px;
}
.bag h3{
  line-height: 30px;
}

</style>
