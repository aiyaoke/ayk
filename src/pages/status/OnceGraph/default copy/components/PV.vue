<template>
  <div class="pv">
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
      <i class="iconfont icon-guangfu"></i>
    </div>
    <div class="runLine-wraper">
      <RunLine :value="value" layout="pvLayout" color="#25ccf7" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PV',
  props: {
    value: {
      type: String,
      default: 1,
    },
  },
  components: {
    RunLine: (_) => import('@/components/RunLine'),
  },
}
</script>

<style lang="scss" scoped>
$onLineColor: #25ccf7;
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
.pv {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  .i-wrapper {
    width: 70px;
    height: 70px;
    border: 1.5px solid $onLineColor;
    border-radius: 50%;
    @include dis-flex(center, center);
    position: relative;
    right: 30px;
    top: -8px;
  }
  i {
    font-size: 35px;
  }
  .runLine-wraper {
    width: 100%;
    height: calc(100% - 70px);
  }
}
</style>
