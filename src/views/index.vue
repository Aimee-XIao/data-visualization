<template>
  <div class="screen-box">

    <mapDot></mapDot>  
  </div>
</template>
<script>
import {utilFun} from '../lib/util'
import mapDot from '../components/map_dot.vue'
export default {
 components: {
    mapDot
  },
  data() {
    return {
      dateList: {}
    }
  },
  mounted() {
    this.inits()
  },
  methods: {
    inits() {
      this.dateList = utilFun.initList('南京医院')
      console.log(this.dateList)
    }      
  }
}
</script>
<style lang="scss" scoped>
.screen-box {
  width: 100%;
  height: 100%;
  // background-image: url(../assets/img/bg.png);
  background-size: 100% 100%;
}
</style>
