import { prescriptionDetails } from './dataList/prescriptionDetails';
import { diagnosticRecord } from './dataList/diagnosticRecord';
import { visitRecord } from './dataList/visitRecord';

 let prescriptionDetailsList = []
 let diagnosticRecordList = []
 let visitRecordList = []

export const utilFun = {
    initList(val){
        prescriptionDetailsList = this.fitlerList ({val: val, objs: prescriptionDetails})
        diagnosticRecordList = this.fitlerList ({val: val, objs: diagnosticRecord})
        visitRecordList = this.fitlerList ({val: val, objs: visitRecord})
        return {
            prescriptionDetailsList: this.fitlerList ({val: val, objs: prescriptionDetails}),
            diagnosticRecordList: this.fitlerList ({val: val, objs: diagnosticRecord}),
            visitRecordList: this.fitlerList ({val: val, objs: visitRecord})
        }
        
    },
   /**
  * @description:  求和
  * @param {Sting} keyName 求和列字段名
  * @param {Sting} fitlerNmae 过滤字段名
  * @param {Sting} val 过滤值
  * @param {Array} obj 数据
  * @param {boolean} isSet 是否去重
  * @return {number} 合计值
  */
    addNum ({keyName, fitlerNmae, val, obj= [], isSet = false}) {
        let arr =  isSet ? new Set(obj)  : obj        
        let $total = 0
        if (isSet) {
            $total = this.fitlerList(fitlerNmae, val, arr).reduce(function (total, currentValue){
                return currentValue[keyName] ? (total + currentValue[keyName]) : total;
            }, 0) 

        } else {
            $total = this.fitlerList(fitlerNmae, val, arr).reduce(function (total, currentValue){
                return currentValue[keyName] ? (total + currentValue[keyName]) : total;
            }, 0)
        }
        return $total
    },
    /**
     * @description:  过滤方法
     * @param {Sting} keyName 过滤列字段名
     * @param {Sting} val 过滤值
     * @param {Array} obj 数据
     * @return {Array}} 滤过后数组对象
     */
    fitlerList ({keyNames = 'unit', val, objs}) {
        return objs.filter(function (item) {
            return item[keyNames] == val
        })
    },
    /**
      * @description: 总览数据: 医生总量、接诊次数、接诊人数、用药总量
      */
     overviewData() {
      let arr = []
      console.log(visitRecord)
      arr[0] = this.addNum({keyName: 'doctorNo', fitlerNmae: 'unit', val:'南京医院', obj: visitRecord, isSet: true})
    //   arr[1] = this.addNum('diagnosticTimes', 'unit', value, visitRecord)
    //   arr[2] = this.addNum('patientNo', 'unit', value, visitRecord)
    //   arr[3] = this.addNum('dataNum', 'unit', value, diagnosticRecord) 
      return arr
    }
}
