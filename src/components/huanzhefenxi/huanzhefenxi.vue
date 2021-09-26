<template>
  <div class="keshifenxi">
    <div class="keshi-title"></div>
    <div class="keshi-box">
      <div class="renyuan">
        <div class="renyuan-title"></p>本年度各月份病患数量</div>
        <div id="binhuan"></div>
      </div>
      <div class="keshi">
        <div class="renyuan-title">诊断结果分析</div>
        <div id="zhenduan"></div>
      </div>
      <div class="yaopin">
        <div class="renyuan-title">患者综合分析</div>
        <div id="huanzhe"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["renyuan", "keshidan", "roseData"],
  data() {
    return {
      arr: {},
      yaopinList: [],
      myChart: null,
      chart: [],
      zhenChart: null,
      huanzheChart: null,
      huanzheLists: {},
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.arr = this.renyuan;
      this.huanzheLists = this.roseData;
      this.chart = this.keshidan;
      this.arr && this.initchart();
      this.chart && this.initZhen();
      console.log("---------", this.roseData);
      this.getPieData1();
      this.huanzheLists && this.initHuan();
    });
  },
  methods: {
    initchart() {
      this.myChart = this.$echarts.init(document.getElementById("binhuan"));
      this.myChart.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.arr?.x,
        },
        grid: {
          left: "3%",
          right: 0,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            color: "rgba(0, 188, 244, 0.5)",
          },
        },
        series: [
          {
            data: this.arr?.y,
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(0, 222, 255, 1)",
            },
            areaStyle: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 222, 255, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(0, 222, 255, 0.1)",
                },
              ]),
            },
          },
        ],
      });
    },
    initZhen() {
      this.zhenChart = this.$echarts.init(document.getElementById("zhenduan"));
      this.zhenChart.setOption({
        grid: {
          left: "3%",
          right: 0,
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            fontSize: 24,
            color: "rgba(0, 188, 244, 1)",
          },
          splitLine: {
            show: false,
          },
          data: this.chart?.x,
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
        },
        series: [
          {
            data: this.chart?.y,
            type: "bar",
            barWidth: 12,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(0, 188, 244, 0.2)",
            },
          },
        ],
      });
    },
    getPieData1() {
      let acount
      let arr = []
      for(let v of this.huanzheLists.rose1) {
        console.log('99999999', v.data.length)
        acount += v.data.length - 0
      }
      
      for (let v of this.huanzheLists.rose1) {
        let color;
        let obj = {
          value: "",
          name: "rose 1",
          itemStyle: {
            borderRadius: 8,
            color: color,
          },
        };
        if (v.name == "N") {
          color = "rgba(134, 228, 255, 1)";
          obj = {
            value: v.data ? v.data.length / acount * 100: 0,
            name: "rose 1",
            itemStyle: {
              borderRadius: 8,
              color: color,
            },
          };
          arr.push(obj);
        } else {
          color = "rgba(25, 100, 150, 1)";
          obj = {
            value: v.data ? v.data.length / acount * 100: 0,
            name: "rose 1",
            itemStyle: {
              borderRadius: 8,
              color: color,
            },
          };
          arr.push(obj);
        }
      }
      return arr;
    },
     getPieData2() {
      let arr = [];
      let acount
      for(let v of this.huanzheLists.rose1) {
        acount += v.data.length
      }
      for (let v of this.huanzheLists.rose1) {
        let color;
        let obj = {
          value: "",
          name: "rose 1",
          itemStyle: {
            borderRadius: 8,
            color: color,
          },
        };
        if (v.name == "N") {
          color = "rgba(134, 228, 255, 1)";
          obj = {
            value: v.data ? v.data.length / acount * 100: 0,
            name: "rose 1",
            itemStyle: {
              borderRadius: 8,
              color: color,
            },
          };
          arr.push(obj);
        } else {
          color = "rgba(25, 100, 150, 1)";
          obj = {
            value: v.data ? v.data.length / acount * 100: 0,
            name: "rose 1",
            itemStyle: {
              borderRadius: 8,
              color: color,
            },
          };
          arr.push(obj);
        }
      }
      return arr;
    },
    initHuan() {
      this.huanzheChart = this.$echarts.init(
        document.getElementById("huanzhe")
      );
      this.huanzheChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        grid: {
          left: "3%",
          right: 0,
        },
        legend: {
          left: "center",
          top: "bottom",
          data: [
            "rose1",
            "rose2",
            "rose3",
            "rose4",
            "rose5",
            "rose6",
            "rose7",
            "rose8",
          ],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Area Mode",
            type: "pie",
            radius: [20, 80],
            center: ["25%", "25%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
            data: this.getPieData1(),
          },
          {
            name: "Area Mode",
            type: "pie",
            radius: [20, 80],
            center: ["75%", "25%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
            data: this.getPieData2()
          },
          {
            name: "Area Mode",
            type: "pie",
            radius: [20, 80],
            center: ["25%", "75%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
           data: this.getPieData1()
          },
          {
            name: "Area Mode",
            type: "pie",
            radius: [20, 80],
            center: ["75%", "75%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 5,
            },
            data: this.getPieData1()
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.keshifenxi {
  width: 920px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 46px;
  .keshi-title {
    width: 290px;
    height: 70px;
    background-image: url(../../assets/img/titler.png);
    background-size: 100% 100%;
    margin-bottom: 40px;
  }
  .keshi-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .renyuan {
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
      #binhuan {
        width: 943px;
        height: 375px;
      }
      .renyuan-title {
        width: 500px;
        height: 60px;
        padding-left: 36px;
        text-align: left;
        background-image: url(../../assets/img/title-bj.png);
        background-size: 100% 100%;
        font-size: 32px;
        font-family: FZLanTingHei-R-GBK;
        font-weight: bold;
        color: #ffffff;
      }
    }
    .keshi {
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 80px;
      .renyuan-title {
        width: 500px;
        height: 60px;
        padding-left: 36px;
        text-align: left;
        background-image: url(../../assets/img/title-bj.png);
        background-size: 100% 100%;
        font-size: 32px;
        font-family: FZLanTingHei-R-GBK;
        font-weight: bold;
        color: #ffffff;
      }
      #zhenduan {
        width: 896px;
        height: 600px;
      }
    }
    .yaopin {
      width: 100%;
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 50px;
      .renyuan-title {
        width: 500px;
        height: 60px;
        padding-left: 36px;
        text-align: left;
        background-image: url(../../assets/img/title-bj.png);
        background-size: 100% 100%;
        font-size: 32px;
        font-family: FZLanTingHei-R-GBK;
        font-weight: bold;
        color: #ffffff;
      }
      #huanzhe {
        width: 100%;
        height: 590px;
      }
    }
  }
}
</style>