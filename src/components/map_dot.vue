<template>
  <div class="map-dots">
    <div>
      <div class="xian"></div>
      <div class="xian-title"></div>
    </div>
    <div class="dots-title">共65家医院</div>
    <div class="nanjing-big">
      <div class="nanjing">
        <div class="nanjing-dots"></div>
      </div>
    </div>
    <!-- 航线 -->
    <div class="flight-line">
      <div class="flight-dots"></div>
      <div class="flight-dots"></div>
      <div class="flight-dots"></div>
      <div class="flight-dots"></div>
      <div class="flight-dots"></div>
    </div>
    <div style="position: absolute; top: -357px; left: 80px">
      <div id="chart"></div>
    </div>

    <div
      class="dots-box"
      v-for="(item, index) in doctorList"
      :key="index"
      :style="{ top: item.top + 'px', left: item.left + 'px' }"
      @click="select(item, index)"
    >
      <p>{{ item.unit }}</p>
      <p class="dots dots-item"></p>
    </div>
  </div>
</template>
<script>
import { dots } from "../lib/dataList/dots";
import chinaMap from "@/assets/china.json";
export default {
  data() {
    return {
      myChart: null,
      planePath:
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
    };
  },
  computed: {
    doctorList() {
      return dots.map((item) => {
        return {
          id: item.id,
          unit: item.unit,
          top: item.top,
          left: item.left,
        };
      });
    },
  },
  mounted() {
    this.initmap();
    // console.log(this.doctorList);
  },
  methods: {
    select(item, index) {
      this.$emit("select", item.unit);
    },
    initmap() {
      // 1. 实例化对象
      this.$echarts.registerMap("china", { geoJSON: chinaMap });
      this.myChart = this.$echarts.init(document.getElementById("chart"));
      // 2. 指定配置和数据
      var geoCoordMap = {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        四五四医院: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        徐州医学院附属淮海医院: [101.4038, 36.8207],
        南京医院: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028],
      };

      var XAData = [
        [{ name: "包头" }, { name: "南京医院", value: 100 }],
        [{ name: "四川" }, { name: "南京医院", value: 100 }],
        [{ name: "广州" }, { name: "南京医院", value: 100 }],
        [{ name: "徐州医学院附属淮海医院" }, { name: "南京医院", value: 100 }],
        [{ name: "拉萨" }, { name: "南京医院", value: 100 }],
      ];

      let planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];

          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: dataItem[1].value,
            });
          }
        }
        return res;
      };

      var color = ["#fff", "#fff", "#fff"]; //航线的颜色
      var series = [];
      [["南京医院", XAData]].forEach(function (item, i) {
        series.push(
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              //   color: "red", //arrow箭头的颜色
              symbolSize: 3,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 2,
            symbol: ["none", "arrow"],
            symbolSize: 5,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,

              symbol: planePath,
              symbolSize: 15,
            },
            itemStyle: {
              color: "#fff",
            },
            lineStyle: {
              normal: {
                color: "#3f73a8",
                width: 5,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 3,
            symbol: ["none", "arrow"],
            symbolSize: 5,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15,
            },
            lineStyle: {
              normal: {
                color: "#3f73a8",
                width: 5,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 5,
            symbol: ["none", "arrow"],
            symbolSize: 5,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15,
            },
            lineStyle: {
              normal: {
                color: "#3f73a8",
                width: 5,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 4,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}",
              },
            },
            symbolSize: function (val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: color[i],
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value,
                ]),
              };
            }),
          }
        );
      });
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function (params, ticket, callback) {
            if (params.seriesType == "effectScatter") {
              return "线路：" + params.data.name + "" + params.data.value[2];
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                ">" +
                params.data.toName +
                "<br />" +
                params.data.value
              );
            } else {
              return params.name;
            }
          },
        },

        geo: {
          show: false,
          map: "china",
          label: {
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          roam: false,
          zoom: 1,
          itemStyle: {
            normal: {
              areaColor: "rgba(43, 196, 243, 0.42)",
              borderColor: "rgba(43, 196, 243, 1)",
              borderWidth: 1,
            },
            emphasis: {
              areaColor: "#2B91B7",
            },
          },
        },
        series: series,
      };
      this.myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scope>
.map-dots {
  width: 1500px;
  height: 1200px;
  // background: #ccc;
  position: absolute;
  top: 301px;
  left: 1160px;
  display: flex;
  justify-content: center;
  .xian {
    width: 290px;
    height: 290px;
    border-radius: 50%;
    background-image: url(../assets/img/xian_yuan.png);
    background-size: 100% 100%;
    position: absolute;
    top: 166px;
    left: 2px;
  }
  .xian-title {
    width: 334px;
    height: 140px;
    position: absolute;
    background-image: url(../assets/img/xian_icon.png);
    top: 171px;
    left: 153px;
  }
  .nanjing-big {
    width: 172px;
    height: 172px;
    border-radius: 50%;
    background: rgba(0, 188, 244, 0.1);
    border: 2px solid rgba(230, 225, 225, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 401px;
    right: 490px;
    z-index: 3;
    .nanjing {
      width: 92px;
      height: 92px;
      background: rgba(0, 188, 244, 0.3);
      border: 2px solid rgba(230, 225, 225, 0.3);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .nanjing-dots {
        width: 35px;
        height: 35px;
        background: #ffb400;
        border: 5px solid #e6e1e1;
        border-radius: 50%;
      }
    }
    .nanjing-dots {
      width: 35px;
      height: 35px;
      background: #ffb400;
      border: 5px solid #e6e1e1;
      border-radius: 50%;
    }
  }
  .flight-line {
    .flight-dots {
      width: 35px;
      height: 35px;
      background: #ffb400;
      border-radius: 50%;
      position: absolute;
      z-index: 3;
    }
    .flight-dots:first-of-type {
      top: 298px;
      left: 937px;
    }
    .flight-dots:nth-of-type(2) {
      top: 413px;
      left: 750px;
    }
    .flight-dots:nth-of-type(3) {
      top: 818px;
      left: 700px;
    }
    .flight-dots:nth-of-type(4) {
      top: 761px;
      left: 999px;
    }
    .flight-dots:last-of-type {
      top: 980px;
      left: 842px;
    }
  }
  .dots-title {
    background-image: url(../assets/img/title_bg.png);
    background-size: 100% 100%;
    width: 470px;
    height: 120px;
    font-size: 48px;
    font-family: FZLanTingHei-R-GBK;
    font-weight: 400;
    color: #ffffff;
    line-height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .yuan {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid;
    color: #909399;
    animation: 5s blink-normal infinite step-end;
  }
  .dots-box {
    color: #ffffff;
    font-size: 20px;
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-shrink: 0;
    .dots {
      width: 16px;
      height: 16px;
      background: #d53838;
      border: 4px solid #ffffff;
      border-radius: 50%;
      flex-shrink: 0;
      margin-left: 6px;
    }
    .dots-item::after {
      background-color: #2ea598;
    }
    .dots-item::before {
      background-color: rgba(0, 188, 244, 0.1);
    }
    .dots-item::before,
    .dots-item::after {
      content: "";
      widows: 80px;
      height: 80px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -40px;
      margin-top: -40px;
      border-radius: 50%;
      animation: warn 1.5s ease-out 0s infinite;
    }
    @keyframes warn {
      0% {
        transform: scale(0.5);
        opacity: 1;
      }
      30% {
        opacity: 1;
      }
      100% {
        transform: scale(1.4);
        opacity: 0;
      }
    }
  }
}
@keyframes scale {
  0% {
    transform: scale(1);
  }

  50%,
  75% {
    transform: scale(3);
  }

  78%,
  100% {
    opacity: 0;
  }
}

@keyframes scales {
  0% {
    transform: scale(1);
  }

  50%,
  75% {
    transform: scale(2);
  }

  78%,
  100% {
    opacity: 0;
  }
}

#chart {
  width: 1500px;
  height: 2000px;
}

.smallcircle2 {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 4px solid #ffffff;
  background-color: #ffb400;
  border-radius: 50%;
  top: 305px;
  left: 61%;
}

.smallcircle2:before {
  content: "";
  display: block;
  width: 30px;
  height: 30px;
  border: 4px solid #ffffff;
  border-radius: 50%;
  opacity: 0.4;
  background-color: #ffffff;
  // animation: scale 1s infinite cubic-bezier(0, 0, 0.49, 1.02);
}

.bigcircle2 {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 4px solid #ffffff;
  border-radius: 50%;
  opacity: 0.3;
  background-color: #ffffff;
  top: 305px;
  left: 61%;
  // animation: scales 1s infinite cubic-bezier(0, 0, 0.49, 1.02);
}

@keyframes scaless {
  0% {
    transform: scale(1);
  }

  50%,
  75% {
    transform: scale(3);
  }

  78%,
  100% {
    opacity: 0;
  }
}
</style>
