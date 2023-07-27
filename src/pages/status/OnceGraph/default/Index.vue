<template>
    <div class="running-chart">
        <PV class="r1" :graphData="onceGraphValue" />
        <Battery class="r2" :graphData="onceGraphValue" />
        <Used class="r3" :graphData="onceGraphValue" />
        <AC class="r4" :graphData="onceGraphValue" />
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
            intervalInstance: null,
            onceGraphValue: {
                batteryPower: "",
                batteryStatus: "",
                elecToGridPower: "",
                elecUsedPower: "",
                loadPower: "",
                pvPower: "",
                soc: "",
            },
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
        AC: (_) => import("./components/AC"),
        Battery: (_) => import("./components/Battery"),
        Used: (_) => import("./components/Used"),
    },
    methods: {
        async getStatusValue() {
            // this.onceGraphValue = {
            //     batteryPower: Math.floor(Math.random() * (2 - -2) + -2),
            //     elecToGridPower: Math.floor(Math.random() * (2 - -2) + -2),
            //     elecUsedPower: Math.floor(Math.random() * (2 - -2) + -2),
            //     loadPower: Math.floor(Math.random() * (2 - -2) + -2),
            //     pvPower: Math.floor(Math.random() * (2 - -2) + -2),
            // };
            // return;
            let { data } = await apiRunStatusValue({
                dtuId: this.currentDevice.id,
            });
            if (data) {
                this.onceGraphValue = JSON.parse(data);
                this.$emit("getNumber", {
                    key: "pv",
                    value: JSON.parse(data).pvPower,
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
        "r1  r3  r4" 1fr
        "r2  r3  r4" 1fr
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
}
</style>
