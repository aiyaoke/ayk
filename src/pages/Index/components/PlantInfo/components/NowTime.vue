<template>
  <div class="inner">
    <span class="time">
      <span>{{ nowTime[1] }}</span>
      <span class="date">{{ nowTime[0] }}</span>
    </span>
    <span class="timeZone">( UTC{{ currentPlant.timeZone }} )</span>
  </div>
</template>

<script>
import { nowTime } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: plant_getters } = createNamespacedHelpers("plant");
export default {
  name: "NowTime",
  data() {
    return {
      nowTime: ""
    };
  },
  mounted() {
    this.showNowTime();
  },
  computed: {
    ...plant_getters(["currentPlant"])
  },
  methods: {
    showNowTime() {
      setInterval(_ => {
        this.nowTime = nowTime(0, "YYYY-MM-DD HH:mm:ss").split(" ");
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.inner {
  width: 100%;
  height: 100%;
  @include dis-flex(center, center, column);
  .time {
    @include font-color("1");
    font-size: 50px;
    font-family: DINCondensed-Bold;
    font-weight: bold;
    .date {
      font-size: 20px;
    }
  }
  .timeZone {
    font-family: normal;
    font-size: 12px;
    position: relative;
    top: 5px;
    left: 3px;
    color: #999;
  }
}
</style>
