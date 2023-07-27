<template>
  <div class="used">
    <div class="dtuImg"  >
      <div class="svg215">
        <img :src="graphData.pcs&&graphData.bms?Ac:Away" alt="">
        <div class="lower" :class="[graphData.pcs&&graphData.bms?'isAc1':'noAc']">
        </div>
      </div>
      <div :class="
        'i-wrapper ' +
        [
          graphData.pcs
            ? 'onLineColor icon-border-animate'
            : 'runLineIcon-offLine ',
        ]
      ">
      <div class="powerNum">{{graphData.pcs?graphData.pcsData:pcsState[+graphData.pcsState-1] }}</div>
      <i class="iconfont icon-bingxiang"></i>
      </div>

      <div class="battery-box">
      <div class="battery-wrapper" >
        <BatteryCloum :value="batteryData" />
      </div>
    </div>
    </div>
   
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import Ac from '@/assets/images/215.svg';
import Away from '@/assets/images/215low.svg'
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
  name: "Used",
  props: {
    graphData: {
      type: Object,
      default: {}
    },
   
  },
  data() {
    return {
      batteryData: {
      },
      pcsState:['停机','待机','充电运行','放电运行',"故障","零功率运行","告警"],
      Ac,
      Away
    };
  },
  components: {
    BatteryCloum: _ => import("./batteryCloum.vue")
  },
  computed: {
    ...device_getters(["currentDevice"])
  },
  mounted () {
  },
  watch: {
    graphData:{ 
      handler (newValue,oldValue){
      this.batteryData=newValue;
    },
    immediate:true,
    deep:true
  }
  },

};
</script>

<style lang="scss" scoped>
$onLineColor: rgb(58,243,167);
.onLineColor {
  color: $onLineColor;
}
@keyframes breath {
  from {
    box-shadow: 0 0 8px -1px rgb(58,243,167);
  }
  to {
    box-shadow: 0 0 25px -1px rgb(58,243,167);
  }
}
@keyframes breath1 {
  from {
    box-shadow: 0 0 8px -1px #4F61CD;
  }
  to {
    box-shadow: 0 0 25px -1px #4F61CD;
  }
}
.used {
  width: 100%;
  height: 100%;
  position: relative;
  @include dis-flex(center, center, column);

  .dtuImg {
    width: 100%;
    height: 100%;
    max-height: 650px;
    // background: url("#{$img-url}/215low.svg") no-repeat;
    background-size: 100% 100%;
    position: relative;
  @include dis-flex(center, center, column);

    .svg215 {
      img{
      width: 100%;
      position: absolute;
      left: 0;
      top: 15%;
      
    }
  .lower{
    width: 100%;
    height: 430px;
    position: absolute;
    border-radius: 9px;
          left: 0;
          top: 15%;

  }
  }
    .i-wrapper {
    width: 120px;
    height: 120px;
    border: 1.5px solid $onLineColor;
    border-radius: 50%;
    @include dis-flex(center, center);
    @include bg-color("1");
    position: absolute;
    left: 50%;
    top: 20%;
    i {
    font-size: 80px;
    
  }
  
  }

  .powerNum{
    width: 100px;
    height: 30px;
    background-color: rgba(#4F61CD, $alpha: 0.5);
    position: absolute;
    font-size: 20px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
  }
  }
  .runLine-wraper {
    width: 100%;
    height: calc(100% - 60px);
    position: relative;
    text-align: right;

    i {
      font-size: 27px;
      position: absolute;
      top: 40%;
      right: -9px;
      z-index: 66;
      @include bg-color("1");
    }
  }
  .isAc{
 
    animation: breath 5s linear infinite;
  }
  .isAc1{
 
 animation: breath1 5s linear infinite;
}
  .noAc{
    // background: url("#{$img-url}/215low.svg") no-repeat;
    // background-size: 100% 100%;
    // position: relative;
  }
  .battery-box {
    flex: 1;
    .battery-wrapper {
      position: absolute;
      width: 100px;
      height: 160px;
      left: 54%;
      top: 54%;
    }
  }
}
</style>
