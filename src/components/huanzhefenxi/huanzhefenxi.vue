<template>
  <div class="keshifenxi">
    <div class="keshi-title"></div>
    <div class="keshi-box">
      <div class="renyuan">
        <div class="renyuan-title">本年度各月份病患数量</div>
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
  props: ["renyuan", "keshidan", "yaopin"],
  data() {
    return {
      arr: {},
      yaopinList: [],
      myChart: null,
      chart: [],
      zhenChart: null,
      huanzheChart: null,
      huanzheList: {}
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.arr = this.renyuan;
      this.huanzheList = this.yaopin;
      this.chart = this.keshidan
      this.arr && this.initchart();
      this.chart && this.initZhen()
    //   this.huanzheList && this.initHuan()
    this.initHuan()
    });
  },
  methods: {
    initchart() {
      this.myChart = this.$echarts.init(document.getElementById("binhuan"));
      this.myChart.setOption({
         xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.arr ?. x
    },
    yAxis: {
        type: 'value',
         axisLabel: {
            show: false
        },
        axisLine: {
            show:false
        },
        axisTick: {
            show: false
        }
    },
    series: [{
        data: this.arr ?. y,
        type: 'line',
         itemStyle: {
                color: 'rgba(0, 222, 255, 1)'
            },
        areaStyle: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 222, 255, 1)'
                }, {
                    offset: 1,
                    color: '#ffe'
                }])
            },
    }]
        
      });
    },
    initZhen() {
            this.zhenChart = this.$echarts.init(document.getElementById("zhenduan"));
      this.zhenChart.setOption({
        xAxis: {
          type: "value",
          show: false,
        },
        grid: {
          top: 0,
          bottom: 0,
        },
        yAxis: {
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
          data: this.chart ?. x,
        },
        series: [
          {
            data: this.chart ?. y,
            type: "bar",
            barWidth: 10,
            barCategoryGap: 39,
            showBackground: true,
            label: {
              show: true,
              position: "right",
            },
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      });
    },
    initHuan() {
        this.huanzheChart = this.$echarts.init(document.getElementById('huanzhe'))
        this.huanzheChart.setOption({
             tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: [
      'rose1',
      'rose2',
      'rose3',
      'rose4',
      'rose5',
      'rose6',
      'rose7',
      'rose8'
    ]
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Area Mode',
      type: 'pie',
      radius: [20, 80],
      center: ['25%', '25%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5
      },
      data: [
        { value: 30, name: 'rose 1' },
        { value: 28, name: 'rose 2' },
        { value: 26, name: 'rose 3' },
       
      ]
    },
    {
      name: 'Area Mode',
      type: 'pie',
      radius: [20, 80],
      center: ['75%', '25%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5
      },
      data: [
        { value: 30, name: 'rose 1' },
        { value: 28, name: 'rose 2' },
        { value: 26, name: 'rose 3' },
       
      ]
    },
    {
      name: 'Area Mode',
      type: 'pie',
      radius: [20, 80],
      center: ['25%', '75%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5
      },
      data: [
        { value: 30, name: 'rose 1' },
        { value: 28, name: 'rose 2' },
        { value: 26, name: 'rose 3' },
       
      ]
    },
    {
      name: 'Area Mode',
      type: 'pie',
      radius: [20, 80],
      center: ['75%', '75%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5
      },
      data: [
        { value: 30, name: 'rose 1' },
        { value: 28, name: 'rose 2' },
        { value: 26, name: 'rose 3' },
      ]
    }
  ]
        })
    }
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
      #keshi {
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