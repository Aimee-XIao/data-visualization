<template>
  <div class="screen-box">

  </div>
</template>
<script>
/* eslint-disable */
import {utilFun} from '../lib/util'
export default {
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
