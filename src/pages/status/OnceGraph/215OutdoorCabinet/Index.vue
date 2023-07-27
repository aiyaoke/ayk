<template>
  <div class="running-chart">
    <div class="r1">
      <Battery :graphData="onceGraphValue" />
    </div>
    <div class="r2">
      <Meter  :graphData="onceGraphValue"  />
    </div>
    <div class="r3">
    <Grid :graphData="onceGraphValue"/>
    </div>
  </div>
</template>

<script>
import { api232OutdoorCabinet,apiOutdoorCabinet } from "@/api/device";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
  name: "RunningChart",
  data() {
    return {
      pvValue: "0",
      gridValue: "0",
      batteryValue: "0",
      usedValue: "0",
      loadValue: "0",
      meterStatus: 0,
      intervalInstance: null,
      onceGraphValue: {
             
            },
    };
  },
  mounted() {
    this.getStatusValue();
    this.intervalInstance = setInterval(_ => this.getStatusValue(), 60000);
  },
  computed: {
    ...device_getters(["currentDevice"])
  },
  components: {
    Meter: _ => import("./components/Meter"),
    Battery: _ => import("./components/Battery"),
    Grid: _ => import("./components/Grid"),

  },
  methods: {
    async getStatusValue() {
      let { data } =  this.currentDevice.type===7? await apiOutdoorCabinet({ dtuId: this.currentDevice.id }):await api232OutdoorCabinet({ dtuId:this.currentDevice.id });
      if (data) {
        let {
         bms,
         Status,
         cell,
         gmeter,
         pcs,
         tmeter
        } = data;
        this.onceGraphValue = Status;
        this.onceGraphValue.power=tmeter.totalActivePower;
        this.$emit("getNumber", {
          key: "215",
          value: {
          pcs:pcs.totalActivePower,
          meter:tmeter.totalActivePower,
          soc:bms.soc
          }
        });
        
      }
      
    }
  },
  destroyed() {
    clearInterval(this.intervalInstance);
  }
};
</script>

<style lang="scss" scoped>
.running-chart {
  padding: 50px;
  box-sizing: border-box;
  height: calc(100vh - 300px);
  min-height: 550px;
  display: grid;
  grid-gap: -1px;
  @include bg-color("1");
  border-radius: 5px;
  grid-template:
    "r1 r2 r3" 1fr
    "r1 r2 r3" 1fr
    /300px 1fr 300px ;
  > div {
    position: relative;
  }
  .r1 {
    grid-area: r1;
  }
  .r2 {
    grid-area: r2;
  }
  .r3 {
    grid-area: r3;
  }
  
}
</style>
