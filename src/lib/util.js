import XLSX from 'xlsx'
import axios from 'axios'
import moment from 'moment';

export const utilFun = {
  transformSheets(sheets){
    let content1 = []
    for (let key in sheets){
      //读出来的workbook数据很难读,转换为json格式,参考https://github.com/SheetJS/js-xlsx#utility-functions
      content1.push(XLSX.utils.sheet_to_json(sheets[key]))
    }    
    return content1
  },
  getXLSXData() {
    let dataList = {}
    let p = []
    let list = [
      {name: 'visitRecord', url: '/visitRecord.xlsx'},
      {name: 'prescriptionDetails', url: '/prescriptionDetails.xlsx'},
      {name: 'diagnosticRecord', url: '/diagnosticRecord.xlsx'}
    ]
    for (const iterator of list) {
      p.push( new Promise((resolve, reject) => {
        axios.get(iterator.url, {responseType:'arraybuffer'})
          .then((res) => { 
           let data = new Uint8Array(res.data);
           let wb = XLSX.read(data, {type:"array"});
           let sheets = wb.Sheets;
           dataList[iterator.name] = this.transformSheets(sheets); 
          resolve(dataList);
          }).catch( err =>{
            reject(err);
          })
      }))  
    } 
     return Promise.all(p)
  },
  initList(val, list) {    
    return {
       prescriptionDetailsList: this.fitlerList({
        val: val,
        objs: list.prescriptionDetails[0],
      }),
      diagnosticRecordList: this.fitlerList({
        val: val,
        objs: list.diagnosticRecord[0],
      }),
      visitRecordList: this.fitlerList({ val: val, objs: list.visitRecord [0]}),
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

  fitlerList({ keyNames = "unit", val, objs, flage = false }) {    
    return objs.filter((item) => { 
      let ittems = item[keyNames]       
      if (keyNames == 'strtDate') {
        ittems = this.formatDate(item[keyNames], '-')
      }
      return flage ? ittems.indexOf(val) != -1 :  val ? ittems == val : ittems;
    });
  },
  formatDate(numb, format) {
      let time = new Date((numb - 1) * 24 * 3600000 + 1)    
      time.setYear(time.getFullYear() - 70)    
      let year = time.getFullYear() + ''    
      let month = time.getMonth() + 1 + ''    
      let date = time.getDate() + ''    
      if(format && format.length === 1) {    
      return year + format + month + format + date    
      }    
      return year+(month < 10 ? '0' + month : month)+(date < 10 ? '0' + date : date)    
    }　
};
