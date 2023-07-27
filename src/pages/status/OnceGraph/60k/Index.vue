<template>
    <div class="running-chart">
        <PV class="r1" :graphData="onceGraphValue" />
        <Battery class="r2" :graphData="onceGraphValue" />
        <div class="r3"></div>
        <AC class="r4" :graphData="onceGraphValue" />
    </div>
</template>

<script>
import { apiGet60kOnceGraph } from "@/api/device";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
    name: "RunningChart",
    data() {
        return {
            intervalInstance: null,
            onceGraphValue: "",
        };
    },
    mounted() {
        this.get60kOnceGraph();
        this.intervalInstance = setInterval(
            (_) => this.get60kOnceGraph(),
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
    },
    methods: {
        async get60kOnceGraph() {
            let { data } = await apiGet60kOnceGraph({
                dtuId: this.currentDevice.id,
            });
            this.onceGraphValue = data;
            this.$emit("getNumber", {
                key: "pv",
                value: "",
            });
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
        background: url("#{$img-url}/60kdtu.png") no-repeat;
        background-size: 100% 273px;
        background-position: center;
    }
    .r4 {
        grid-area: r4;
    }
}
</style>
