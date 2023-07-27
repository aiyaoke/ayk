<template>
    <div class="running-chart">
        <div class="r1">
            <PV :value="pvValue" />
        </div>
        <div class="r2">
            <Grid :value="gridValue" :meterStatus="meterStatus" />
        </div>
        <div class="r3">
            <Battery :value="batteryValue" />
        </div>
        <div class="r4">
            <Load :value="loadValue" />
        </div>
        <div class="r5">
            <Used :value="usedValue" />
        </div>
    </div>
</template>

<script>
import { apiRunStatusValue } from "@/api/device";
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
        };
    },
    mounted() {
        this.getStatusValue();
        this.intervalInstance = setInterval(
            (_) => this.getStatusValue(),
            60000
        );
    },
    computed: {
        ...device_getters(["currentDevice"]),
    },
    components: {
        PV: (_) => import("./components/PV"),
        Grid: (_) => import("./components/Grid"),
        Battery: (_) => import("./components/Battery"),
        Load: (_) => import("./components/Load"),
        Used: (_) => import("./components/Used"),
    },
    methods: {
        async getStatusValue() {
            let { data } = await apiRunStatusValue({
                dtuId: this.currentDevice.id,
            });
            if (data) {
                let {
                    batteryPower,
                    batteryStatus,
                    elecToGridPower,
                    elecUsedPower,
                    loadPower,
                    meterStatus,
                    pvPower,
                    soc,
                } = JSON.parse(data);
                this.pvValue = pvPower;
                this.gridValue = elecToGridPower;
                this.batteryValue = batteryPower;
                this.usedValue = elecUsedPower;
                this.loadValue = loadPower;
                this.meterStatus = meterStatus;
                this.$emit("getNumber", {
                    key: "pv",
                    value: pvPower,
                });
            }
        },
    },
    destroyed() {
        clearInterval(this.intervalInstance);
    },
};
</script>

<style lang="scss" scoped>
.running-chart {
    padding: 50px;
    box-sizing: border-box;
    height: calc(100vh - 300px);
    min-height: 550px;
    display: grid;
    grid-gap: 20px;
    @include bg-color("1");
    border-radius: 5px;
    grid-template:
        "r1  r5  r2" 1fr
        "r3  r5  r4" 1fr
        /1fr 100px 1fr;
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
    .r4 {
        grid-area: r4;
    }
    .r5 {
        grid-area: r5;
    }
}
</style>
