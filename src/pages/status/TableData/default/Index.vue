<template>
    <div class="params-value">
        <CardValue :value="batteryValue" />
        <CardValue :value="inverterValue" />
        <CardValue :value="pvValue" />
        <CardValue :value="gridValue" />
        <CardValue :value="loadValue" />
    </div>
</template>

<script>
import {
    apiGetBatteryData,
    apiGetInverterData,
    apiGetPvData,
    apiGetLoadData,
    apiGetGridData,
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
            batteryValue: {
                title: "电池状态",
                data: [
                    { name: "电池充放电状态", value: "-", key: "status" },
                    { name: "温度", value: "-", key: "tmpt" },
                    { name: "电压", value: "-", key: "voltage" },
                    { name: "电流", value: "-", key: "current" },
                    { name: "SOC", value: "-", key: "soc" },
                    { name: "SOH", value: "-", key: "soh" },
                    { name: "最大充电电流", value: "-", key: "maxChargeCur" },
                    { name: "最大放电电流", value: "-", key: "maxDischargeCur" },
                ],
            },
            inverterValue: {
                title: "逆变器状态",
                data: [
                    { name: "逆变器温度", value: "-", key: "tmpt" },
                    { name: "开关机状态", value: "-", key: "osmiStatus" },
                    { name: "工作模式", value: "-", key: "workStyle" },
                    { name: "AC侧运行状态", value: "-", key: "acStatus" },
                    { name: "DC侧运行状态", value: "-", key: "dcStatus" },
                    {
                        name: "连接状态",
                        value: "",
                        key: "onConnect",
                    },
                ],
            },
            pvValue: {
                title: "PV状态",
                data: [
                    { name: "PV运行状态", value: "-", key: "pvStatus" },
                    {
                        name: "累计发电量有功",
                        value: "-",
                        key: "cumulativeEnergy",
                    },
                    { name: "当日发电量有功", value: "-", key: "energyToday" },
                    { name: "直流电压PV1", value: "-", key: "dcVol1" },
                    { name: "直流电压PV2", value: "-", key: "dcVol2" },
                    { name: "直流电流PV1", value: "-", key: "dcCur1" },
                    { name: "直流电流PV2", value: "-", key: "dcCur2" },
                    { name: "直流功率PV1", value: "-", key: "pPV1" },
                    { name: "直流功率PV2", value: "-", key: "pPV2" },
                ],
            },
            gridValue: {
                title: "电网信息",
                data: [
                    { name: "电网电压R/U/A", value: "-", key: "volA" },
                    { name: "电网电压S/V/B", value: "-", key: "volB" },
                    { name: "电网电压T/W/C", value: "-", key: "volC" },
                    { name: "电网电流R/U/A", value: "-", key: "curA" },
                    { name: "电网电流S/V/B", value: "-", key: "curB" },
                    { name: "电网电流T/W/C", value: "-", key: "curC" },
                    { name: "电网频率", value: "-", key: "frequency" },
                    { name: "电网总功率", value: "-", key: "totalPower" },
                    { name: "电网总无功功率", value: "-", key: "totalRP" },
                ],
            },
            loadValue: {
                title: "本地负载",
                data: [
                    { name: "用电总功率", value: "-", key: "totalPower" },
                    { name: "用电功率因数", value: "-", key: "powerFactor" },
                    { name: "累计用电量", value: "-", key: "cumulativeEnergy" },
                    { name: "当日用电量", value: "-", key: "energyToday" },
                ],
            },
            intervalInstance: null,
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
            this.getBatteryData();
            this.getInverterData();
            this.getPvData();
            this.getLoadData();
            this.getGridData();
        },
        async getBatteryData() {
            let { data } = await apiGetBatteryData({
                dtuId: this.currentDevice.id,
            });
            if (data) {
                let parseData = JSON.parse(data);
                this.initValue(this.batteryValue, parseData);
                this.$emit("getNumber", {
                    key: "soc",
                    value: parseData.soc,
                });
            }
        },
        async getInverterData() {
            let { data } = await apiGetInverterData({
                dtuId: this.currentDevice.id,
            });
            if (data) {
                this.initValue(this.inverterValue, JSON.parse(data));
            }
        },
        async getPvData() {
            let { data } = await apiGetPvData({ dtuId: this.currentDevice.id });
            if (data) {
                let parseData = JSON.parse(data);
                this.initValue(this.pvValue, parseData);
            }
        },
        async getGridData() {
            let { data } = await apiGetGridData({
                dtuId: this.currentDevice.id,
            });
            if (data) {
                let parseData = JSON.parse(data);
                this.initValue(this.gridValue, parseData);
                this.$emit("getNumber", {
                    key: "grid",
                    value: parseData.totalPower,
                });
            }
        },
        async getLoadData() {
            let { data } = await apiGetLoadData({
                dtuId: this.currentDevice.id,
            });
            if (data) {
                this.initValue(this.loadValue, JSON.parse(data));
            }
        },
        initValue(baseData, resData) {
            baseData.data.forEach((item) => {
                if (resData.hasOwnProperty(item.key)) {
                    item.value = resData[item.key];
                }
            });
        },
    },
    watch: {
        connectStatus(newVal) {
            this.$set(this.inverterValue.data, 5, {
                name: "连接状态",
                value: newVal,
                key: "onConnect",
            });
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
