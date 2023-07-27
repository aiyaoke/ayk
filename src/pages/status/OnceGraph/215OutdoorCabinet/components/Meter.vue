<template>
  <div class="grid">
      <div class="svg_wrapper" ref="svg_wrapper">
            <AnimatePath
                :isRuning="status.isActive"
                :direction="status.direction"
                :color="status.col"
                :svgConfig="svgConfig"
            />
        </div>
        <div class="icon_wrapper dianbiao">
            <IconBox
                :isActive="status.isActive"
                iconClassName="icon-dianbiao"
                :color="status.color"
            />
            <div class="powerNum">{{graphData.power}}</div>
        </div>

  </div>
</template>

<script>
export default {
  name: "Grid",
  props: {
    graphData:{
      type: Object,
      default:()=> {}
    }
  },
  data () {
    return {
      svgConfig: [],
      
    }
  },
  components: {
    AnimatePath: (_) => import("./AnimatePath"),
    IconBox: (_) => import("./IconBox"),
  },
  computed: {
    status() {
            let {power,pcs,bms,meterDataNum} = this.graphData;
            let isActive=pcs&&bms?true:false;
            let col=isActive?"#fff":"#999";
            return {  
                isActive,
                direction: meterDataNum>0 ? "forward" : "backward",
                color:  Boolean(this.graphData.meter)?"#30bf78":"#999",
                col, 
                val: '',
                unit: "",
            };
        },
  },
  watch: {
        graphData() {
            this.initSvgSize();
        },
    },
    mounted () {
      this.initSvgSize();
      
    },
    methods: {
      initSvgSize() {
            let svgWrapperEl = this.$refs.svg_wrapper,
                width = svgWrapperEl.clientWidth - 5,
                height = svgWrapperEl.clientHeight - 5;
            this.svgConfig = [
                {
                    path: `M0 ${height/2-5} H${width+6}`,
                    // path: `M 5 ${height/2-28}  V${height/2-28}   H${width/2-50}  a50,50 -30 0,1 100,0 `,
                    ...this.status,
                },
            ];
        },
    }
};
</script>
 
<style lang="scss" scoped>
$onLineColor: #5067ec;
.onLineColor {
  color: $onLineColor;
}
@keyframes breath {
  from {
    box-shadow: 0 0 8px -1px $onLineColor;
  }
  to {
    box-shadow: 0 0 25px -1px $onLineColor;
  }
}
.grid {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @include dis-flex(center, center,column);

  .i-wrapper {
    width: 70px;
    height: 70px;
    border: 1.5px solid $onLineColor;
    border-radius: 50%;
    @include dis-flex(center, center);
    position: relative;
    right: -30px;
    top: -6px;
  }
  i {
    font-size: 35px;
  }

  .icon_wrapper {
        width: 80px;
        height: 80px;
        position: relative;
        left: 30px;
    }
    .dianbiao{
      position: absolute;
      left:45%;
      // top:100px;
    @include bg-color("1");

    }
    .powerNum{
    width: 100px;
    height: 30px;
    background-color: rgba($color: $onLineColor, $alpha: 0.5);
    position: absolute;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
    top: 20%;
    left: -10px;
  }
  .svg_wrapper {
        width: 100%;
        height: 100%;
        flex: auto;
    }
}
</style>
