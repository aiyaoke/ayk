<template>
  <div class="inverterIndex    ">
    <Header></Header>
    <div :class="'main ' + [plantListVisible ? 'plantListVisible' : '']">
      <!-- animate__animated animate__fadeInUp -->
      <div class="m1">
        <ElectricityStatistics></ElectricityStatistics>
      </div>
      <div class="m2">
        <PlantInfo />
      </div>
      <div class="m3">
        <DeviceList />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions: plant_actions ,mapGetters:plant_getters} = createNamespacedHelpers("plant");
const { mapGetters: app_getters, } = createNamespacedHelpers("app");

export default {
  name: "InverterIndex",
  components: {
    Header: _ => import("./components/Header/Index.vue"),
    ElectricityStatistics: _ => import("./components/ElectricityStatistics"),
    PlantInfo: _ => import("./components/PlantInfo/Index.vue"),
    DeviceList: _ => import("./components/DeviceList/Index.vue"),
    Footer: _ => import("@/components/Footer")
  },
  mounted() {
    this.getAllPlants().then(()=>{
      this.getPlantModels(this.currentPlant.plantId);
    });
  },
  computed: {
    ...app_getters(["plantListVisible"]),
    ...plant_getters(["currentPlant"])
  },
  methods: {
    ...plant_actions(["getAllPlants","getPlantModels"])
  }
};
</script>

<style scoped lang="scss">
//@import "@/assets/styles/theme.scss";
.inverterIndex {
  @include bg-color("1");
  position: relative;
  .main {
    transition: all 0.5s;
    width: 95%;
    min-width: 1100px;
    margin: 0 auto;
    min-height: calc(100vh - 90px);
    padding: 20px 0;
    box-sizing: border-box;
    display: grid;
    grid-template:
      "m1  m1  m2" 250px
      "m1  m1  m2" 250px
      "m3  m3  m3" auto
      / 2fr 2fr 3fr;
    grid-gap: 10px;
    &.plantListVisible {
      transform: translateX(-54px);
    }
    > div {
      @include bg-color("2");
      border-radius: 5px;
      > div {
        width: 100%;
        height: 100%;
      }
    }
    .m1 {
      grid-area: m1;
    }
    .m2 {
      grid-area: m2;
    }
    .m3 {
      grid-area: m3;
    }
  }
}
</style>
