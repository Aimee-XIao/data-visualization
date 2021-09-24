import { prescriptionDetails } from './dataList/prescriptionDetails';
import { diagnosticRecord } from './dataList/diagnosticRecord';
import { visitRecord } from './dataList/visitRecord';


export const utilFun = {
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
        $total = this.fitlerList(fitlerNmae, val, arr).reduce(function (total, currentValue){
            return currentValue[keyName] ? (total + currentValue[keyName]) : total;
        }, 0)
        return $total    
    },
    /**
     * @description:  过滤方法
     * @param {Sting} keyName 过滤列字段名
     * @param {Sting} val 过滤值
     * @param {any} obj 数据
     * @return {Array}} 滤过后数组对象
     */
    fitlerList ({keyName = 'unit', val= 'NKG', obj}) {
        return obj.fitler(item => item[keyName] == val )
    },

    /**
      * @description: 总览数据: 医生总量、接诊次数、接诊人数、用药总量
      */
     overviewData(value) {
      let dorNum = this.addNum('dataNum', 'unit', value, visitRecord)
      let timesNum = this.addNum('dataNum', 'unit', value, visitRecord)
      let personNm = this.addNum('dataNum', 'unit', value, visitRecord)
      let drugNum = this.addNum('dataNum', 'unit', value, diagnosticRecord) 
    }
}
