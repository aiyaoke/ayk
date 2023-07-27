<template>
    <PlaneBox>
        <template #title> {{ $translate("光伏发电量报表") }}</template>
        <div slot="content" class="inner-wrapper">
            <div class="search">
                <el-date-picker
                    v-model="date"
                    size="mini"
                    type="date"
                    :editable="false"
                    :clearable="false"
                    value-format="yyyy-MM-dd"
                    class="margin-r"
                >
                </el-date-picker>
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
            <div class="totalNum">
                <div v-for="item in totalNum" :key="item.date">
                    {{ item.date }}：{{ item.value }}kWh
                </div>
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
import { apiGetPvCurve } from "@/api/device";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
    name: "PvPower",
    data() {
        return {
            date: nowTime(0, "YYYY-MM-DD"),
            dateArr: [],
            chartArgs: {
                ref: "PvPower",
                options: {
                    yAxis: {
                        name: "kWh",
                    },
                    series: [],
                },
            },
            totalNum: [],
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
                type: 1,
                dtuId: this.currentDevice.id,
            };
            let { data } = await apiGetPvCurve(requestData);
            data = getEchatsData(JSON.parse(data || "[]"));
            this.chartArgs.options.series.push({
                key: "pvPowers",
                name: this.$translate("光伏"),
                data,
            });
            this.calculateTotalNum(data);
            this.formateExcelData();
        },
        clear() {
            this.chartArgs.options.series = [];
            this.dateArr = [];
            this.totalNum = [];
            this.excel_data = [];
        },
        calculateTotalNum(data) {
            let sum;
            if (data.length) {
                sum = data.reduce(
                    (prev, next) => prev || 0 + next.value[1] || 0,
                    0
                );
            } else {
                sum = 0;
            }
            this.totalNum = [{ date: this.date, value: sum }, ...this.totalNum];
            this.totalNum.sort((u, v) => u.date - v.date);
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
    .totalNum {
        position: absolute;
        right: 25px;
        top: 90px;
        > div {
            font-size: 13px;
            color: #606266;
            margin-bottom: 8px;
        }
    }
}
</style>
