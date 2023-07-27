<!--  -->
<template>
<div class="running-chart">
    <div class="wrap">
        <Battery :value="batteryData"/>

    </div>
</div>
</template>

<script>
import { apiWallMounted } from "@/api/device";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
    name:"Wall",
    data() {
        return {
            batteryData:{
           
            }
        }
    },
    created() {

    },
    mounted() {
    this.getStatusValue();
        
    },
    components:{
        Battery:(_)=>import('./components/BatteryCloum.vue')
    },
    computed: {
    ...device_getters(["currentDevice"])
  },
      
    methods: {
        async getStatusValue() {
      let { data } = await apiWallMounted({ dtuId: 1 });
    //   return;
  //this.currentDevice.id 
      if (data) {
        let {bmcList,bms}=data;
        this.batteryData=bms;
        this.$emit("getNumber", {
          key: "215",
        //   value: {
        //   pcs:pcs.totalActivePower,
        //   meter:tmeter.totalActivePower,
        //   soc:bms.soc
        //   }
        });
        
      }
      
    }
        

    }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.running-chart{
padding: 50px;
  box-sizing: border-box;
  height: calc(100vh - 300px);
  min-height: 550px;
  display: flex;
  @include bg-color("1");
  border-radius: 5px;
justify-content: space-around;
align-items: center;
  .wrap{
    width: 25%;
    height: 60%;
  }
}
</style>