<template>
  <div class="keshifenxi">
    <div class="keshi-title"></div>
    <div class="keshi-box">
      <div class="renyuan">
        <div class="renyuan-title">
          <p class="shadow"></p>
          各科室接诊人员统计
        </div>
        <div class="renyuan-box">
          <div
            v-for="(item, index) in renyuan"
            class="renyuan-item"
            :key="index"
          >
            <p class="number">{{ item.number }}</p>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="keshi">
        <div class="renyuan-title">
          <p class="shadow"></p>
          各科室开单情况
        </div>
        <div id="keshi"></div>
      </div>
      <div class="yaopin">
        <div class="renyuan-title">
          <p class="shadow"></p>
          各科室药品开单情况
        </div>
        <div class="yaopin-box">
          <div class="header">
            <p class="xuhao"></p>
            <p class="keshiming">科室名称</p>
            <p class="yaopinlei">药品类别</p>
            <p class="yaopinming">药品名称</p>
            <p class="yaopinshu">药品数量</p>
          </div>
          <div class="ranking_wrap ranking_roll" id="wrapper">
            <div class="item-box" id="list_one">
            <div v-for="(ite, ind) in yaopin" class="item" :key="ind">
              <p class="xuhao">{{ ind + 1 }}</p>
              <p class="keshiming">{{ ite.billingDepartment }}</p>
              <p class="yaopinlei">{{ ite.drugType }}</p>
              <p class="yaopinming">{{ ite.drugname }}</p>
              <p class="yaopinshu">{{ ite.number }}</p>
            </div>
          </div>
          <div class="item-box" id="list_two" style="margin-bottom: 8px;"></div>
          </div>
          <!-- <vue-seamless-scroll
            :data="yaopin"
            class="item-box"
            :class-option="classOption"
          >
            <div v-for="(ite, ind) in yaopin" class="item" :key="ind">
              <p class="xuhao">{{ ind + 1 }}</p>
              <p class="keshiming">{{ ite.billingDepartment }}</p>
              <p class="yaopinlei">{{ ite.drugType }}</p>
              <p class="yaopinming">{{ ite.drugName }}</p>
              <p class="yaopinshu">{{ ite.number }}</p>
            </div>
          </vue-seamless-scroll> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  props: ["renyuan", "keshidan", "yaopin"],
  data() {
    return {
      yaopinList: [],
      myChart: null,
      chart: {
        x: [
          "皮肤科",
          "皮肤科",
          "皮肤科",
          "皮肤科",
          "皮肤科",
          "皮肤科",
          "急诊内科",
          "皮肤科",
          "皮肤科",
          "皮肤科",
          "儿科重症监护室",
          "皮肤科",
          "皮肤科",
          "皮肤科",
          "皮肤科",
          "皮肤科",
          "皮肤科",
          "皮肤科",
        ],
        y: [
          10, 23, 45, 65, 43, 10, 23, 45, 65, 43, 10, 23, 45, 65, 43, 10, 23,
          45, 65, 43, 10, 23, 45, 65, 43,
        ],
      },
    };
  },
  components: {
    //组件
    vueSeamlessScroll,
  },
  computed: {
    classOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: this.yaopin ? this.yaopin.length : 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  watch: {
    renyuan: {
      handler() {
        this.initchart();
      },
      deep: true,
    },
  },

  mounted() {
    console.log('-------------', this.yaopin)
    this.$nextTick(() => {
     
      this.keshidan && this.initchart();
       this.scroll();
    });
  },
  methods: {
    scroll() {
        let speed = 100;
        let wrapper = document.getElementById('wrapper');
        let list_one = document.getElementById('list_one');
        let list_two = document.getElementById('list_two');
        list_two.innerHTML = list_one.innerHTML;
        function Marquee() {
          if (list_two.offsetHeight - wrapper.scrollTop <= 0)
            wrapper.scrollTop -= list_one.offsetHeight;
          else {
            wrapper.scrollTop += 1
          }
        }
        let MyMar = setInterval(Marquee, speed);
        wrapper.onmouseover = function () {clearInterval(MyMar)};
        wrapper.onmouseout = function () {MyMar = setInterval(Marquee, speed)};
      },
    initchart() {
      this.myChart = this.$echarts.init(document.getElementById("keshi"));
      this.myChart.setOption({
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
  },
};
</script>

<style lang="scss" scoped>
.ranking_roll {
    max-height: 500px;
    overflow: hidden;
  }
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
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
      .renyuan-title {
        width: 500px;
        height: 60px;
        padding-left: 36px;
        text-align: left;
        background-image: url("data:image/png;base64,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");
        background-size: 100% 132%;
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
      .renyuan-box {
        height: 468px;
        overflow: hidden;
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        .renyuan-item {
          width: 124px;
          height: 156px;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAACcAgMAAADANCevAAAACVBMVEUZr+EZr+EPVF60j5u+AAAAAnRSTlMmRiryqrkAAAA+SURBVFjD7dehEQAgDATBaPrDUB0GQ5U0wAQR5J5d/zMfO+/pM7Ia55xzzjnnnPM/Xv5vq2cNzjnnd6/u7wEjZ4GbVPP2AAAAAABJRU5ErkJggg==");
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
            padding: 0 2px;
            font-size: 24px;
            font-family: FZLanTingHei-R-GBK;
            font-weight: 400;
            color: #00bcf4;
            line-height: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
      .yaopin-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 590px;
        overflow: hidden;
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
            // flex-shrink: 0;
            font-size: 28px;
            font-family: FZLanTingHei-R-GBK;
            font-weight: 400;
            color: #1bc6fe;
            line-height: 90px;
            padding: 0 20px;
            box-sizing: content-box;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
          // height: 500px;
          // overflow: hidden;

          .item {
            width: 100%;
            height: 85px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 8px;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4QAAABUBAMAAAAotuS6AAAAIVBMVEUARlsAVW8AgKYAfaIAAAAAY4EAaooAWHIAfaIAfaIAfaKX8/rpAAAAC3RSTlNNTU1IAE1NTTYVI/3KSOEAAAJLSURBVHja7dY7btxAEITh3oC5yWjjAWzDDunEB+hkQhsQBGwuBcoU6R4cHWEOquU+uMNIWEWsqv6v8KEabd6W/0Ro/V0TlvR5j2/b6ptpt18R5jF93r9+Y5l2a8KSghCuFWEeIQnFL+mKsCRIQvEZtoR5DELAWsKSQAm1L2lDmEdUQu0ZNoQlBSFiN8I84hJKX9IbYUm4hNIzXAjzGISYLYQlIRMqX9IrYR6hCZVneCUsKQhBuxDmEZxQ+JJeCEsCJxSe4ZkwpyCE7Uw44RPqXtITYU74hLozPBFOQQjcTJgTA6HsJZ0JJwpC2RkeCXMKQuSOhBMJoeol3VtOJISqM9zbFITY7S3REIpeUiZC0RlSEWrOMAjhoyLUvKRchJIzDEL4uAglLykZoeIMgxA+MkLFS8pGKDjDIISPjVDwkgYhfGyEcUjhCU2vIISPjFDwjrIRmmBBCB8XoeIdJSM0xYIQPipCyTvKRWiSBSF8TISad/QrhK/9RjPNDncTfu+3mknWVYs7it3BLUYIXVfdWEYoSnjwewl/9ltN84521d1I3lHdEbqRjFCTsKszIckINe/oix+zGCFuXT0RcoxQknB38DnjGKHkHR3qmTBGiNrut58yihFKEg71QkgxQsU7eh2hW4wQtKFeCRlGqEi4jNCNYYSKd3SoC2GMELLbCN0IRqhIOLzfTdhvOME7uvvlS0YwQkHCZoRu+CMUvKPtCN1ihIC1I3TDH6Ee4WqEbvAjFLyjqxG6xQjhmkd4J+GP5y339KDW/3dv+wA2Vt29cJEoVQAAAABJRU5ErkJggg==");
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
              overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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