<template>
  <div class="npcinfo">
      <ul>
        <li><router-link to="/pk">== 开启PK ==</router-link></li>
        <li><router-link to="/numstall">== 档位加分 ==</router-link></li>
        <li><router-link to="/numput">== 自定义加分 ==</router-link></li>
        <li><router-link to="/exchange">== 奖品兑换 ==</router-link></li>
      </ul>
  </div>
</template>
<script>
import Toast from '@/components/toast/toast.js'
export default {
  name: 'hello',
  created(){
    // console.log(this.$store.state);
  },
  data() {
    return {
      num: 0,
    }
  },

  methods: {
    select(e) {
      this.isA = this.isB = this.isC = false;
      this[e] = true;
    },
  },
  computed:{

  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.npcinfo {
  width:50%;
  margin-left:25%;
  text-align: center;
  font-size:16px;
  font-weight: bold;
  height:400px;
  position: relative;
  top:calc(50% - 200px);
}
.npcinfo ul li a{
  height:50px;
  line-height: 50px;
  display: block;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 30px;
  color:#000;
}

</style>
