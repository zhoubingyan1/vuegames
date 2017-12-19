<template>
  <div>
    <svg ref="svg" :class="{hide:is_show}"></svg>
    <task :name="name" v-if="is_show" :text="text" :integral="integral" @close="close"></task>
  </div>
</template>
<script>
import * as d3 from 'd3';
import Toast from '@/components/toast/toast.js'
import task from '@/components/task'
import API from '@/api/API'
const api = new API();
export default {
  components: { task },
  props: {
    red: {
      type: Array,
      default: function() {
        return [
          { id: 10, x: 255, y: -25, state: 1, type: 1, width: 22, height: 25 },
          { id: 2, x: 267, y: 8, state: 1, type: 1, width: 22, height: 25 },
          { id: 1, x: 305, y: 8, state: 1, type: 1, width: 22, height: 25 },
          { id: 3, x: 345, y: 5, state: 1, type: 1, width: 22, height: 25 },
          { id: 4, x: 267, y: 45, state: 1, type: 1, width: 22, height: 25 },
          { id: 5, x: 302, y: 43, state: 1, type: 1, width: 22, height: 25 },
          { id: 6, x: 336, y: 43, state: 1, type: 1, width: 22, height: 25 },
          { id: 7, x: 366, y: 43, state: 1, type: 1, width: 22, height: 25 },
          { id: 8, x: 260, y: 125, state: 1, type: 1, width: 22, height: 25 },
          { id: 9, x: 312, y: 135, state: 1, type: 1, width: 22, height: 25 }
        ]
      }
    },
    blue: {
      type: Array,
      default: function() {
        return [
          { id: 20, x: 255, y: -25, state: 1, type: 1, width: 22, height: 25 },
          { id: 16, x: 267, y: 8, state: 1, type: 1, width: 22, height: 25 },
          { id: 11, x: 305, y: 8, state: 1, type: 1, width: 22, height: 25 },
          { id: 12, x: 345, y: 5, state: 1, type: 1, width: 22, height: 25 },
          { id: 13, x: 267, y: 45, state: 1, type: 1, width: 22, height: 25 },
          { id: 14, x: 302, y: 43, state: 1, type: 1, width: 22, height: 25 },
          { id: 15, x: 336, y: 43, state: 1, type: 1, width: 22, height: 25 },
          { id: 17, x: 366, y: 43, state: 1, type: 1, width: 22, height: 25 },
          { id: 18, x: 260, y: 125, state: 1, type: 1, width: 22, height: 25 },
          { id: 19, x: 312, y: 135, state: 1, type: 1, width: 22, height: 25 }
        ]
      }
    },
    public: {
      type: Array,
      default: function() {
        return [
          { id: 31, x: 272, y: 70, state: 1, type: 1, width: 22, height: 25 },
          { id: 32, x: 293, y: 70, state: 1, type: 1, width: 22, height: 25 },
          { id: 33, x: 313, y: 71, state: 1, type: 1, width: 22, height: 25 },
          { id: 34, x: 328, y: 73, state: 1, type: 1, width: 22, height: 25 },
          { id: 35, x: 347, y: 75, state: 1, type: 1, width: 22, height: 25 },
          { id: 36, x: 275, y: 95, state: 1, type: 1, width: 22, height: 25 },
          { id: 37, x: 295, y: 95, state: 1, type: 1, width: 22, height: 25 },
          { id: 38, x: 315, y: 95, state: 1, type: 1, width: 22, height: 25 },
          { id: 39, x: 333, y: 95, state: 1, type: 1, width: 22, height: 25 },
          { id: 40, x: 347, y: 102, state: 1, type: 1, width: 22, height: 25 },
        ]
      }
    },
    pk: {
      type: Array,
      default: function() {
        return [
          { id: 99, x: 277, y: -53, state: 1, type: 1, width: 22, height: 25 },
        ]
      }
    },
  },
  created: function() {
    //页面加载完毕执行
    // 链接socket服务器
    // var socket = io('http://hls.xuehuiwan.cn:2120');
    // // socket连接后以openid登录
    // socket.on('connect', () => {
    //   socket.emit('login', this.$store.state.openid);
    // });
    // // 后端推送来消息时
    // socket.on('new_msg', (msg) => {
    //   if (msg == 'yes') {
    //     this.is_show = false;
    //     api.update({ 'uid': this.$store.state.uid }).then((rs) => {
    //       //更新积分
    //       this.$store.dispatch('upine', rs.data.data);
    //     });
    //     Toast({
    //       message: "扫描成功",
    //       position: 'top',
    //       duration: 3000
    //     });
    //   }
    // });

  },
  data() {
    return {
      svg: {},
      map: {},
      width: 0,
      height: 0,
      points: {},
      is_show: false,
      name: '', //游戏名称
      text: '', //游戏说明
      integral: '', //游戏积分
      game_list: [{
          id: 1,
          name: '猜硬币',
          content: '参与玩家背对工作人员，工作人员将一枚硬币捏在其中一只手里，参与者须猜出捏硬币位于哪一只手，猜对，则挑战完成，获得积分。每一次挑战有两次机会，如挑战失败，则需要重新进行排队。',
          integral: 10,
        },
        {
          id: 2,
          name: '背部写字',
          content: '工作人员在参与者背上用手指写一个字，参与者需要猜出是什么字，由工作人员判定是否正确，每一次挑战都有两次机会，第一次失败后，工作人员会重写第一次的那个字，两次机会都失败了，则需要重新进行排队，只需答对一次即可获得积分。',
          integral: 10,
        },
        {
          id: 3,
          name: '猜拳',
          content: '参与者与工作人员进行石头剪刀布游戏，获得胜利后则完成任务，获得积分；每一次挑战有两次次机会，两次机会都失败了，就需要重新进行排队。',
          integral: 10,
        },
        {
          id: 4,
          name: '竖硬币',
          content: '参与者需要在30秒内，将3个一元硬币立置于桌面，由工作人员判定。判定成功，则任务完成，获得积分；每一次挑战只有一次机会，如挑战失败，则需要重新进行排队。',
          integral: 10,
        },
        {
          id: 5,
          name: '正话反说',
          content: '参与者抽取工作人员准备好的词句库，交给工作人员，由工作人员念出后参与者需要快速准确地倒置说出这句话，如：“喜极而泣”，玩家需念出“泣而极喜”，说错或卡顿过久者挑战失败，每一次挑战只有一次机会，失败需重新排队，正确者挑战成功并获得积分。',
          integral: 10,
        },
        {
          id: 6,
          name: '蒙眼转圈',
          content: '参与者带上眼罩，在无借力且蒙眼的情况下原地转5圈，然后需要指出开始时面对的方向，由工作人员判定，判定方向正确成功，则任务完成；每一次行挑战只有一次机会，如挑战失败，则需要重新进行排队。<p>PS：在剑侠世界2展台领取游历卡参与游戏试玩，还可另外获得精美游戏周边呦</p>”',
          integral: 10,
        },
        {
          id: 7,
          name: '颠球掷篓',
          content: '参与者手持乒乓拍，颠球10次后，将乒乓球打入前方的纸篓内则视为成功。中途掉球或最终未能打入纸篓内则视为失败，全程由工作人员进行判定，判定成功后，挑战完成，获得积分。每一次挑战只有一次机会，如挑战失败，则需要重新进行排队。',
          integral: 10,
        },
        {
          id: 8,
          name: '限时跳绳',
          content: '参与者需要在15秒内跳绳40下，在规定时间内完成30下则挑战成功获得积分。过程中出现失误而停顿则视为挑战失败。每一次挑战只有一次挑战机会，如挑战失败，则需要重新进行排队。<p>PS:次元集市位于马鞍山路与南一环路交叉口，金种子体育馆斜对面新都汇购物广场二楼。次元集市是集摄影棚，周边，桌游，交友，二手交易为一体的动漫综合体。欢迎各位二次元同好前来哦！</p>',
          integral: 10,
        },
        {
          id: 9,
          name: '中国地图速拼',
          content: '参与者在规定时间150秒内将中国地图完整拼好则判定成功，获得积分。',
          integral: 10,
        },
        {
          id: 10,
          name: '记忆翻牌',
          content: '参与者需要成功翻开背过去的卡牌。将动漫角色卡牌两张一样的为一组共10组，组成4*5宫格，背面朝上，共十五次翻牌机会，每次可以翻2张牌，若为相同则算成功，失败则将两张重新倒置，成功翻开所有卡牌则判定挑战成功，获得积分。一次挑战只有一次机会，失败需重新排队。',
          integral: 10,
        },
        {
          id: 11,
          name: '猜硬币',
          content: '1.工作人员将旋转一枚硬币，参与者须猜硬币正反，字位正面花为反面，所猜答案正确，则挑战完成，获得任务戳。每一次行挑战只有两次机会，如挑战失败，则需要离开队列，重新进行排队。',
          integral: 10,
        },
        {
          id: 12,
          name: '扑克牌比大小',
          content: '参与者与工作人员进行游戏，从13张扑克牌中抽取比大小（扑克牌大小顺序依次为2，3，4…，，A，无大小王），胜利则获得任积分。每一次挑战只有一次挑战机会，如挑战失败，则需要重新进行排队。',
          integral: 10,
        },
        {
          id: 13,
          name: '垒硬币',
          content: '参与者在50秒内，将30枚硬币（硬币为标准1毛硬币）垒高。若中途倒塌则为挑战失败。',
        },
        {
          id: 14,
          name: '逆转反应',
          content: '参与者与工作人员面对面互动，游戏开始后，工作人员会提示3 2 1 ，后会发出随机指令“右手向下头往左看”参与者要做出相反方向的动作，即“左手向上头往右看”。如果转错或转的太慢，则挑战失败；由工作人员进行判定，判定成功后，挑战完成，获得积分。每一次挑战只有一次机会，如挑战失败，则需要重新进行排队。',
          integral: 10,
        },
        {
          id: 15,
          name: '投壶',
          content: '参与者需手持筷子站立，瓶子放置在地上，筷子需要距离瓶口高度一米处，松开筷子，筷子如能成功掉入瓶子，则挑战成功获得积分。每一次挑战只有一次挑战机会，如挑战失败，则需要重新进行排队。<p>PS：在剑侠世界2展台领取游历卡参与游戏试玩，还可另外获得精美游戏周边呦</p>”',
          integral: 10,
        },
        {
          id: 16,
          name: '掷水瓶',
          content: '参与者站在线后，需要将手中矿泉水瓶投掷至对面的塑料桶中（男生两次机会，女生三次机会）至少成功掷入桶中一次即挑战成功，获得积分，如挑战失败，则需要重新进行排队。',
          integral: 10,
        },
        {
          id: 17,
          name: '指压板跳绳',
          content: '参与者在指压板上跳绳，15秒内跳绳15个，则挑战成功获得积分。中途失误停顿或时间内未完成个数则挑战失败每一次挑战只有一次挑战机会，如挑战失败，则需要重新进行排队。',
          integral: 10,
        },
        {
          id: 18,
          name: '滚铁环',
          content: '参与者在规定的时间内需要将将铁环滚至终点，由工作人员判定。判定成功，则任务完成，获得积分。只有一次挑战机会，如挑战失败，则需要重新进行排队。<p>PS:次元集市位于马鞍山路与南一环路交叉口，金种子体育馆斜对面新都汇购物广场二楼。次元集市是集摄影棚，周边，桌游，交友，二手交易为一体的动漫综合体。欢迎各位二次元同好前来哦！</p>',
          integral: 10,
        },
        {
          id: 19,
          name: '连珠',
          content: '参与者使用如下道具，工作人员将两种颜色的珠珠打乱，在规定时间X秒内通过中间的方块移动小珠（一次移动4粒），恢复成一边一种颜色则为挑战成功，获得积分。规定时间内未能完成则挑战失败，一次挑战仅有一次机会，失败需重新排队。',
          integral: 10,
        },
        {
          id: 20,
          name: '进阶猜拳',
          content: '参与者与工作人员进行石头剪刀布游戏，双手和双脚同时进行，四个对局中起码获得其中两个（或多于两个）胜利后则完成任务，获得积分；每一次挑战都有两次机会，两次机会都失败了，则需要重新进行排队。',
          integral: 10,
        },
        {
          id: 21,
          name: '抽鬼牌',
          content: '两位参与者进行一场扑克牌游戏，总共19张扑克牌，18张为9组牌，1张鬼牌，每凑齐一组，则可以丢弃以减少手牌数量。双方每轮每次互相抽对手一张牌，手牌率先清空者任务成功。每一次排队挑战只有1次机会，如挑战失败，重新进行排队。胜者赢取败者10积分。',
          integral: 10,
        },
        {
          id: 22,
          name: '鲨鱼牙',
          content: '两位玩家参与，由猜拳决定先后手，依次选择牙齿按下，触发装置被咬的玩家则被判负，需离开队伍，重新进行排队；另一位则挑战成功，胜者赢取败者10积分。',
          integral: 10,
        },
        {
          id: 23,
          name: '人名抢答',
          content: '两名玩家进行动漫角色抢答比赛，两人面前有一按铃，NPC出示一张动漫角色图片，按铃抢答角色全名（昵称或绰号无效），回答正确即胜利，抢答错误即直接失败，若10s后双方均无按铃则重选卡牌。游戏实行三局两胜制，胜者赢取败者10积分',
          integral: 10,
        },
        {
          id: 24,
          name: '21点',
          content: '两位参与者进行一场21点的扑克牌玩法对决，由工作人员发牌，获得胜利之后，挑战成功，获得积分。任务全程由工作人员判定，胜者赢取败者10积分。',
          integral: 10,
        },
        {
          id: 25,
          name: '步步为营',
          content: '又名围追堵截，需2人游戏。每位玩家拿取10个木块和1个本方棋子两位玩家面对面坐，本方棋子摆在本方棋盘最底部中央处，双方轮流行动，行动时可选择移动本方棋子左右或上下一步（不可斜走），或放置1个木块至棋盘上，双方的棋子在移动时均不可以直接越过木块。放置木块时，不允许把路完全塞死，至少留一条活路让对方棋子通过。谁最先到达棋盘对方底部即为赢家。胜者赢取败者10积分。',
          integral: 10,
        },
        {
          id: 26,
          name: '战线',
          content: '两名参与者进行战线对决，一共五列战线，双方初始拥有一张手牌，摸一张需要放置一张手牌在己方战线内，每条战线最多放置三张牌，当五列战线双方全部摆满后每列对应比大小，同花顺＞炸弹＞同花＞顺子＞对子，胜利战线多的玩家获得胜利，赢取败者10积分。',
          integral: 10,
        },
        {
          id: 27,
          name: '失落的城市',
          content: ' 随机由一名玩家开始游戏，然后轮流进行。轮到你的回合，你必须依次完成出牌和摸牌两个动作：1、 出牌数字牌放置一定要按照从小到大的顺序！即如果你第一张放了9，那你以后最多就只能放一张10了！玩家分别在游戏版两边各自探险，互不影响。弃牌：当你不想探险时（无一定把握可以规避风险），你可以选择弃牌，把你所弃的一张牌正面公开放在游戏板对应的颜色区域上。所以你的弃牌是可以被你或你的对手重新使用的。2、 抽牌摸一张新牌，可以是游戏板上各个区域公开显示的最上面的一张，也可以是从摸牌堆中抽取最上面的一张。当所有牌被摸完后玩家将不再摸牌，跳过这个动作。游戏结束：当所有牌摸光且双方剩下的牌都无法使用时，游戏结束，计算各方的得分。',
          integral: 10,
        },
        {
          id: 28,
          name: '层层叠叠',
          content: '两名对决者需按下图方式叠起拥有六种颜色的积木，猜拳决定先后，投一次骰子，根据得到的骰子颜色需从积木柱中抽取一根同样颜色的积木，使积木柱倒塌或率先无对应颜色积木可抽取的一方即失败。胜者赢取败者10分',
          integral: 10,
        },
        {
          id: 29,
          name: '五子棋',
          content: '两名玩家进行五子棋对决，胜者赢取败者10积分',
          integral: 10,
        },
        {
          id: 30,
          name: '24点',
          content: '两名玩家进行一场24点游戏对决，两人面前有一按铃，率先算出24点的玩家拍铃回答，回答正确即胜利回答错误即对方胜利，若持续20S无人按铃则重新发牌。游戏为三局两胜制，胜者赢取败者10积分。',
          integral: 10,
        },
        {
          id: 31,
          name: '智慧钥匙',
          content: '参与者将钥匙穿进钥匙圈或取出钥匙圈，则判定成功，不可使用蛮力或其他取巧行为，根据用时长短获得积分。',
          integral: '5-25',
        },
        {
          id: 32,
          name: '平衡球',
          content: '参与者使用道具进行挑战。把迷宫平放，钢球放在“开始”的位置，通过倾斜两个平台（使用侧面旋钮控制），引导钢球通过迷宫到达完成位置，沿途有标记踪迹得分，如果钢球落入陷阱，陷阱的数值就是你的得分一次挑战仅一次机会，根据得分获得积分',
          integral: '5-25',
        },
        {
          id: 33,
          name: '夹棍球',
          content: '参与者使用道具进行棍夹球挑战，通过开合棍子的角度使球向上滚动，根据小球落入的格子判定得分。',
          integral: '5-25',
        },
        {
          id: 34,
          name: '拼图',
          content: '参与者使用拼图道具，根据用时获得积分。',
          integral: '5-25',
        },
        {
          id: 35,
          name: '数独',
          content: '参与者进行数独游戏，根据用时获得积分。',
          integral: '5-25',
        },
        {
          id: 36,
          name: '平板支撑',
          content: '参与者在瑜伽垫上进行平板支撑，根据坚持时间获得积分。',
          integral: '5-25',
        },
        {
          id: 37,
          name: '一分钟跳绳',
          content: '参与者进行计时跳绳，根据一分钟内完成次数获得积分，中途停顿即次数清零。',
          integral: '5-25',
        },
        {
          id: 38,
          name: '三阶魔方速拼',
          content: '参与者恢复整个三阶魔方，根据用时长短获得积分。',
          integral: '5-25',
        },
        {
          id: 39,
          name: '听歌识曲',
          content: '参与者试听由NPC随机播放的二次元音乐，音乐开始后即可抢答，根据抢答时间长短获得积分',
          integral: '5-25',
        },
        {
          id: 40,
          name: '俄罗斯方块战士',
          content: '参与者使用游戏机进行最困难难度俄罗斯方块游戏，根据坚持时间长短获得积分',
          integral: '5-25',
        }
      ],
    }
  },
  mounted() {
    this.toMap();
  },
  methods: {
    close() {
      this.is_show = false;
    },
    toMap() {
      this.svg = d3.select("svg");
      this.map = this.svg.append("g");
      this.width = +this.$refs.svg.getBoundingClientRect().width; //屏幕宽度
      this.height = +this.$refs.svg.getBoundingClientRect().height; //屏幕高度
      //设置背景宽度,高度
      const bg_width = 650;
      const bg_height = 390;
      this.map.append("image")
        .attr("xlink:href", require('@/assets/map.png'))
        .attr("x", "0")
        .attr("y", "0")
        .attr("width", bg_width)
        .attr("height", bg_height);

      if (this.$store.state.team == 1) {
        this.task(this.red, 100, 110, 10, 10, 'red');
      } else {
        this.task(this.blue, 100, 110, 10, 10, 'blue');
      }
      this.task(this.public, 100, 110, 10, 10, 'public');
      this.task(this.pk, 100, 110, 36, 36, 'pk');
      this.svg
        .call(d3.zoom()
          .scaleExtent([1, 10])
          .on("zoom", this.zoomed));
    },
    /**
     * data 定点数据库
     * offset_x 绝对值X
     * offset_y 绝对值Y
     * RECT_W 设定宽度
     * RECT_H 设定高度
     */
    task(data, offset_x, offset_y, RECT_W, RECT_H, type) {
      //循环布置一个队伍任务位置点
      data.forEach(function(val) {
        //添加子节点
        const container_ci = this.map.append("g")
          .attr("class", "ci build" + val.type);
        //定位建筑物
        container_ci.attr("class", "task")
          .append("image")
          .attr("xlink:href", require('@/assets/map/' + type + '.png'))
          .attr("x", val.x - val.width / 2 + offset_x)
          .attr("y", val.y - val.height / 2 + offset_y)
          .attr("width", RECT_W)
          .attr("height", RECT_H)
          .on("click", (e) => {
            if (val.id == 99) {
              if (this.$store.state.integral > 10) {
                this.$router.push({ path: '/arena' });
              } else {
                Toast({
                  message: '积分不足',
                  position: 'top',
                  duration: 2000
                });
              }
            } else {
              this.name = this.game_list[val.id - 1].name;
              this.text = this.game_list[val.id - 1].content;
              this.integral = this.game_list[val.id - 1].integral;
              this.is_show = true;
            }
          })
          .on("mouseover", function(e) {
            //console.log("1")
          })
          .on("mouseout", function(e) {
            // console.log("2")
          });
      }, this);
    },
    zoomed() {
      this.map.attr("transform", d3.event.transform);
    }
    //时间操作函数执行
  }
}

</script>
<style scoped>
div {
  width: 100%;
  height: 100%;
}

svg {
  width: 100%;
  height: 100%;
}

.hide {
  display: none;
}

.task span {}

</style>
