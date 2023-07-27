<template>
    <div class="status">
        <el-alert
            v-show="alertTitle"
            :title="alertTitle"
            type="error"
            center
            show-icon
        ></el-alert>
        <div class="charts-wrap">
            <div class="c1">
                <component
                    v-bind:is="com_onceGraph"
                    @getNumber="getNumber"
                ></component>
            </div>
            <div class="c2">
                <component
                    v-bind:is="com_thumbnail"
                    :chartArgs="c2_dataType"
                ></component>
            </div>
            <div class="c3">
                <component
                    v-bind:is="com_thumbnail"
                    :chartArgs="c3_dataType"
                    v-show="this.currentDevice.type!==12"
                ></component>
            </div>
            <div class="c4">
                <component
                    v-bind:is="com_thumbnail"
                    :chartArgs="c4_dataType"
                ></component>
            </div>
        </div>
        <component
            v-bind:is="com_tableData"
            :connectStatus="connectStatus"
            @getNumber="getNumber"
        ></component>
    </div>
</template>

<script>
import { nowTime, getEchatsData } from "@/common/utils";
import { apiGetPowerCurve, apiIsNewData, apiGetSocCurve } from "@/api/device";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");

export default {
    name: "Status",
    data() {
        return {
            gridPowers: {
                ref: "power",
                text: "电网功率",
                number: "",
                colorIndex: 4,
                options: {
                    series: [{ data: [] }],
                },
            },
            pvPowers: {
                ref: "pvPowers",
                text: "光伏功率",
                number: "",
                colorIndex: 0,
                options: {
                    series: [{ data: [] }],
                },
            },
            soc: {
                ref: "soc",
                text: "电池SOC",
                number: "",
                colorIndex: 3,
                options: {
                    series: [{ data: [] }],
                },
            }, 
            pcsPowers: {
                ref: "pcsPowers",
                text: "PCS功率",
                number: "",
                colorIndex: 4, 
                options: {
                    series: [{ data: [] }],
                },
            },
           meterPowers: {
                ref: "meterPowers",
                text: "电表功率",
                number: "",
                colorIndex: 0,
                options: {
                    series: [{ data: [] }],
                },
            },
            batteryPower:{
                ref: "batteryPower",
                text: "电池功率",
                number: "",
                colorIndex: 4,
                options: {
                    series: [{ data: [] }],
                },
            },
            alertTitle: "",
            intervalInstance: null,
            connectStatus: "",
        };
    },
    computed: {
        ...device_getters(["currentDevice"]),
        com_onceGraph() {
            let onceGraphObj = {
                4: "OnceGraph60K",
                5: "OnceGraph20Deg",
                7: "OnceGraph215",
                12:"OnceGraphWallMounted",
                13: "OnceGraph215",
            };
            return onceGraphObj[this.currentDevice.type] || "OnceGraphDefault";
        },
        com_tableData() {
            let tableDataObj = {
                4: "TableData60K",
                5: "TableData20Deg",
                7:  "TableData215",
                12: "TableDataWallMounted",
                13:  "TableData232",


            };
            return tableDataObj[this.currentDevice.type] || "TableDataDefault";
        },
        com_thumbnail() {
            let thumbnailObj = {
                4: "Thumbnail60k",
                5: "Thumbnail20deg",
                // 7: "Thumbnail215"
            };
            return thumbnailObj[this.currentDevice.type] || "ThumbnailDefault";
        },
        c2_dataType(){
            if (this.currentDevice.type===7||this.currentDevice.type===13) {
                return this.pcsPowers
            }
            if (this.currentDevice.type===12) {
                return this.batteryPower
            }
            return this.gridPowers
        },
        c3_dataType(){
            if (this.currentDevice.type===7||this.currentDevice.type===13) {
                return this.meterPowers
            }
            return this.pvPowers
        },
        c4_dataType(){
            return this.soc
        },
    },
    mounted() {
        this.getData();
        this.intervalInstance = setInterval((_) => this.getData(), 60000);
        console.log(this.currentDevice.type);
    },
    components: {
        OnceGraph60K: (_) => import("./OnceGraph/60k/Index"),
        OnceGraph20Deg: (_) => import("./OnceGraph/20deg/Index"),
        OnceGraphDefault: (_) => import("./OnceGraph/default/Index"),
        OnceGraph215:(_) => import("./OnceGraph/215OutdoorCabinet/Index"),
        OnceGraphWallMounted:(_) => import("./OnceGraph/WallMounted/Index.vue"),
        TableData60K: (_) => import("./TableData/60k/Index"),
        TableData20Deg: (_) => import("./TableData/20deg/Index"),
        TableDataDefault: (_) => import("./TableData/default/Index"),
        TableData215: (_) => import("./TableData/215OutdoorCabinet/Index.vue"),
        TableData232: (_) => import("./TableData/232OutdoorCabinet/Index.vue"),
        TableDataWallMounted: (_) => import("./TableData/WallMounted/Index.vue"),
        Thumbnail60k: (_) => import("./Thumbnail/60k/Index"),
        Thumbnail20deg: (_) => import("./Thumbnail/20deg/Index"),
        ThumbnailDefault: (_) => import("./Thumbnail/default/Index"),
        Thumbnail215: (_) => import("./Thumbnail/default/Index"),
    },
    methods: {
        getNumber({ key, value }) {
            if (key === "soc") {
                this.soc.number = value;
            }
            if (key === "pv") {
                this.pvPowers.number = value + "W";
            }
            if (key === "grid") {
                this.gridPowers.number = value;
            }
            if (key === "215") {
                let {pcs,meter,soc}=value
                this.pcsPowers.number = pcs;
                this.meterPowers.number=meter;
                this.soc.number = soc;
            }
        },
        async getData() {
            this.getChartsData();
            this.isNewData();
            this.getSocCurve();
        },
        async isNewData() {
            let requestData = {
                flag: 1,
                dtuId: this.currentDevice.id,
            };
            let res = await apiIsNewData(requestData);
            if (res.code === "ok") {
                let { last, time } = JSON.parse(res.data);
                if (last) {
                    this.connectStatus = this.$translate("已连接");
                } else {
                    this.connectStatus = this.$translate("断开连接");
                    this.alertTitle = `${this.$translate(
                        "断开连接,未采集到新数据"
                    )}，${this.$translate("最后断连时间")}：${time}`;
                }
            } else {
                this.connectStatus = this.$translate("断开连接");
                this.alertTitle = this.$translate("断开连接,未采集到新数据");
            }
        },
        async getChartsData() {
            let requestData = {
                currentDate: nowTime(0, "YYYY-MM-DD"),
                type: 1,
                dtuId: this.currentDevice.id,
            };
            let { data } = await apiGetPowerCurve(requestData);
            data = JSON.parse(data || "[]");
            this.gridPowers.options.series[0].data = getEchatsData(
                data.gridPowers
            );
            this.pvPowers.options.series[0].data = getEchatsData(data.pvPowers);
            this.pcsPowers.options.series[0].data=getEchatsData(data.pcsPowers);
            this.meterPowers.options.series[0].data=getEchatsData(data.meterPowers);
        },
        async getSocCurve() {
            let requestData = {
                currentDate: nowTime(0, "YYYY-MM-DD"),
                type: 1,
                dtuId: this.currentDevice.id,
            };
            let { data } = await apiGetSocCurve(requestData);
            data = JSON.parse(data || "[]");
            this.soc.options.series[0].data = getEchatsData(data);
        },
        
    },
    destroyed() {
        clearInterval(this.intervalInstance);
    },
};
</script>

<style lang="scss" scoped>
.status {
    .charts-wrap {
        margin: 20px 0;
        display: grid;
        grid-template:
            "c1  c1  c2" 1fr
            "c1  c1  c3" 1fr
            "c1  c1  c4" 1fr
            /1fr 1fr 1fr;
        grid-gap: 25px;

        > div {
            border-radius: 5px;
            padding: 10px;
            box-sizing: border-box;
            @include bg-color("2");
        }

        .c1 {
            grid-area: c1;
        }

        .c2 {
            grid-area: c2;
        }

        .c3 {
            grid-area: c3;
        }

        .c4 {
            grid-area: c4;
        }
    }
}
</style>
