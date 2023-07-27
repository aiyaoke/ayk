<template>
  <div class="battery">
    <div class="runLine-wraper">
      <RunLine :value="value" layout="batteryLayout" color="#18BA83" />
    </div>
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
      <i class="iconfont icon-dianchibao"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Battery',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  components: {
    RunLine: (_) => import('@/components/RunLine'),
  },
}
</script>

<style lang="scss" scoped>
$onLineColor: #18ba83;
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
.battery {
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
    right: 31px;
    top: 5px;
  }
  i {
    font-size: 43px;
  }
  .runLine-wraper {
    width: 100%;
    height: calc(100% - 70px);
  }
}
</style>
