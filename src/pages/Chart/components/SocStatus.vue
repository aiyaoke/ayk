<template>
    <PlaneBox>
        <template #title> {{ $translate("电池SOC状态报表") }}</template>
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
                    title="电池SOC状态报表"
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
import { apiGetSocCurve } from "@/api/device";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
    name: "SocStatus",
    data() {
        return {
            date: nowTime(0, "YYYY-MM-DD"),
            dateArr: [],
            chartArgs: {
                ref: "SocStatus",
                colorIndex: 4,
                options: {
                    yAxis: {
                        name: "%",
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
            let { data } = await apiGetSocCurve(requestData);
            data = getEchatsData(JSON.parse(data || "[]"));
            this.chartArgs.options.series.push({
                key: "SOC",
                name: "SOC",
                data,
            });
            this.formateExcelData();
        },
        clear() {
            this.chartArgs.options.series = [];
            this.dateArr = [];
            this.totalNum = [];
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
