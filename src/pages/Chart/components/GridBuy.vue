<template>
    <PlaneBox>
        <template #title>{{ $translate("电量报表") }}</template>
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
                    title="电量报表"
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
import { apiGetGridBuyConnectPvtHistory } from "@/api/device";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
    name: "TotalPower",
    data() {
        return {
            dayTypes,
            type: 1,
            date: nowTime(0, "YYYY-MM-DD"),
            dateArr: [],
            chartArgs: {
                ref: "TotalPower",
                options: {
                    yAxis: {
                        name: "kWh",
                    },
                    series: [],
                },
            },
            seriesName: {
                gridBuy: {
                    type: "line",
                    key: "gridBuy",
                    name: "电网买电",
                },
                gridElec: {
                    type: "line",
                    key: "gridElec",
                    name: "并网量",
                },
                pv: {
                    type: "line",
                    key: "pv",
                    name: "pv",
                },
                meterEnergy: {
                    type:'line',
                    name:"电表电量",
                    key: "meterEnergy",
                    // data: meterEnergy,
                },
                chargeEnergy: {
                    type:'line',
                    name:"充电电量",
                    key: "chargeEnergy",
                    // data: meterEnergy,
                },
                dischargeEnergy: {
                    type:'line',
                    name:"放电电量",
                    key: "dischargeEnergy",
                    // data: meterEnergy,
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
            let { data: parseData } = await apiGetGridBuyConnectPvtHistory(
                requestData
            );
            let {meterEnergy,chargeEnergy,dischargeEnergy}=parseData
            console.log(parseData);
            Object.entries(parseData).forEach((item, index) => {
                let { type, key, name } = this.seriesName[item[0]];
                if(name==="电表电量") return;  //去掉电表电量
                this.chartArgs.options.series.push({
                    type,
                    key,
                    name: this.$translate(name),
                    data: getEchatsData(item[1]),
                });
            })
            return;
            if (this.currentDevice.type==7) {
                this.chartArgs.options.series.push({
                    type:'line',
                    name: this.$translate('电表电量'),
                    data: meterEnergy,
                },
                {
                    type:'line',
                    name: this.$translate('充电电量'),
                    data: chargeEnergy,
                },
                {
                    type:'line',
                    name: this.$translate('放电电量'),
                    data: dischargeEnergy,
                }
                );
            }else{ ;}
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
                // if(!this.excel_data.length){
                //   showMessage('warning','暂无可用数据！')
                // }
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
