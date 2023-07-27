<template>
    <div class="params-value">
        <CardValue :value="batteryStatus" />
        <CardValue :value="dc" />
        <CardValue :value="pv" />
        <CardValue :value="ac" />
    </div>
</template>

<script>
import {
    apiGet60kBatteryStatus,
    apiGet60kAcInfo,
    apiGet60kDcInfo,
    apiGet60kPvInfo,
} from "@/api/device";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
    name: "ParamsValue",
    props: {
        connectStatus: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            intervalInstance: null,
            batteryStatus: {
                title: "电池状态",
                data: [],
            },
            ac: {
                title: "AC模块",
                data: [],
            },
            dc: {
                title: "DC模块",
                data: [],
            },
            pv: {
                title: "PV模块",
                data: [],
            },
        };
    },
    components: {
        CardValue: (_) => import("./components/CardValue"),
    },
    mounted() {
        this.getData();
        this.intervalInstance = setInterval((_) => this.getData(), 60000);
    },
    computed: {
        ...device_getters(["currentDevice"]),
    },
    methods: {
        getData() {
            this.getBatteryStatus();
            this.getAcInfo();
            this.getDcInfo();
            this.getPvInfo();
        },
        async getBatteryStatus() {
            let { data } = await apiGet60kBatteryStatus({
                dtuId: this.currentDevice.id,
            });
            this.batteryStatus.data = data || [];
        },
        async getAcInfo() {
            let { data } = await apiGet60kAcInfo({
                dtuId: this.currentDevice.id,
            });
            this.ac.data = data || [];
        },
        async getDcInfo() {
            let { data } = await apiGet60kDcInfo({
                dtuId: this.currentDevice.id,
            });
            this.dc.data = data || [];
        },
        async getPvInfo() {
            let { data } = await apiGet60kPvInfo({
                dtuId: this.currentDevice.id,
            });
            this.pv.data = data || [];
        },
    },
    destroyed() {
        clearInterval(this.intervalInstance);
    },
};
</script>

<style lang="scss" scoped>
.params-value {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    > div {
        @include bg-color("2");
        border-radius: 3px;
    }
}
</style>
