<template>
  <div class="load">
    <div class="runLine-wraper">
      <RunLine :value="value" layout="loadLayout" color="#e6aa0f" />
    </div>
    <div
      :class="
        'i-wrapper ' +
          [
            parseInt(value) !== 0
              ? 'onLineColor icon-border-animate'
              : 'runLineIcon-offLine '
          ]
      "
    >
      <i class="iconfont icon-fuzaijunheng"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Load",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  components: {
    RunLine: _ => import("@/components/RunLine")
  }
};
</script>

<style lang="scss" scoped>
$onLineColor: #e6aa0f;
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
.load {
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
    right: -28px;
    top: 15px;
  }
  i {
    font-size: 35px;
  }
  .runLine-wraper {
    width: 100%;
    height: calc(100% - 60px);
  }
}
</style>
