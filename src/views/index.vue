<template>
  <div class="screen-box">
    <mapDot></mapDot>
  </div>
</template>
<script>
import { utilFun } from "../lib/util";
import mapDot from "../components/map_dot.vue";
import _ from "lodash";

export default {
  components: {
    mapDot,
  },
  data() {
    return {
      dateList: {},
      firstList: [], // 各科室接诊人员统计
      secondList: [], // 各科室开单情况
      thirdList: [], // 各科室药品开单情况
    };
  },
  mounted() {
    this.inits();
  },
  methods: {
    inits() {
      this.dateList = utilFun.initList("南京医院");
      // this.getFirst(this.dateList.visitRecordList,'department')
      // this.getSecond(this.dateList.prescriptionDetailsList, "billingDepartment");
      this.getThird(this.dateList.prescriptionDetailsList);
    },
    getFirst(list, keyname) {
      this.firstList = utilFun.groupList(list, keyname);
    },
    getSecond(list, keyname) {
      this.secondList = utilFun.groupList(list, keyname);
    },
    getThird(list) {
      let arr = this.forGroup(list);
      for (const iterator of arr) {        
        let obj = {... iterator[0][0]}
        obj.number = eval(obj.number.join("+"))
        this.thirdList.push(obj)
      }
      console.log(this.thirdList)
    },
    forGroup(list) {
      const grplist = _(list).groupBy("billingDepartment").values()
        .map((it) =>_(it).groupBy("drugType").values()
         .map((it) =>_(it).groupBy("drugName").values()
          .map((list) => ({
            billingDepartment: list[0].billingDepartment,
            drugType: list[0].drugType,
            drugName: list[0].drugName,
            number: list.map((v) => v.number),
          })).value()
          ).value()
        ).value();
        return grplist;
    },
  },
};
</script>
<style lang="scss" scoped>
.screen-box {
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/bg.png);
  background-size: 100% 100%;
}
</style>
