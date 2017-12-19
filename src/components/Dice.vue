<template>
  <div class="main">
    <div class="main-left">
      <img src="../assets/1.png" v-show="pic[0]">
      <img src="../assets/2.gif" v-show="pic[1]">
      <img src="../assets/3.png" v-show="pic[2]">
    </div>
    <div class="main-right">
      <table cellspacing="0">
        <tr>
          <td>力 :</td>
          <td>{{power}}</td>
          <td>智 :</td>
          <td>{{brains}}</td>
        </tr>
        <tr>
          <td>敏 :</td>
          <td>{{agile}}</td>
          <td>运 :</td>
          <td>{{luck}}</td>
        </tr>
      </table>
    </div>

    <button class="button" @click="going">开始</button>
    <audio id="bgMusic">
        <source src="../assets/2853.wav" type="audio/wav" />
    </audio>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pic:[true,false,false],
        bz:0,
        power:'',
        brains:'',
        agile:'',
        luck:'',
      }
    },
    methods:{
      going(){
          if (this.bz == 0) {
            this.pic = [false,true,false];
            this.bz = 1;
            this.power = '';
            this.brains = '';
            this.agile = '';
            this.luck = '';
            window.running = setInterval(this.change,3000);
            var audio = document.getElementById("bgMusic");

            //播放(继续播放)
            audio.play();
          };
      },
      change(){
        var num = 16;
        var a = Math.round(Math.random()*9);
        num = num - a;
        if (num >= 9) {
          var b = Math.round(Math.random()*9);
        }else{
          var b = Math.round(Math.random()*num);
        }
        num = num - b;
        if (num >= 9) {
          var c = Math.round(Math.random()*9);
        }else{
          var c = Math.round(Math.random()*num);
        }
        num = num - c;
        if (num>9) {
          this.change();
          return;
        };
        var d = num;

        this.power = a +1;
        this.brains = b+1;
        this.agile = c+1;
        this.luck = d+1;
        this.pic = [false,false,true];
        this.bz = 0;
        clearInterval(window.running);

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    margin:0 auto;
    margin-top: 20px;
    width: 98%;
    text-align: center;
  }
  .main div{
    display: inline-block;
  }
  .main .main-left{
    width: 100%;
  }

  .main .main-left .ok{
    display: block;
  }
  .main .main-left img{
    width: 200px;
    height: 200px;
    /*display: none;*/
  }
  .main .main-right{
    width: 100%;
    margin-top: 20px;
  }

  .button{
    width:100px;
    margin-top: 20px;

  }

  table{
    width: 80%;
    margin:0 auto;
    text-align: center;
  }

  tr{
    height:30px;
  }
  td{
    width:25%;
  }

</style>
