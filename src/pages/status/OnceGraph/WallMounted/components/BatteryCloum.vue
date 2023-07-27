<template>
  <div class="container " active>
    <div class="wrap"></div>
    <div 
    :class="[value.cdStatus=='充电'||'放电'?'batteryBody':'normal']"
    ></div>
    <div class="batteryCopy"
    :class="[value.cdStatus=='充电'||'放电'?'active':'stop']"
    >
      <div class="title"
      :class="[value.cdStatus=='充电'||'放电'?'active':'noActive']"
      ></div>
      <div class="socGroup">
        <img src="@/assets/images/logoElec.svg" alt="">
        <div>
          <span class="socVal">{{ value.soc || 0 }}</span>
          <!-- <span class="socUnit"></span> -->
          <span class="gap">|</span>
          <span class="state">{{ this.$translate(value.cdStatus) }}</span>
        </div>
        
      </div>
      <div class="g-wave" :style="cssVar"></div>
      <div class="g-wave" :style="cssVar"></div>
      <div class="g-wave" :style="cssVar"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      soc:0
    };
  },
  watch: {
    value:{ 
      handler (newValue,oldValue){
      this.soc=newValue.soc.split("%")[0];
    },
    immediate:true,
    deep:true
  }
  },
    
 computed:{
   cssVar(){
     const _site = {
       '--soc': this.soc?'-'+this.soc+'%':0+'%',
     }
     return _site
   },  
  },
  methods: {},
  created() {},
  mounted() {
  },
  components: {},
};
</script>
<style lang="scss" scoped>
$onLineColor: #18ba83;
@keyframes breath {
  from {
    box-shadow: 0 0 8px -1px $onLineColor;
  }
  to {
    box-shadow: 0 0 25px -1px $onLineColor;
  }
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  // .wrap{
  //   width: 105%;
  //   height: 105%;
  //   position: absolute;
  // }
  .batteryBody {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: 2px solid #91a09d;
    @include bg-color("2");
    z-index: 1;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0%;
      background-color: #3af3a7;
      box-sizing: border-box;
      border-radius: 0px 0px 5px 5px;
    }
  }
  .socGroup {
    z-index: 110;
    font-size: larger;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -20%);
    top: 10%;
    text-align: center;
    color: #fff;
    // font-family: DINCondensed-Bold;
    width: 100%;
    img{
      width: 80%;
      margin-bottom: 10px;
    }
    .socVal {
      font-size: 30px;
    }
    .socUnit {
      font-size: 20px;
    }
    .gap{
      margin: 0 10px;
      font-size: 30px;

    }
    .state{
      font-size: 30px;

    }
  }
  .batteryCopy {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    left: 2px;
    top: 2px;
    overflow: hidden;
    right: 1px;
    .title {
      width: 50%;
      border: 0.1px solid rgba($color: #000000, $alpha: 0);
      position: absolute;
      top: -1px;
      transform: translate(50%, -1px);
      z-index: 100;
    }
    .active{
      box-shadow: 0 1px 5px #3af3a7;
    }
    .noActive {
      box-shadow: 0 1px 5px ;

    }
  }
}
@keyframes charging {
  50% {
  }

  95% {
    top: 5%;
    filter: hue-rotate(0deg);
  }
  100% {
    top: 0%;
    filter: hue-rotate(0deg);
  }
}
.g-wave {
  position: absolute;
  width: 350%;
  height:200%;
  background: rgba(28, 42, 57, 0.8);
  border-radius: 45% 47% 44% 42%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;
  animation: move 15s linear infinite;
  bottom: 1%;
}

.g-wave:nth-child(2) {
  border-radius: 38% 46% 43% 47%;
  transform: translate(-50%, 0) rotate(-135deg);
}
.g-wave:nth-child(3) {
  border-radius: 42% 46% 37% 40%;
  transform: translate(-50%, 0) rotate(135deg);
}
@keyframes move {
  100% {
    transform: translate(-50%,var(--soc)) rotate(720deg);
  }


}
.active{
  animation: breath 5s linear infinite;
  }
.stop{
  animation-play-state: paused;
}
  .normal{
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8%;
    border: 2px solid #91a09d;
    @include bg-color("2");
    z-index: 1;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0%;
      background-color:  rgba(28, 42, 57, 0.8);
      box-sizing: border-box;
      border-radius: 0px 0px 5px 5px;
    }
  
  }
</style>