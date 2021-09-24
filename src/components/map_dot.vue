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

    <div
      class="dots-box "
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
export default {
  data() {
    return {
      planePath: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
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
    // console.log(this.doctorList);
  },
  methods: {
    select(item, index) {

    }
  }
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
    }
    .flight-dots:first-of-type {
      top: 321px;
      left: 937px;
    }
    .flight-dots:nth-of-type(2) {
      top: 497px;
      left: 750px;
    }
    .flight-dots:nth-of-type(3) {
      top: 818px;
      left: 700px;
    }
    .flight-dots:nth-of-type(4) {
      top: 761px;
      left: 1030px;
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
      content: '';
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
