<template>
  <div class="used">
    <div class="extra"></div>
    <div class="dtuImg"></div>
    <div class="battery-box">
      <div class="battery-wrapper">
        <BatteryFlow :value="batteryData" />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
  name: "Used",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      batteryData: {
        current: 0,
        soc: 0
      }
    };
  },
  components: {
    BatteryFlow: _ => import("@/components/BatteryFlow")
  },
  computed: {
    ...device_getters(["currentDevice"])
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
.used {
  width: 100%;
  height: 100%;
  position: relative;
  @include dis-flex(flex-start, flex-start, column);
  .extra {
    flex: 1;
  }
  .dtuImg {
    width: 100%;
    height: 250px;
    background: url("#{$img-url}/20deg/dtu.png") no-repeat;
    background-size: 100% 100%;
  }
  .battery-box {
    flex: 1;
    .battery-wrapper {
      width: 140px;
      height: 35px;
      position: relative;
      left: -23px;
      top: 15px;
    }
  }
}
</style>
