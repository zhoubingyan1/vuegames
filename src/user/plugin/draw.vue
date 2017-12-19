<template>
  <table border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td class="lottery-unit lottery-unit-0" v-bind:class="{'active':active[0].isActive,'no_active':!active[0].isActive}">
        <img :src="block[0]">
      </td>
      <td class="lottery-unit lottery-unit-1" v-bind:class="{'active':active[1].isActive,'no_active':!active[1].isActive}">
        <img :src="block[1]">
      </td>
      <td class="lottery-unit lottery-unit-2" v-bind:class="{'active':active[2].isActive,'no_active':!active[2].isActive}">
        <img :src="block[2]">
      </td>
    </tr>
    <tr>
      <td class="lottery-unit lottery-unit-7" v-bind:class="{'active':active[7].isActive,'no_active':!active[7].isActive}">
        <img :src="block[7]">
      </td>
      <td>
        <div class="draw_btn" @click="toDraw">
          <img src="../../assets/draw_btn.png">
        </div>
      </td>
      <td class="lottery-unit lottery-unit-3" v-bind:class="{'active':active[3].isActive,'no_active':!active[3].isActive}">
        <img :src="block[3]">
      </td>
    </tr>
    <tr>
      <td class="lottery-unit lottery-unit-6" v-bind:class="{'active':active[6].isActive,'no_active':!active[6].isActive}">
        <img :src="block[6]">
      </td>
      <td class="lottery-unit lottery-unit-5" v-bind:class="{'active':active[5].isActive,'no_active':!active[5].isActive}">
        <img :src="block[5]">
      </td>
      <td class="lottery-unit lottery-unit-4" v-bind:class="{'active':active[4].isActive,'no_active':!active[4].isActive}">
        <img :src="block[4]">
      </td>
    </tr>
  </table>
</template>
<script>
import Toast from '@/components/toast/toast.js'
import API from '@/api/API'
const api = new API();
//大转盘
export default {
  props: {
    block: {
      type: Array,
      default: []
    }
  },
  created: function() {
    //页面加载完毕执行
  },
  data() {
    return {
      active: [{
        isActive: true,
      }, {
        isActive: false,
      }, {
        isActive: false,
      }, {
        isActive: false,
      }, {
        isActive: false,
      }, {
        isActive: false,
      }, {
        isActive: false,
      }, {
        isActive: false,
      }, {
        isActive: false,
      }],
      index: 0, //当前转动到哪个位置，起点位置
      count: 8, //总共有多少个位置
      timer: 0, //setTimeout的ID，用clearTimeout清除
      speed: 20, //初始转动速度
      times: 0, //转动次数
      cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1, //中奖位置
      click: false, //按钮是否可以点击
      msg: '', //中奖信息
    }
  },
  methods: {
    roll() {
      //控制转动时的CSS样式
      var index = this.index;
      this.active[index].isActive = false;
      index++;
      if (index > this.count - 1) {
        index = 0;
      };
      this.active[index].isActive = true;
      this.index = index;
      return false;
    },
    toRoll() {
      this.times++; //转动次数
      this.roll(this.prize);
      if (this.times > this.cycle + 10 && this.prize == this.index) {
        clearTimeout(this.timer);
        this.prize = -1;
        this.times = 0;
        this.click = false;
        this.$store.state.click = true; //抽奖时 点击分类或档次无效
        Toast({
          message: this.msg,
          position: 'top',
          duration: 2000
        });
        this.$store.state.container=null;//清除动画分数，显示更新后的实际分数
      } else {
        if (this.times < this.cycle) {
          this.speed -= 10;
        } else if (this.times == this.cycle) {
          //获取奖励
          // var number = Math.random() * (this.count);
          // var index = number | 0;
          // this.prize = index;
        } else {
          if (this.times > this.cycle + 10 && ((this.prize == 0 && this.index == 7) || this.prize == this.index + 1)) {
            this.speed += 110;
          } else {
            this.speed += 20;
          }
        }
        if (this.speed < 40) {
          this.speed = 40;
        };
        //循环调用
        this.timer = setTimeout(this.toRoll, this.speed);
      }
    },
    toDraw() {
      
      //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
      if (this.click) {
        return false;
      } else {
        // 判断积分是否充足
        if (this.$store.state.integral < this.$store.state.level) {
          Toast({
            message: "积分不足",
            position: 'top',
            duration: 2000
          });
          return false;
        } else {
          //积分充足
          api.draw({ 'uid': this.$store.state.uid, 'integral': this.$store.state.level, 'type': this.$store.state.type }).then((rs) => {
            console.log(rs);
            if (rs.data.error == 0) {
              this.$store.state.container = this.$store.state.integral - this.$store.state.level;//做减法动画
              //更新缓存
              this.$store.dispatch('upine', { 'integral': rs.data.data.integral });
              this.prize = rs.data.data.where - 1;
              this.msg = rs.data.msg;
              this.$store.state.click = false;
              this.toRoll();
              //一次抽奖完成后，设置click为true，可继续抽奖 
              this.click = true;
            } else {
              Toast({
                message: "出错了",
                position: 'top',
                duration: 2000
              });
            }
          });
        }
        this.speed = 100;
        return false;
      }
    },
  }
}

</script>
<style scoped lang="scss">
table {
  width: 100%;
  font-size: 0;
  tr {
    font-size: 0;
  }
  td {
    display: inline-block;
    position: relative;
    width: 32.5%;
    text-align: center;
    color: #333;
    margin: 0.3%;
    box-sizing: border-box;
    padding: 0;
  }
  .no_active {
    background-color: #fff;
  }
  .active {
    background-color: #ffd43e;
  }
  a {
    width: 32%;
    display: block;
    text-decoration: none;
  }
  img {
    width: 100%;
  }
}

</style>
