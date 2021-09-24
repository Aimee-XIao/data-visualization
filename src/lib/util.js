import { prescriptionDetails } from "./dataList/prescriptionDetails";
import { diagnosticRecord } from "./dataList/diagnosticRecord";
import { visitRecord } from "./dataList/visitRecord";

export const utilFun = {
  initList(val) {
    return {
      prescriptionDetailsList: this.fitlerList({
        val: val,
        objs: prescriptionDetails,
      }),
      diagnosticRecordList: this.fitlerList({
        val: val,
        objs: diagnosticRecord,
      }),
      visitRecordList: this.fitlerList({ val: val, objs: visitRecord }),
    };
  },
  /**
   * @description:  分组
   * @param {Array} list 数据
   * @param {Sting} keyName 求和列字段名
   * @return {Array} 分组后的数据
   */
  groupList(list, keyname) {
    let map = {}, dest = [];
    for (const iterator of list) {
      if (!map[iterator[keyname]]) {
        console.log(iterator[keyname])
        dest.push({ name: iterator[keyname], data: [iterator] });
        map[iterator[keyname]] = iterator;
      } else {
        for (const item of dest) {
          if (item.name == iterator[keyname]) {
            item.data.push(iterator);
            break;
          }
        }
      }
    }
    return dest;
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
  addNum({ keyName, obj = [], isSet = false }) {
    let arr = isSet ? new Set(obj) : obj;
    let $total = 0;
    $total = arr.reduce(function (total, currentValue) {
      return currentValue[keyName] ? total + currentValue[keyName] : total;
    }, 0);
    return $total;
  },
  /**
   * @description:  过滤方法
   * @param {Sting} keyName 过滤列字段名
   * @param {Sting} val 过滤值
   * @param {Array} obj 数据
   * @return {Array}} 滤过后数组对象
   */
  fitlerList({ keyNames = "unit", val, objs }) {
    return objs.filter(function (item) {
      return item[keyNames] == val;
    });
  },
};
