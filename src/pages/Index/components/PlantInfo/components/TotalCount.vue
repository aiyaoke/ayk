<template>
  <div class="total-count-wrapper">
    <div v-for="(item, index) in totalArr" :key="index">
      <div :class="'i-wrapper ' + item.calss">
        <i
          :class="'iconfont ' + item.icon + ' ' + addClass(item.value, index)"
        ></i>
      </div>
      <div class="value">{{ item.value }}</div>
      <div class="sub-title">{{ $translate(item.subTitle) }}</div>
    </div>
  </div>
</template>

<script>
import { apiGetWarnCount, apiGetProfitCount } from "@/api/plant";
import { createNamespacedHelpers } from "vuex";
const {
  mapGetters: plant_getters,
  mapActions: plant_actions
} = createNamespacedHelpers("plant");
const { mapGetters: device_getters } = createNamespacedHelpers("device");

export default {
  name: "TotalCount",
  data() {
    return {
      totalArr: [
        {
          type: "status",
          subTitle: "在线",
          icon: "icon-zaixian1",
          value: 0,
          calss: "online-bg"
        },
        {
          type: "status",
          subTitle: "离线",
          icon: "icon-lixian1",
          value: 0,
          calss: "offline-bg"
        },
        {
          type: "warn",
          subTitle: "实时",
          icon: "icon-gaojingdaichuli",
          value: 0,
          calss: "active-bg"
        },
        {
          type: "warn",
          subTitle: "历史",
          icon: "icon-shouye-tongyong-",
          value: 0,
          calss: "history-bg"
        },
        {
          type: "profit",
          subTitle: "当日",
          icon: "icon-shouyi2",
          value: 0,
          calss: "today-bg"
        },
        {
          type: "profit",
          subTitle: "累计",
          icon: "icon-tuiguangzhuanqian",
          value: 0,
          calss: "sum-bg"
        }
      ]
    };
  },
  computed: {
    ...plant_getters(["allPlants", "currentPlant"]),
    ...device_getters(["allDevices"]),
    addClass() {
      return (value, index) => {
        if (value && index === 2) {
          return "animate__animated animate__tada animate__infinite  active-warn";
        }
        return "";
      };
    }
  },
  methods: {
    ...plant_actions(["getAllPlants"]),
    async getWarnCount(plantId) {
      let { data } = await apiGetWarnCount({ plantId });
      data = JSON.parse(data || "[]");
      this.totalArr[2].value = data.nowCount;
      this.totalArr[3].value = data.historyCount;
    },
    calculateStatusCount(deviceArr) {
      this.totalArr[0].value = 0;
      this.totalArr[1].value = 0;
      deviceArr.forEach(
        item => (this.totalArr[item.online == "在线" ? 0 : 1].value += 1)
      );
    },
    async getProfitCount(plantId) {
      let { data } = await apiGetProfitCount({ plantId });
      data = JSON.parse(data || "[]");
      this.totalArr[4].value = data.today;
      this.totalArr[5].value = data.total;
    }
  },
  watch: {
    currentPlant({ plantId }) {
      if (plantId) {
        this.getWarnCount(plantId);
        this.getProfitCount(plantId);
      }
    },
    allDevices(newVal) {
      this.calculateStatusCount(newVal);
    }
  }
};
</script>

<style scoped lang="scss">
.total-count-wrapper {
  display: grid;
  grid-template:
    "m1 m2" auto
    "m3 m4" auto
    "m5 m6" auto
    / 1fr 1fr;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
  > div {
    @include dis-flex(space-between, flex-start, column);
    @include bg-color("1");
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    &.status {
      font-weight: bolder;
    }
    i {
      font-size: 20px;
      color: #fff;
    }
    .i-wrapper {
      border-radius: 50%;
      width: 45px;
      line-height: 45px;
      height: 45px;
      text-align: center;
      &.online-bg {
        background: $colorful-1;
      }
      &.offline-bg {
        background: $colorful-2;
      }
      &.active-bg {
        background: $colorful-6;
      }
      &.history-bg {
        background: $colorful-4;
      }
      &.today-bg {
        background: $colorful-5;
      }
      &.sum-bg {
        background: $colorful-3;
      }
    }
    .value {
      width: 100%;
      @include font-color("1");
      font-size: 30px;
      font-family: DINCondensed-Bold;
      font-weight: 600;
      text-align: center;
    }
    .subt-title {
      font-weight: normal;
      color: $text-color;
      margin-left: 10px;
    }
  }
}
</style>
