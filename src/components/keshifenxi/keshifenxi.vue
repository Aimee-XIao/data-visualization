<template>
  <div class="keshifenxi">
    <div class="keshi-title"></div>
    <div class="keshi-box">
      <div class="renyuan">
        <div class="renyuan-title">各科室接诊人员统计</div>
        <div class="renyuan-box">
          <div
            v-for="(item, index) in renyuan"
            class="renyuan-item"
            :key="index"
          >
            <p class="number">{{ item.data.length }}</p>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="keshi">
        <div class="renyuan-title">各科室开单情况</div>
        <div id="keshi"></div>
      </div>
      <div class="yaopin">
        <div class="renyuan-title">各科室药品开单情况</div>
        <div class="yaopin-box">
          <div class="header">
            <p class="xuhao"></p>
            <p class="keshiming">科室名称</p>
            <p class="yaopinlei">药品类别</p>
            <p class="yaopinming">药品名称</p>
            <p class="yaopinshu">药品数量</p>
          </div>
          <div class="item-box">
            <div v-for="(ite, ind) in yaopinList" class="item" :key="ind">
              <p class="xuhao">{{ ind + 1 }}</p>
              <p class="keshiming">{{ ite.billingDepartment }}</p>
              <p class="yaopinlei">{{ ite.drugType }}</p>
              <p class="yaopinming">{{ ite.drugName }}</p>
              <p class="yaopinshu">{{ ite.number }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["renyuan", "keshidan", "yaopin"],
  data() {
    return {
      arr: [],
      yaopinList: [],
      myChart: null,
      chart: [],
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.arr = this.renyuan;
      this.yaopinList = this.yaopin;
      this.chart = this.keshidan;
      console.log('keshidan', this.keshidan)
      this.chart && this.initchart();
    });
  },
  methods: {
    initchart() {
      this.myChart = this.$echarts.init(document.getElementById("keshi"));
      this.myChart.setOption({
        grid: {
          left: '3%',
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
          data: this.keshidan ?. x,
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
            data: this.keshidan ?. y,
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
  },
};
</script>

<style lang="scss" scoped>
.keshifenxi {
  width: 920px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 46px;
  .keshi-title {
    width: 290px;
    height: 70px;
    background-image: url(../../assets/img/titlel.png);
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
      .renyuan-box {
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        .renyuan-item {
          width: 124px;
          height: 156px;
          background-image: url(../../assets/img/chart1_bg7.png);
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .number {
            font-size: 36px;
            font-family: Arial;
            font-weight: 400;
            color: #00bcf4;
            line-height: 48px;
            margin-top: 40px;
          }
          .name {
            font-size: 24px;
            font-family: FZLanTingHei-R-GBK;
            font-weight: 400;
            color: #00bcf4;
            line-height: 48px;
          }
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
        background-image: url(../../assets/img/title-bj.png);
        background-size: 100% 100%;
        font-size: 32px;
        font-family: FZLanTingHei-R-GBK;
        font-weight: bold;
        color: #ffffff;
      }
      #keshi {
        width: 896px;
        height: 490px;
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
      .yaopin-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        .header {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .xuhao {
            width: 98px;
            flex-shrink: 0;
          }
          .keshiming {
            width: 120px;
            flex-shrink: 0;
            font-size: 28px;
            font-family: FZLanTingHei-R-GBK;
            font-weight: 400;
            color: #1bc6fe;
            line-height: 90px;
            padding: 0 20px;
            box-sizing: content-box;
            text-align: left;
          }
          .yaopinlei {
            width: 120px;
            flex-shrink: 0;
            font-size: 28px;
            font-family: FZLanTingHei-R-GBK;
            font-weight: 400;
            color: #1bc6fe;
            line-height: 90px;
            padding: 0 20px;
            box-sizing: content-box;
            text-align: left;
          }
          .yaopinming {
            flex: 1;
            flex-shrink: 0;
            font-size: 28px;
            font-family: FZLanTingHei-R-GBK;
            font-weight: 400;
            color: #1bc6fe;
            line-height: 90px;
            padding: 0 20px;
            box-sizing: content-box;
            text-align: left;
          }
          .yaopinshu {
            width: 120px;
            flex-shrink: 0;
            font-size: 28px;
            font-family: FZLanTingHei-R-GBK;
            font-weight: 400;
            color: #1bc6fe;
            line-height: 90px;
            padding: 0 20px;
            box-sizing: content-box;
            text-align: left;
          }
        }
        .item-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          height: 500px;
          overflow-x: hidden;
          overflow-y: auto;
          .item {
            width: 100%;
            height: 85px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 8px;
            background-image: url(../../assets/img/chart3_bg.png);
            background-size: 100% 100%;
            .xuhao {
              width: 98px;
              flex-shrink: 0;
              font-size: 28px;
              font-family: FZLanTingHei-R-GBK;
              font-weight: 400;
              color: #197daf;
              line-height: 90px;
            }
            .keshiming {
              width: 120px;
              flex-shrink: 0;
              font-size: 28px;
              font-family: FZLanTingHei-R-GBK;
              font-weight: 400;
              color: #197daf;
              line-height: 90px;
              padding: 0 20px;
              box-sizing: content-box;
              text-align: left;
            }
            .yaopinlei {
              width: 120px;
              flex-shrink: 0;
              font-size: 28px;
              font-family: FZLanTingHei-R-GBK;
              font-weight: 400;
              color: #197daf;
              line-height: 90px;
              padding: 0 20px;
              box-sizing: content-box;
              text-align: left;
            }
            .yaopinming {
              flex: 1;
              flex-shrink: 0;
              font-size: 28px;
              font-family: FZLanTingHei-R-GBK;
              font-weight: 400;
              color: #197daf;
              padding: 0 20px;
              box-sizing: content-box;
              text-align: left;
              line-height: 90px;
            }
            .yaopinshu {
              width: 120px;
              flex-shrink: 0;
              font-size: 28px;
              font-family: FZLanTingHei-R-GBK;
              font-weight: 400;
              color: #197daf;
              line-height: 90px;
              padding: 0 20px;
              box-sizing: content-box;
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>