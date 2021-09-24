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
      dateList: {},
      firstList: [], // 各科室接诊人员统计
      secondList: [], // 各科室开单情况
      thirdList: [], // 各科室药品开单情况
    }
  },
  mounted() {
    this.inits()
  },
  methods: {
    inits() {
      this.dateList = utilFun.initList('南京医院')
      // this.getFirst(this.dateList.visitRecordList,'department')
      this.getSecond(this.dateList.prescriptionDetailsList,'billingDepartment')
      this.getThird(this.dateList.prescriptionDetailsList,'billingDepartment')
    },
    getFirst(list, keyname) {
      this.firstList = utilFun.groupList(list, keyname)
    },
    getSecond(list, keyname) {
      this.secondList = utilFun.groupList(list, keyname)      
    },
    getThird(list, keyname) {
     const keyList = ['billingDepartment', 'drugType', 'drugName', 'number']
     keyList.forEach(element => {
       console.log(element)
     });
      this.thirdList = utilFun.groupList(list, keyname)
      console.log(this.thirdList)
    },
    forGroup(keyname) {
     let arr = utilFun.groupList(list, keyname)
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