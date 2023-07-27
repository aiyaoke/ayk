<template>
    <PlaneBox>
        <template #title>{{ $translate("功率曲线报表") }}</template>
        <div slot="content" class="inner-wrapper">
            <div class="search">
                <el-date-picker
                    v-model="date"
                    size="mini"
                    type="date"
                    :editable="false"
                    :clearable="false"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <el-select v-model="type" size="mini" class="margin-lr">
                    <el-option
                        v-for="item in dayTypes"
                        :key="item.id"
                        :label="$translate(item.type)"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-button size="mini" type="primary" @click="handleSearch">
                    {{ $translate("查询") }}
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="clear"
                    class="margin-r"
                >
                    {{ $translate("清空") }}
                </el-button>
                <ExportExcel
                    title="功率曲线报表"
                    :fields="excel_fields"
                    :data="excel_data"
                />
            </div>
            <div class="chart-wrapper">
                <TimeChart :args="chartArgs" />
            </div>
        </div>
    </PlaneBox>
</template>

<script>
import {
    nowTime,
    getEchatsData,
    momentFormate,
    showMessage,
} from "@/common/utils";
import { getSeriesStyle } from "@/common/utils.echarts";
import { dayTypes } from "@/common/config";
import { apiGetPowerCurve, apiGet60kPowerCurve } from "@/api/device";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
    name: "TotalPower",
    data() {
        return {
            dayTypes,
            type: 1,
            date: nowTime(0, "YYYY-MM-DD"),
            // date:'2023-03-17',
            dateArr: [],
            chartArgs: {
                ref: "TotalPower",
                options: {
                    yAxis: {
                        name: "kW",
                    },
                    series: [],
                },
            },
            seriesName: {
                pvPowers: {
                    type: "bar",
                    key: "pvPowers",
                    name: "光伏功率",
                },
                batteryPowers: {
                    type: "line",
                    key: "batteryPowers",
                    name: "电池功率",
                },
                loadPowers: {
                    type: "bar",
                    key: "loadPowers",
                    name: "后备负载用电功率",
                },  
                farLoadPowers: {
                    type: "bar",
                    key: "farLoadPowers",
                    name: "远端负载功率",
                },
                gridPowers: {
                    type: "line",
                    key: "gridPowers",
                    name: "电网功率",
                },
                acPowers: {
                    type: "line",
                    key: "acPowers",
                    name: "ac功率",
                },
                meterPowers: {
                    type: "line",
                    key: "meterPowers",
                    name: "电表功率",
                },
                pcsPowers: {
                    type: "line",
                    key: "pcsPowers",
                    name: "pcs功率",
                },
                bmsPowers: {
                    type: "line",
                    key: "bmsPowers",
                    name: "bms功率",
                },
            },
            excel_fields: {
                sn: {
                    callback: (value) => this.currentDevice.sn,
                },
                [this.$translate("设备ID")]: {
                    callback: (value) => this.currentDevice.id,
                },
                [this.$translate("时间")]: "time",
            },
            excel_data: [],
        };
    },
    mounted() {
        this.handleSearch();
    },
    components: {
        PlaneBox: (_) => import("@/components/PlaneBox"),
        ExportExcel: (_) => import("@/components/ExportExcel"),
        TimeChart: (_) => import("@/components/Chart/TimeChart"),
    },
    computed: {
        ...device_getters(["currentDevice"]),
    },
    methods: {
        async handleSearch() {
            this.clear();
            if (this.dateArr.includes(this.date)) {
                return showMessage(
                    "warning",
                    this.$translate("该日期数据已存在")
                );
            } else {
                this.dateArr.push(this.date);
            }
            let requestData = {
                currentDate: this.date,
                type: this.type,
                dtuId: this.currentDevice.id,
            };
            let parseData;
            if (this.currentDevice.type == 4) {
                let { data } = await apiGet60kPowerCurve(requestData);
                parseData = data;
            }  else {
                let { data } = await apiGetPowerCurve(requestData);
                parseData = JSON.parse(data || "{}");
            }
            Object.entries(parseData).forEach((item, index) => {
                if (this.seriesName[item[0]]) {
                    let { type, key, name } = this.seriesName[item[0]];
                    this.chartArgs.options.series.push({
                        type,
                        key,
                        name: this.$translate(name),
                        data: getEchatsData(item[1]),
                    });
                }
            });
            this.formateExcelData();
        },
        clear() {
            this.dateArr = [];
            this.chartArgs.options.series = [];
            this.excel_data = [];
        },
        formateExcelData() {
            let { series: seriesData } = this.chartArgs.options;
            if (seriesData.length && seriesData[0].data) {
                let arr = this.excel_data;
                seriesData[0].data.forEach((item, index) => {
                    let dataItem = {};
                    seriesData.forEach(({ name, key, data }) => {
                        this.excel_fields = {
                            ...this.excel_fields,
                            [name]: key,
                        };
                        if (data.length) {
                            let [time, value] = data[index]["value"];
                        dataItem = {
                            time,
                            [key]: `${value}`,
                            ...dataItem,
                        };
                        }
                       
                    });
                    arr.push(dataItem);
                });
                this.excel_data = arr.sort((a, b) => a.time - b.time);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.inner-wrapper {
    height: 100%;
    position: relative;
    .search {
        height: 40px;
        @include dis-flex(center, center);
    }
    .chart-wrapper {
        height: calc(100% - 40px);
    }
}
</style>
