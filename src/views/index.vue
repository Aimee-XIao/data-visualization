<template>
  <div class="screen-box">
    <mapDot></mapDot>  
  </div>
</template>
<script>
import mapDot from '../components/map_dot.vue'
export default {
  components: {
    mapDot
  }
}
</script>
<style lang="scss" scoped>
.screen-box {
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/bg.png);
  background-size: 100% 100%;
}
</style>
