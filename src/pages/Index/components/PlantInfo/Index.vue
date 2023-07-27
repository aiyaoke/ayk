<template>
  <div class="plant-info">
    <div class="nowTime">
      <NowTime />
    </div>
    <div class="weather">
      <WeatherInfo />
    </div>
    <div class="total-count">
      <TotalCount />
    </div>
  </div>
</template>

<script>
import { apiDeletePlant } from "@/api/plant";
import { deteleConfirm } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
const {
  mapGetters: plant_getters,
  mapActions: plant_actions
} = createNamespacedHelpers("plant");
const { mapGetters: app_getters } = createNamespacedHelpers("app");
export default {
  name: "Index",
  data() {
    return {
      pLantDetailVisible: false,
      createPLantVisible: ""
    };
  },
  components: {
    NowTime: _ => import("./components/NowTime"),
    WeatherInfo: _ => import("./components/WeatherInfo"),
    TotalCount: _ => import("./components/TotalCount")
  },
  computed: {
    ...user_getters(["userInfo"]),
    ...plant_getters(["currentPlant"]),
    ...app_getters(["locale"])
  },
  methods: {
    ...plant_actions(["getAllPlants"]),
    handleDetail() {
      this.pLantDetailVisible = true;
    },
    handleEdit() {
      this.createPLantVisible = "edit";
    },
    handleDelete() {
      let requestData = { plantId: this.currentPlant.plantId };
      deteleConfirm(
        apiDeletePlant, 
        requestData,
        res => res === "ok" && this.getAllPlants()
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.plant-info {
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  grid-template:
    "m1 m1" 100px
    "m2 m3" auto
    / 1fr 1fr;
  grid-gap: 10px;
  .nowTime {
    grid-area: m1;
    @include bg-color("1");
    border-radius: 5px;
  }
  .weather {
    grid-area: m2;
    @include bg-color("1");
    border-radius: 5px;
  }
  .total-count {
    grid-area: m3;
  }
}
</style>
