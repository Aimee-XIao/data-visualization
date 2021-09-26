<template>
  <div class="screen-box">
    <Keshi :renyuan="firstList" :keshidan="secondList" :yaopin="thirdList"></Keshi>
    <mapDot @select="select"></mapDot>
    <div class="bottom-box">
      <div class="bottom-item" v-for="(item, index) in fourthList" :key="index">
        <p class="number">{{item.number}}</p>
        <p class="name">{{item.name}}</p>
      </div>
    </div>
    <huanZhe :renyuan="fifthList" :keshidan="sixthList" :roseData="huanzheList"></huanZhe>
  </div>
</template>
<script>
import { utilFun } from "../lib/util";
import mapDot from "../components/map_dot.vue";
import Keshi from "../components/keshifenxi/keshifenxi.vue";
import huanZhe  from "../components/huanzhefenxi/huanzhefenxi.vue";
import _ from "lodash";
import moment from 'moment';

export default {
  components: {
    mapDot,
    Keshi,
    huanZhe 
  },

  data() {
    return {
      unit: '', // 默认单位
      dateList: {}, // 所有数据
      firstList: [], // 各科室接诊人员统计
      secondList: { x: [], y: [] }, // 各科室开单情况
      thirdList: [], // 各科室药品开单情况
      fourthList: [], // 底部统计
      fifthList: { x: [], y: [] }, // 本年度各月份病患数量
      sixthList: { x: [], y: [] }, // 诊断结果分析
      seventhList: [], // 患者综合分析
      nameList: [
        {key:'unit',name:'单位数量'},
        {key:'doctor',name:'医生总量'},
        {key:'diagnosticTimes',name:'接诊数量'},
        {key:'time',name:'接诊次数'},
        {key:'number',name:'用药总量'}
      ],
      huanzheList: {
        rose1: [],
        rose2: [],
        rose3: [],
        rose4: []
      }
    };
  },
  created(){
    this.init('')
  },
  methods: {
    init(val){
      utilFun.getXLSXData().then((result) => {
      this.dateList = utilFun.initList(val, result[0]); 
    }).catch((error) => {
      console.log(error)
    }).then(() => {
      this.inits(); 
    })
    },
    inits(val) {
      
      this.getFirst(this.dateList.visitRecordList,'department')
      this.getSecond(this.dateList.prescriptionDetailsList, "billingDepartment");
      this.getThird(this.dateList.prescriptionDetailsList);
      this.getFourth()
      this.getFifth();
      this.getSixth(this.dateList.diagnosticRecordList, 'diagnostic');
      this.getRoseData()
    },
    select(val){
      console.log('', val)
      this.inits(val)
    },
   getFirst(list, keyname) {
      this.firstList = utilFun.groupList(list, keyname);
    },
    getSecond(list, keyname) {
      let arr = utilFun.groupList(list, keyname);
      this.secondList.x = this.getXYData(arr, 'name');
      this.secondList.y = this.getXYData(arr, 'data', true);
      console.log(this.secondList)
    },
    getThird(list) {
      let arr = this.forGroup(list);
      for (const iterator of arr) {        
        let obj = {... iterator[0][0]}
        obj.number = eval(obj.number.join("+"))
        this.thirdList.push(obj)
      }
    },
    getFourth() {
      const addObj = (key, name, list)=>{
        let number = 0
        let arr = key == 'time'? list : this.getXYData(list, key);
        if (key == 'time') {
          number = arr.length;
        } else if (key == 'doctor' || key == 'unit') {      
          number = number = new Set(arr).size
        } else {
          number =  eval(this.getXYData(list, key).join("+"));
        }
        return {name: name, number: number} 
      }   
      for (const iterator of this.nameList) {
        let list = this.dateList.visitRecordList
        if (iterator.key == 'number') {
          list = this.dateList.prescriptionDetailsList
        }
        this.fourthList.push(addObj(iterator.key, iterator.name, list))
      }      
      console.log(this.fourthList)
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
    getFifth() {
      let monthList = this.getDates(moment("2020-12-01"));
      for (const iterator of monthList) {
        this.fifthList.y.push(this.getMonthNumber(iterator, this.dateList.visitRecordList))
      }
    },
    getDates(startDate) {
       let nowNormalized = moment().startOf("month") + 1;/* the first of current month */
       let startDateNormalized = startDate.clone().startOf("month").add("M", 1); /* the first of startDate + 1 Month - as it was asked for the months in between startDate and now */
       let months = [];
        while (startDateNormalized.isBefore(nowNormalized)) {
          months.push(startDateNormalized.format("YYYY-MM"));
          this.fifthList.x.push(startDateNormalized.format("M") + '月')
          startDateNormalized.add("M", 1);
        }
        return months;
    },
    getMonthNumber(month, list) {
      let arr = utilFun.fitlerList({keyNames: "strtDate", val: month, objs: list, flage: true})
      return 0 || arr.length
    },
    getSixth(list, keyname) {
      let arr = utilFun.groupList(list, keyname);
      this.sixthList.x = this.getXYData(arr, 'name');
      this.sixthList.y = this.getXYData(arr, 'data', true);
      console.log(this.sixthList)
    },
    getXYData(list, keyname, isSum) {
      return list.map(item => {
        return isSum ? 0 || item[keyname].length : item[keyname]
      })
    },
      getSeventh(list) {
      // this.huanzheList.rose1 = this.getXYData(this.dateList.visitRecordList,'isRecruit');
      // this.huanzheList.rose2 = this.getXYData(this.dateList.visitRecordList,'iSInitial');
      // this.huanzheList.rose3 = this.getXYData(this.dateList.visitRecordList,'management');
      // this.huanzheList.rose4 = this.getXYData(this.dateList.visitRecordList,'state');
      const keyList = ['isRecruit','iSInitial','management','state']
      for (const iterator of keyList) {
        this.getRoseData(list, iterator)        
      }
    },
    getRoseData(list, keyname){
      // let arr = this.getXYData(list,keyname);
      let arr = [1,2,3,1,4,1,2,1,1,2,3,2];
      let setArr = new Set(arr);
      const add1 = (item,iterator) => {
        let obj = arr.filter(function (item) {
          return item == iterator;
        })
        return obj.length;
      }
      const add = (setArr, arr) => {
        let sum = []
        for (const iterator of setArr) {
         sum.push(this.add1(item,iterator))
        }
        return sum
      }
      let obj = {
        name:  setArr,
        value: add(setArr, arr),
        itemStyle: {
          borderRadius: 8,
          color: "rgba(134, 228, 255, 1)"
        },
      }
         return obj   
    }
  },
};
</script>
<style lang="scss" scoped>
.screen-box {
  width: 100%;
  height: 100%;
  padding: 80px;
  box-sizing: border-box;
  background-image: url(../assets/img/bg.png);
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .bottom-box {
    flex: 1;
    height: 360px;
    margin: 0  80px 50px 80px;
    background-image: url(../assets/img/chart7_bg.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    padding-bottom: 50px;
    .bottom-item {
      .number {
        font-size: 56px;
font-family: DINAlternate;
font-weight: bold;
color: #00BCF4;
line-height: 80px;
      }
      .name {
        font-size: 24px;
font-family: FZLanTingHei-R-GBK;
font-weight: 400;
color: #00BCF4;
line-height: 63px;
      }
    }
    
  }
}
</style>
