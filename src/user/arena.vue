<template>
  <div style="height:100%">
  <div class="bag" v-if="!is_show">
    <ul>
      <li v-for="(i,index) in list">
        <img :src="require('../assets/pk.png')">
        <div class="left">
          <p>{{i.name}}</p>
          <span>活动规则请见详情</span>
        </div>
        <div class="right">
          <img src="../assets/button2.png" @click="show(index)">
        </div>
      </li>
    </ul>
    <div class="default">
      <p>
        <router-link to="/userinfo">用户中心</router-link>
      </p>
    </div>
    
  </div>
  <task v-if="is_show" :name="name" :text="text" :integral="integral" @close="close" ></task>
  </div>
</template>
<script>
import Toast from '@/components/toast/toast.js'
import task from '@/components/task'
import API from '../api/API'
const api = new API();
export default {
  created() {

  },
  data() {
    return {
      is_show:false,
      name:'',//游戏名称
      text:'',//游戏规则
      integral:'',//游戏积分
      list: [{
          id:0,
          name: '抽鬼牌',
          content: '两位参与者进行一场扑克牌游戏，总共19张扑克牌，18张为9组牌，1张鬼牌，每凑齐一组，则可以丢弃以减少手牌数量。双方每轮每次互相抽对手一张牌，手牌率先清空者任务成功。每一次排队挑战只有1次机会，如挑战失败，重新进行排队。胜者赢取败者10积分。',
          integral: 10,
        },
        {
          id: 1,
          name: '鲨鱼牙',
          content: '两位玩家参与，由猜拳决定先后手，依次选择牙齿按下，触发装置被咬的玩家则被判负，需离开队伍，重新进行排队；另一位则挑战成功，胜者赢取败者10积分。',
          integral: 10,
        },
        {
          id: 2,
          name: '人名抢答',
          content: '两名玩家进行动漫角色抢答比赛，两人面前有一按铃，NPC出示一张动漫角色图片，按铃抢答角色全名（昵称或绰号无效），回答正确即胜利，抢答错误即直接失败，若10s后双方均无按铃则重选卡牌。游戏实行三局两胜制，胜者赢取败者10积分',
          integral: 10,
        },
        {
          id: 3,
          name: '21点',
          content: '两位参与者进行一场21点的扑克牌玩法对决，由工作人员发牌，获得胜利之后，挑战成功，获得积分。任务全程由工作人员判定，胜者赢取败者10积分。',
          integral: 10,
        },
        {
          id: 4,
          name: '步步为营',
          content: '又名围追堵截，需2人游戏。每位玩家拿取10个木块和1个本方棋子两位玩家面对面坐，本方棋子摆在本方棋盘最底部中央处，双方轮流行动，行动时可选择移动本方棋子左右或上下一步（不可斜走），或放置1个木块至棋盘上，双方的棋子在移动时均不可以直接越过木块。放置木块时，不允许把路完全塞死，至少留一条活路让对方棋子通过。谁最先到达棋盘对方底部即为赢家。胜者赢取败者10积分。',
          integral: 10,
        },
        {
          id: 5,
          name: '战线',
          content: '两名参与者进行战线对决，一共五列战线，双方初始拥有一张手牌，摸一张需要放置一张手牌在己方战线内，每条战线最多放置三张牌，当五列战线双方全部摆满后每列对应比大小，同花顺＞炸弹＞同花＞顺子＞对子，胜利战线多的玩家获得胜利，赢取败者10积分。',
          integral: 10,
        },
        {
          id: 6,
          name: '失落的城市',
          content: ' 随机由一名玩家开始游戏，然后轮流进行。轮到你的回合，你必须依次完成出牌和摸牌两个动作：1、 出牌数字牌放置一定要按照从小到大的顺序！即如果你第一张放了9，那你以后最多就只能放一张10了！玩家分别在游戏版两边各自探险，互不影响。弃牌：当你不想探险时（无一定把握可以规避风险），你可以选择弃牌，把你所弃的一张牌正面公开放在游戏板对应的颜色区域上。所以你的弃牌是可以被你或你的对手重新使用的。2、 抽牌摸一张新牌，可以是游戏板上各个区域公开显示的最上面的一张，也可以是从摸牌堆中抽取最上面的一张。当所有牌被摸完后玩家将不再摸牌，跳过这个动作。游戏结束：当所有牌摸光且双方剩下的牌都无法使用时，游戏结束，计算各方的得分。',
          integral: 10,
        },
        {
          id: 7,
          name: '层层叠叠',
          content: '两名对决者需按下图方式叠起拥有六种颜色的积木，猜拳决定先后，投一次骰子，根据得到的骰子颜色需从积木柱中抽取一根同样颜色的积木，使积木柱倒塌或率先无对应颜色积木可抽取的一方即失败。胜者赢取败者10分',
          integral: 10,
        },
        {
          id: 8,
          name: '五子棋',
          content: '两名玩家进行五子棋对决，胜者赢取败者10积分',
          integral: 10,
        },
        {
          id: 9,
          name: '24点',
          content: '两名玩家进行一场24点游戏对决，两人面前有一按铃，率先算出24点的玩家拍铃回答，回答正确即胜利回答错误即对方胜利，若持续20S无人按铃则重新发牌。游戏为三局两胜制，胜者赢取败者10积分。',
          integral: 10,
        },
      ],

    }
  },
  components: {
    task
  },
  methods: {
    show(e){
      this.name=this.list[e].name;
      this.text=this.list[e].content;
      this.integral=this.list[e].integral;
      this.is_show=true;
    },
    close(){
      this.is_show=false;
    }
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
}

.bag .right img {
  margin: 35px 0 0 12px;
  width: 76px;
  height: 28px;
}

.default {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom:35px;
  margin-top:35px;
}

.default a {
  margin-top: 15px;
  display: block;
  width: 100px;
  height: 35px;
  background-color: #ff9800;
  line-height: 35px;
  color: #fff;
  border-radius: 5px;
  margin-left: calc(50% - 50px);
}

</style>
