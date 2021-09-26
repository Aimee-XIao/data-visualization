<template>
  <div class="map-dots">
    <div>
      <div class="xian"></div>
      <div class="xian-title"></div>
    </div>
    <div class="dots-title">共40家医院</div>
    <div class="nanjing-big">
      <div class="nanjing">
        <div class="nanjing-dots"></div>
      </div>
    </div>
    <div class="lines">
      <div class="line-icons">
        <img src="../assets/img/plane.png" alt="" />
      </div>
    </div>
    <!-- 航线 -->
    <div class="flight-line">
      <div class="flight-dots"></div>
      <div class="flight-dots"></div>
      <div class="flight-dots"></div>
      <div class="flight-dots"></div>
      <div class="flight-dots"></div>
      <div class="flight-dots"></div>
    </div>
    <div style="position: absolute; top: -357px; left: 80px">
      <div id="chart"></div>
    </div>

    <div>
      <div
        class="dots-box"
        v-for="(item, index) in doctorList"
        :key="index"
        
        :style="{ top: item.top + 'px', left: item.left + 'px' }"
        @click="select(item)"
      >
        <!-- -->
        <p  v-if="current == item.id  " class="name-box" style="margin-top: 24px; flex-shink: 0">
          {{ item.unit }}
        </p>
         <p  v-if="current == 1 && (item.id == 5 || item.id == 40) " class="name-box" style="margin-top: 24px; flex-shink: 0">
          {{ item.unit }}
        </p>
        <p v-if="current != item.id" class="dots dots-item"></p>
        <p v-if="current == item.id" :class="current == item.id ? 'select' : ''"></p>
      </div>
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
      current: 1,
      planePath:
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
    };
  },
  computed: {
    doctorList() {
      let arr = dots.splice(1)
      return arr.map((item) => {
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
  },
  methods: {
    select(item) {
      this.current = item.id;
      this.$emit("select", "list" + item.id);
    },
    initmap() {
      // 1. 实例化对象
      this.$echarts.registerMap("china", { geoJSON: chinaMap });
      this.myChart = this.$echarts.init(document.getElementById("chart"));
      // 2. 指定配置和数据
      var geoCoordMap = {
        包头: [110.3467, 41.4899],
        广州: [113.5107, 23.2196],
        拉萨: [98.1865, 20.1465],
        无锡: [105.1865, 15.1465],
        徐州医学院附属淮海医院: [101.4038, 36.8207],
        南京医院: [109.1162, 34.2004],
      };

      var XAData = [
        [{ name: "包头" }, { name: "南京医院", value: 100 }],
        [{ name: "无锡" }, { name: "南京医院", value: 100 }],
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

      var color = ["#ffb400", "#ffb400", "#ffb400"]; //航线的颜色
      var series = [];
      [["南京医院", XAData]].forEach(function (item, i) {
        series.push(
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 1,
            symbolSize: 24,
            effect: {
              show: true,
              period: 6,
              color: "#fff",
              trailLength: 0,
              symbol: planePath,
              symbolSize: 24,
            },
            lineStyle: {
              width: 2,
              color: "#ffb400",
              opacity: 0.2,
              normal: {
                color: color[i],
                width: 4,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top3",
            type: "lines",
            zlevel: 2,
            symbol: ["none", "none"],
            symbolSize: 24,
            effect: {
              show: true,
              period: 6,
              color: "#fff",
              trailLength: 0,
              symbol: planePath,
              symbolSize: 24,
            },
            itemStyle: {
              color: "#fff",
            },
            lineStyle: {
              width: 2,
              color: "#ffb400",
              opacity: 0.2,
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
            zlevel: 3,
            symbol: ["none", "none"],
            symbolSize: 24,
            effect: {
              show: true,
              period: 6,
              color: "#fff",
              trailLength: 0,
              symbol: planePath,
              symbolSize: 24,
            },
            lineStyle: {
              width: 2,
              color: "#ffb400",
              opacity: 0.2,
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
            zlevel: 5,
            symbol: ["none", "none"],
            symbolSize: 24,
            effect: {
              show: true,
              period: 6,
              color: "#fff",
              trailLength: 0,
              symbol: planePath,
              symbolSize: 24,
            },
            lineStyle: {
              width: 2,
              color: "#ffb400",
              opacity: 0.2,
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
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 4,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: false,
                position: "right",
                formatter: "{b}",
              },
            },
            symbolSize: function (val) {
              return val[2] / 8;
            },
            lineStyle: {
              width: 2,
              color: "#ffb400",
              opacity: 0.2,
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.2,
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
        geo: {
          show: false,
          map: "china",
          label: {
            emphasis: {
              show: false,
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
.name-box {
      height: 40px;
    border-radius: 6px;
        top: -90px;
    left: -40px;
    word-break: keep-all;
    z-index: 4;
    padding: 6px 20px;
    align-items: center;
    display: flex;
    position: absolute;
    color: #fff;
    font-size: 36px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdYAAAB4BAMAAAC9Vc5DAAAAFVBMVEUAvPQVx/YNw/YAvPQBvfUVx/YAvPQH5dgnAAAAB3RSTlMzPTgl1y7UcMnR+wAAAh1JREFUeNrtnUFKA0EURL8W7o3Sez2DeINmLiDeYMj9j2A+icSQLIR0Vxc99RdBHtlMFVKbRyZqXvy9x93hXmIqlg+53HjW9/zOW0zFlrzIB65qNTRkV72q1dCYnXtdLnp9yK88R8RU7NTrctnrLi//mIqdej18VLUa2rHr/1e1Gpqyc6/5UdVqaM5q3vFTah96sJonuA+9WBkfOY0VjcgprGhETmFFI3IKKxqRU1jRm/1urOjNfjf2qhE5hUEjcgqDRuQUBo3IKQwCW8BiGD/xNAaNyCkMGpFTGDQipzBoRE5h0IicwjB+4mkM4yeexqAROYVBI3IKg0bkFAaBLWAxxPgtYDGEROQUhpCInMIQEpFTGEIicgpDSEROYYjhE09jiOETT2MIicgpDCEROYUhJCKnsCeNyCmsCGyB3RC7IXZD7IbYDRkeeX9mN0Rh9u2G2A2xG3KDQSNyArMbIjD7dkPshtgNsRuiEHlvZjdEY/bthtgN+TeDRuRdmd0QnX2wG2I3xG7I5t0Qhci7MbshUrNvN8RuiN2QG6xoRE5hdkPmZHZD5mR2Q+ZkRSNyCivjJ95uiN0QuyF2Q+yGCO6D3RC7IXZD7IYIRG43xG6I3RC7IRt2Q2peCNbQnGEjvxqeD7n4nTI7wWruYnVd1/3W3imzzv9Omd9e16Wq1dCOXfeqVkNbdu51WavfKTMTO/b6cXGf34f7mo/t834AE+2J7j+qYIoAAAAASUVORK5CYII=');
}
.map-dots {
  width: 1500px;
  height: 1200px;
  // background: #ccc;
  position: absolute;
  top: 301px;
  left: 1160px;
  display: flex;
  justify-content: center;
  .lines {
    width: 768px;
    height: 5px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwAAAAANCAYAAAAe9wnNAAAFCklEQVR4Xu2br65eRRTF11YoMAQHPABF4cAQEBQFiioSRBtMAwlYBPACJYFgCH0AqAJFKyAYcCjaB6B1pAYUapOdDMlN0zt7rZMz3NvvW8d+c+fO+e21Z/+ZOQE/JmACJmACJmACJmACJmACR0MgjuZN/aImYAImYAImYAImYAImYAJwAWARmIAJmIAJmIAJmIAJmMAREdhcAGTmewCeZFhFxCfMuMykxgG4HRE3ujkz8wKAt7px4/f7EfFFNzYznwJwtRs3fv85In7qxmbmKwBe7saN329ExO1ubGbWe9f7t88C+9T//DIi/uz+uaCjFfZZoaPd7QNghY72tg8W6IiyT2lM2DtW6GiFfXbXkWAfeu+wn893ODEGrdDRmfi5GCdX7B2H5ud0vgVg973jEfFzSkdivkXFoEfFzx/crTYVAJl5DcAHXXJ34vf3u+Q6M28CeE2Y89KsCMjMJwB8LRQAfwN4s0vYM/MugKeFdT4bEfU3D30y85kqaAA8Ts55LyLqb059hsB/JOerYbVhXGrmvDx4stN+2iUcG3T0WUR82KxT1dFLEfHrxD6loyo2WW3eA1DanM1ZhdkPgo5qrtcj4q/JOl8E8AtrHACMjlSbM/apQPa5sM7p3rHRzy/O7DMKCtXPOx2t8POy+beCjm7VftjoSLX5Cj9n5qw98zlBR1ci4voR+vmdiJg2gkbx/LHAkvHzauYpc+7t5/U6r+4czytHmO4dmVk+WTGIjucAau+Y5QjqnIyfq/HiekRcaWKvmhcyfl77G9vEreUxeWHF3np/9lmhowtEXvgHu0AArZ8/bK6tBUAKC2MTTHVDvxURFycbem16v++5zuHcSpLFCFJeZ0RM7bZhQ6+NrROkap9WkBuKKaZQUdc5nXNU9qqOphvbBvuUjp6fnfxsKKaqW7K3jqr46YKZap+pjhbZRw2OS/ycCGZqksXoaFf7jGJKDeKMn6sxaEW8OBQ/V+3DNA921dEKPx/aVHXUJZiVrBZP5enmXOHnqs2ZeK7OyehItc+0UNnQcC07dn6+xeZdPJfn7OL5ngWAWulNBT4ccdc5N3YG9z4BuDM6t//3CYDaGWQC7ll3BqtIudxd/crMOvWptbJP17k91BMApqOjdp6YzuAhngAwfl46UjpPTHBU/ZzpDJ4HP/+IODFW48Wx+jmTuNUV1O+ErjXj52rSuvcJQNutH3mHctLXzjkSzG+EDjPTNFH3YcbP1SYHEy9Un2ROANQ5p34+bK7cEmhP9DfqqGu41olxxQv2lLP18z0LgMcAvHuG3wDcnR3n/vei4r2s3yLi+y5rFOdk73S+AeCF7n+P32921xeGIJV7vNdm1wJO8GS/0bgP4KuI+Gf2TqNIe4fUEXunsxyHLQBW6Ii1T23Ap55gPcCN1ZFi893vBgPYW0esfSq5nl4NO8GT1ZHy/RBrH+VbnxU6Yu1T/jO9ZniCZ6ujRX6ufIvF6kix+Qr7sDpS/LwSt1MbUCf2duWOeaujzKwc4W1SR6x9ztrP2RxhhZ8rc7LfACh+3upI9XMyR1jh58qc7DcASjxfoaPWPrsVAGSi6mEmYAImYAImYAImYAImYALnjMCmbwDO2Tt4OSZgAiZgAiZgAiZgAiZgAiQBFwAkKA8zARMwARMwARMwARMwgUMg4ALgEKzodzABEzABEzABEzABEzABkoALABKUh5mACZiACZiACZiACZjAIRD4FzVumDswxsdeAAAAAElFTkSuQmCC");
    position: absolute;
    top: 396px;
    left: 137px;
    transform: rotate(13deg);
    .line-icons {
      position: absolute;
      top: -19px;
      left: 280px;
      transform: rotate(-87deg);
    }
  }
  .xian {
    width: 290px;
    height: 290px;
    border-radius: 50%;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT0AAAE8CAMAAACFGZYKAAAC9FBMVEUAvPQAAAAAvPT////////////////8/v////8cxPaG3/qo6fv///////8/zfd22/n1/f/x/P75/v/U9P3///8vyfbp+v7///////9O0fjy/P7////////+///b9v6y6/zF8P3s+v7////////////9//8ixfXl+P7///8Zw/XL8v2c5fta1Pjg9/5m1/kRwPW37Py+7vyR4vr///9V0/j//////vzl+P7/////igD/igH/igD////9/v/z/P5+3fr6/v/3/f+X5Ptx2vlO0fc8zPczyfUKvvT///8vyPb/igDx+/78/v/7/v/4/f//igDB7/z////////3/f/N8v3/////////igCv6vyb5fv0/P/h9/74/f+k5/v////+////igCq6fv/igD/igDf9/7Z9f3+///2/f/w+/7p+f7Z9f3G8P3C7/y87vy37Pyf5vv1/P+N4fpey+1i1vjt+v5Ey/Tp+f7H8f257fyp6fuZ5fv/////////igD/igDQ8/3/igGG4Pry/P7gkB7/igDe9v7/igD/iwSf5vtp2Pn7////igD/igDN8v36/v+/7vz/igHg9/6x6/yhnVr/igDk4eH9/v/+igHd9v76/v/K8f32/f/1/P/v+/79iwPtjhH/igDW9P3/igCH4Pr/igD/igD/igD/igDu+/7T8/35/f//igBp2Pn/jgvR8/3/igC67fx43Pnh4OLz/P/a4OLs+v7R3uPK3eTW9P232uWv2Obu+/7q+v7qkBjl+P7k+P7/igBSrKYus8jm+P7A2+T7jAf6iwWl1+a06/zw+/7/igD/igDl+P7HlTb/igB/o3v4/f/b9v3/jASe1uf2jAn1jAqJ0+nzjQt80Or9lhzl+P7dmDDPky7xw4TBljv/igD////5/f//jgr+lRf3/f//oTHn+f7+48JjqZX3/f+Y1Of/tl+/lz3/igD////m4eHsz7L4pELyuXn2rFb9kxfyuHjn4N3o3NPq1cPwv4j7mintx5/KzFnzAAAA7XRSTlMUAHIzAiYpMiEWHSEKJBgcMC8xKA4XLR8dGaAQLf4qIyYuGgwF+3ssInknIBorG3YkJR8YjBQH4hcE/e0W4qKd+Lipl4mDgHUoGAnw29XCs0IjBLxMCAb3uKyn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");
    background-size: 100% 100%;
    position: absolute;
    top: 166px;
    left: 2px;
  }
  .xian-title {
    width: 334px;
    height: 140px;
    position: absolute;
    background-image: url("data:image/png;base64,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");
    top: 171px;
    left: 153px;
  }
  @keyframes shineBlue {
    from {
      -webkit-box-shadow: 0 0 9px rgba(0, 188, 244, 0);
    }
    to {
      -webkit-box-shadow: 0 0 9px rgba(0, 188, 244, 0.3);
    }
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
    animation-name: shineBlue;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    .nanjing {
      width: 92px;
      height: 92px;
      background: rgba(0, 188, 244, 0.3);
      border: 2px solid rgba(230, 225, 225, 0.3);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .nanjing-dots {
    width: 35px;
    height: 35px;
    background: #ffb400;
    border: 5px solid #e6e1e1;
    border-radius: 50%;
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
      top: 835px;
      left: 698px;
    }
    .flight-dots:nth-of-type(4) {
      top: 761px;
      left: 999px;
    }
    .flight-dots:nth-of-type(5) {
      top: 300px;
      left: 129px;
    }
    .flight-dots:last-of-type {
      top: 980px;
      left: 834px;
    }
  }

  .dots-title {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdYAAAB4BAMAAAC9Vc5DAAAAFVBMVEUAvPQVx/YNw/YAvPQBvfUVx/YAvPQH5dgnAAAAB3RSTlMzPTgl1y7UcMnR+wAAAh1JREFUeNrtnUFKA0EURL8W7o3Sez2DeINmLiDeYMj9j2A+icSQLIR0Vxc99RdBHtlMFVKbRyZqXvy9x93hXmIqlg+53HjW9/zOW0zFlrzIB65qNTRkV72q1dCYnXtdLnp9yK88R8RU7NTrctnrLi//mIqdej18VLUa2rHr/1e1Gpqyc6/5UdVqaM5q3vFTah96sJonuA+9WBkfOY0VjcgprGhETmFFI3IKKxqRU1jRm/1urOjNfjf2qhE5hUEjcgqDRuQUBo3IKQwCW8BiGD/xNAaNyCkMGpFTGDQipzBoRE5h0IicwjB+4mkM4yeexqAROYVBI3IKg0bkFAaBLWAxxPgtYDGEROQUhpCInMIQEpFTGEIicgpDSEROYYjhE09jiOETT2MIicgpDCEROYUhJCKnsCeNyCmsCGyB3RC7IXZD7IbYDRkeeX9mN0Rh9u2G2A2xG3KDQSNyArMbIjD7dkPshtgNsRuiEHlvZjdEY/bthtgN+TeDRuRdmd0QnX2wG2I3xG7I5t0Qhci7MbshUrNvN8RuiN2QG6xoRE5hdkPmZHZD5mR2Q+ZkRSNyCivjJ95uiN0QuyF2Q+yGCO6D3RC7IXZD7IYIRG43xG6I3RC7IRt2Q2peCNbQnGEjvxqeD7n4nTI7wWruYnVd1/3W3imzzv9Omd9e16Wq1dCOXfeqVkNbdu51WavfKTMTO/b6cXGf34f7mo/t834AE+2J7j+qYIoAAAAASUVORK5CYII=");
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
  }
  .select {
    width: 35px;
    height: 35px;
    background: rgba(253, 241, 147, 1);
    border-radius: 50%;
    transform: rotate(20deg);
    animation: load 1.5s infinite alternate;
  }
  @keyframes load {
    0% {
      box-shadow: inset 0px 0px 10px 5px rgba(253, 241, 147, 1),
        0px 0px 10px 3px rgba(253, 241, 147, 0.3);
    }
    50% {
      box-shadow: inset 0px 0px 10px 5px rgba(253, 241, 147, 1),
        0px 0px 10px 3px rgba(253, 241, 147, 0.8);
    }
    100% {
      box-shadow: inset 0px 0px 10px 5px rgba(253, 241, 147, 1),
        0px 0px 100px 3px rgba(253, 241, 147, 1);
    }
  }
}

#chart {
  width: 1500px;
  height: 2000px;
}
</style>
