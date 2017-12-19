<template>
  <div class="layout">
    <div class="dish">
      <div class="dish_bg">
        <img src="../../assets/dish_bg.png">
      </div>
      <div class="dish_title">
        <div class="z_txt">
          {{this.$store.state.container?this.$store.state.container:this.$store.state.integral}}
        </div>
        <img src="../../assets/integral.png">
      </div>
      <div class="dish_box">
        <div class="z_box">
          <GmDraw :block="activitys[type][level].info"></GmDraw>
        </div>
        <img :src="horse.horse_bg">
      </div>
    </div>
    <div class="zhanban" v-show="zb">
      <span @click="close_zb">×</span>
      <div class="content">
        <p><img src="../../assets/lipin.svg"></p>
        <ul>
          <li>特等奖：全嘉宾定制签名板</li>
          <li>一等奖：小型手办、洞爷湖木刀等 </li>
          <li>二等奖：大福袋，正版同人书等精美周边</li>
          <li>三等奖：动漫本子、贴纸等小型周边奖励</li>
          <li>四等奖：动漫书签等小型纪念品</li>   
          <li>注：奖品有限,领完即止</li>
        </ul>
      </div>
    </div>
    <div class="options" v-bind:class="options_style">
      <div class="btn_hide" @click="toHide">
        <img src="../../assets/btn/btn_hide.svg">
      </div>
      <GmControl :selections="gears" @on-change="select"></GmControl>
      <GmControl :selections="types" @on-change="select" @zhanban="openzb"></GmControl>
    </div>
  </div>
</template>
<script>
import GmDraw from '@/user/plugin/draw';
import GmControl from '@/user/plugin/control';
export default {
  components: {
    GmDraw,
    GmControl
  },
  created: function() {
    //页面加载完毕执行
    setInterval(this.toHorse, 500);
  },
  data() {
    return {
      //type 为区分档位与分类调用同一组件
      gears: [
        { label: "档位一", value: 0, base: require("@/assets/btn/btn_gear1_a.svg"), active: require("@/assets/btn/btn_gear1_b.svg"), type: 1, num: 10 },
        { label: "档位二", value: 1, base: require("@/assets/btn/btn_gear2_a.svg"), active: require("@/assets/btn/btn_gear2_b.svg"), type: 1, num: 20 },
        { label: "档位三", value: 2, base: require("@/assets/btn/btn_gear3_a.svg"), active: require("@/assets/btn/btn_gear3_b.svg"), type: 1, num: 50 }
      ],
      types: [
        { label: "抽礼品", value: 0, base: require("@/assets/btn/btn_present_a.svg"), active: require("@/assets/btn/btn_present_b.svg"), type: 2, class: 2 },
        { label: "抽积分", value: 1, base: require("@/assets/btn/btn_integral_a.svg"), active: require("@/assets/btn/btn_integral_b.svg"), type: 2, class: 3 },
        { label: "兑换券", value: 2, base: require("@/assets/btn/btn_ticket_a.svg"), active: require("@/assets/btn/btn_ticket_b.svg"), type: 2 }
      ],
      activitys: [
        //奖品
        [{
            info: [
              require("@/assets/block1/6.png"),
              require("@/assets/block1/2.png"),
              require("@/assets/block1/6.png"),
              require("@/assets/block1/4.png"),
              require("@/assets/block1/6.png"),
              require("@/assets/block1/3.png"),
              require("@/assets/block1/6.png"),
              require("@/assets/block1/5.png"),
            ],
          },
          {
            info: [
              require("@/assets/block1/5.png"),
              require("@/assets/block1/2.png"),
              require("@/assets/block1/4.png"),
              require("@/assets/block1/4.png"),
              require("@/assets/block1/5.png"),
              require("@/assets/block1/3.png"),
              require("@/assets/block1/5.png"),
              require("@/assets/block1/6.png"),
            ],
          },
          {
            info: [
              require("@/assets/block1/4.png"),
              require("@/assets/block1/1.png"),
              require("@/assets/block1/5.png"),
              require("@/assets/block1/3.png"),
              require("@/assets/block1/4.png"),
              require("@/assets/block1/2.png"),
              require("@/assets/block1/5.png"),
              require("@/assets/block1/3.png"),
            ],
          }
        ],
        //积分
        [{
            info: [
              require("@/assets/block1/30.png"),
              require("@/assets/block1/20.png"),
              require("@/assets/block1/10i.png"),
              require("@/assets/block1/8i.png"),
              require("@/assets/block1/5i.png"),
              require("@/assets/block1/2i.png"),
              require("@/assets/block1/100.png"),
              require("@/assets/block1/50.png"),
            ],
          },
          {
            info: [
              require("@/assets/block1/block_4.png"),
              require("@/assets/block1/block_4.png"),
              require("@/assets/block1/block_4.png"),
              require("@/assets/block1/block_4.png"),
              require("@/assets/block1/block_4.png"),
              require("@/assets/block1/block_4.png"),
              require("@/assets/block1/block_4.png"),
              require("@/assets/block1/block_4.png"),
            ],
          },
          {
            info: [
              require("@/assets/block1/block_6.png"),
              require("@/assets/block1/block_6.png"),
              require("@/assets/block1/block_6.png"),
              require("@/assets/block1/block_6.png"),
              require("@/assets/block1/block_6.png"),
              require("@/assets/block1/block_6.png"),
              require("@/assets/block1/block_6.png"),
              require("@/assets/block1/block_6.png"),
            ],
          }
        ],
      ],
      //当前用户信息
      users: {
        gears: 100, //当前档位

      },
      type: 0, //类别
      level: 0, //档位
      ishide: false,
      options_style: 'options_show', //折叠开关
      zb: false,
      //跑马灯效果
      horse: {
        number: 0,
        horse_bg: require("@/assets/dish_1.png"),
        horse_arr: [require("@/assets/dish_1.png"), require("@/assets/dish_2.png")]
      },

    }
  },
  methods: {
    //隐藏功能
    toHide() {
      if (this.ishide) {
        this.ishide = false;
        this.options_style = 'options_show';
      } else {
        this.ishide = true;
        this.options_style = 'options_hide';
      }
    },
    //跑马灯效果
    toHorse() {
      this.horse.number++;
      if (this.horse.number % 2 == 0) {
        this.horse.horse_bg = this.horse.horse_arr[0]
      } else {
        this.horse.horse_bg = this.horse.horse_arr[1]
      }
    },
    select(rs) {
      if (rs.type == 1) {
        this.level = rs.value;
      } else {
        this.type = rs.value;
        if (rs.value == 0) {
          //用户点击积分后再点击礼品时，判断此时选择的档次
          switch (this.level) {
            case 0:
              this.$store.state.level = 10;
              break;
            case 1:
              this.$store.state.level = 20;
              break;
            case 2:
              this.$store.state.level = 50;
              break;
          }
        }
      }
    },
    //打开展板
    openzb() {
      this.zb = true;
    },
    //关闭展板
    close_zb(){
      this.zb= false;
    }
  }
}

</script>
<style scoped lang="scss">
.dish {
  position: relative;
  padding-top: 40%;
  margin: 0 auto;
  width: 90%;
  .dish_bg {
    width: 50%;
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0%;
  }
  .dish_title {
    position: absolute;
    width: 50%;
    left: 3%;
    top: 16%;
    z-index: 1;
    .z_txt {
      position: absolute;
      width: 80%;
      font-size: 6vw;
      left: 50%;
      margin-left: -40%;
      top: 24%;
      text-align: center;
    }
  }
  .dish_box {
    position: relative;
    z-index: 999;
    .z_box {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -35.5%;
      margin-top: -36.5%;
      width: 72%;
      height: 72%;
    }
  }
  img {
    width: 100%;
  }
}

.options {
  position: absolute;
  left: 0;
  width: 100%;
  height: 25%;
  background-color: #ffe58b;
  z-index: 9999;
  box-sizing: border-box;
  padding-top: 5%;
  .btn_hide {
    position: absolute;
    cursor: pointer;
    left: 50%;
    top: -15%;
    margin-left: -5%;
    width: 10%;
    img {
      width: 100%;
    }
  }
}

.options_show {
  bottom: 0;
}

.options_hide {
  bottom: -21%;
}

.zhanban {
  background-color:rgb(255,212,63);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 999999;
  span {
    font-size: 24px;
    border: 2px solid #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    right: 20px;
    top: 10px;
    line-height: 40px;
    font-weight: 600;
    color:#fff;
  }
  .content{
    position:absolute;
    top:10%;
    width:80%;
    left:10%;
    background-color:#fff;
    border-radius:5px;
    box-sizing:border-box;
    padding:20px;
    font-size:16px;
    border:15px solid rgba(254,238,178,1);
    p{
      margin-bottom:10px;
      text-align:center;
    }
    li{
      height:33px;
      line-height:33px;
    }
    li:last-child{
      margin-bottom: 20px;
      color:#f00;
      font-size:12px;
    }
  }
}
@media screen and (max-width: 412px) {
  .zhanban ul li{
    font-size:12px;
  }
  .zhanban .content{
    width:90%;
    left:5%;
  }
}
</style>
