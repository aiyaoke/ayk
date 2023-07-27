<template>
  <div class="grid">
    <div
      :class="
        'i-wrapper ' +
        [
          parseInt(value) !== 0
            ? 'onLineColor icon-border-animate'
            : 'runLineIcon-offLine ',
        ]
      "
    >
      <i class="iconfont icon-dianwanggongsi"></i>
    </div>
    <div class="runLine-wraper">
      <i
        :class="
          'iconfont icon-dianbiao ' +
          [
            parseInt(meterStatus) === 0
              ? 'onLineColor '
              : 'runLineIcon-offLine ',
          ]
        "
      ></i>
      <RunLine :value="value" layout="gridLayout" color="#5067EC" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Grid",
  props: {
    value: {
      type: String,
      default: "",
    },
    meterStatus: {
      type: Number,
      default: 0,
    },
  },
  components: {
    RunLine: (_) => import("@/components/RunLine"),
  },
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
}
</style>
