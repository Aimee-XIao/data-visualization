<template>
  <div class="keshifenxi">
    <div class="keshi-title"></div>
    <div class="keshi-box">
      <div class="renyuan">
        <div class="renyuan-title">
          <p class="shadow"></p>
          本年度各月份病患数量
        </div>
        <div id="binhuan"></div>
      </div>
      <div class="keshi">
        <div class="renyuan-title">
          <p class="shadow"></p>
          诊断结果分析
        </div>
        <div id="zhenduan"></div>
      </div>
      <div class="yaopin">
        <div class="renyuan-title">
          <p class="shadow"></p>
          患者综合分析
        </div>
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
      yaopinList: [],
      myChart: null,
      zhenChart: null,
      huanzheChart: null,
      huanzheLists: {},
    };
  },
  watch: {
    renyuan: {
      handler() {
        this.initchart();
      },
      deep: true,
    },
    keshidan: {
      handler() {
        this.initZhen();
      },
      deep: true,
    },
    roseData: {
      handler() {
        this.initHuan();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.renyuan && this.initchart();
      this.keshidan && this.initZhen();
      this.roseData && this.initHuan();
    });
  },
  methods: {
    initchart() {
      this.myChart = this.$echarts.init(document.getElementById("binhuan"));
      this.myChart.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.renyuan?.x,
          axisLabel: {
            fontSize: 20,
            color: "rgba(0, 188, 244, 1)",
          },
        },
        grid: {
          left: "2%",
          right: "2%",
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            data: this.renyuan?.y,
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
          left: "10%",
          right: 0,
          bottom: "16%",
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            fontSize: 20,
            color: "rgba(0, 188, 244, 1)",
            interval: 0,
            rotate: 30,
          },
          splitLine: {
            show: false,
          },
          data: this.keshidan?.x,
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            fontSize: 24,
            color: "rgba(0, 188, 244, 1)",
          },
        },
        series: [
          {
            data: this.keshidan?.y,
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
          bottom: 0,
        },
        title: [
          {
            left: "15%",
            top: 0,
            text: "患者身份比例",
            padding: [0, 0, 80, 0],
            textStyle: {
              fontSize: 28,
              fontWeight: "bold",
              lineHeight: 80,
              color: "#fff",
            },
          },
          {
            left: "75%",
            top: 0,
            text: "初复诊情况",
            textStyle: {
              fontSize: 28,
              fontWeight: "bold",
              lineHeight: 80,
              color: "#fff",
            },
          },
          {
            left: "15%",
            top: "45%",
            text: "患者处置情况",
            textStyle: {
              fontSize: 28,
              fontWeight: "bold",
              lineHeight: 80,
              color: "#fff",
            },
          },
          {
            left: "75%",
            top: "45%",
            text: "患者完成状态",
            textStyle: {
              fontSize: 28,
              fontWeight: "bold",
              lineHeight: 80,
              color: "#fff",
            },
          },
        ],
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
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{c} %}",
          minMargin: 10,
          edgeDistance: 10,
          lineHeight: 26,
          fontSize: 24,
          color: "rgba(25, 175, 225, 1)",
          rich: {
            time: {
              fontSize: 24,
              color: "rgba(25, 175, 225, 1)",
            },
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
            data: this.roseData?.rose1,
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
            data: this.roseData?.rose2,
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
            data: this.roseData?.rose3,
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
            data: this.roseData?.rose4,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.keshifenxi {
  width: 980px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 46px;
  .keshi-title {
    width: 290px;
    height: 70px;
    background-image: url("data:image/png;base64,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");
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
      width: 100%;
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
      #binhuan {
        width: 980px;
        height: 375px;
      }
      .renyuan-title {
        width: 500px;
        height: 60px;
        padding-left: 36px;
        text-align: left;
        background-image: url("data:image/png;base64,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");
        background-size: 100% 130%;
        display: flex;
        align-items: center;
        font-size: 32px;
        font-family: FZLanTingHei-R-GBK;
        font-weight: bold;
        color: #ffffff;
        position: relative;
        .shadow {
          height: 56px;
          width: 10px;
          position: absolute;
          left: 0;
          top: 1px;
          background-color: #00b4ff;
          box-shadow: 0px 0px 20px rgba(0, 180, 255, 1);
        }
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
        background-image: url("data:image/png;base64,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");
        background-size: 100% 130%;
        display: flex;
        align-items: center;
        font-size: 32px;
        font-family: FZLanTingHei-R-GBK;
        font-weight: bold;
        color: #ffffff;
        position: relative;
        .shadow {
          height: 56px;
          width: 10px;
          position: absolute;
          left: 0;
          top: 1px;
          background-color: #00b4ff;
          box-shadow: 0px 0px 20px rgba(0, 180, 255, 1);
        }
      }
      #zhenduan {
        width: 980px;
        height: 490px;
      }
    }
    .yaopin {
      width: 100%;
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 100px;
      .renyuan-title {
        width: 500px;
        height: 60px;
        padding-left: 36px;
        text-align: left;
        background-image: url("data:image/png;base64,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");
        background-size: 100% 130%;
        display: flex;
        align-items: center;
        font-size: 32px;
        font-family: FZLanTingHei-R-GBK;
        font-weight: bold;
        color: #ffffff;
        position: relative;
        .shadow {
          height: 56px;
          width: 10px;
          position: absolute;
          left: 0;
          top: 1px;
          background-color: #00b4ff;
          box-shadow: 0px 0px 20px rgba(0, 180, 255, 1);
        }
      }
      #huanzhe {
        width: 100%;
        height: 650px;
      }
    }
  }
}
</style>