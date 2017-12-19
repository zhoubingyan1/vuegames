<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in selections" @click="chosenSelection(index,item.type)" v-show="$store.state.type==3?(item.type==1?index<1:true):true"  :title="item.label" >
        <img :src="index === nowIndex ? item.active:($store.state.type==3 && item.type==1?item.active:item.base)">
      </li>
    </ul>
  </div>
</template>

<script>
//档位选项卡
export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: 'test',
        value: 0,
        base: '',
        active: ''
      }]
    }
  },
  data() {
    return {
      nowIndex: 0
    }
  },
  methods: {
    chosenSelection(index,type) {
      if(!this.$store.state.click){
        return false;
      }
      this.nowIndex = index;
      if(type==2&&index==2){
        //奖励面板
        this.$emit('zhanban');
      }else{
        this.$emit('on-change', this.selections[index]);
        if(this.selections[index].type==1){
          this.$store.state.level=this.selections[index].num;//把当前档位存在全局
        }else{
          this.$store.state.type=this.selections[index].class;//把当前类别存在全局
          //积分只有一个10分档次(class为3)
          if(this.selections[index].class==3){
            this.$store.state.level=10;
          }
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.chooser-component {
  position: relative;
  display: inline-block;
  width: 100%;
}

.chooser-list li {
  display: inline-block;
  width: 30%;
  margin: 1.5%;
  img {
    width: 100%;
  }
}

</style>
