<template>
    <PlaneBox>
        <template #title>{{ currentData.desc }}</template>
        <div slot="content" class="inner-wrapper">
            <div class="search">
                <el-date-picker v-model="date" range-separator="-" size="mini" type="daterange" :editable="false"
                    value-format="yyyy-MM-dd" :start-placeholder="$translate('开始日期')" :end-placeholder="$translate('结束日期')"
                    class="margin-lr"></el-date-picker>
                <el-button size="mini" type="primary" @click="handleSearch">
                    {{ $translate("查询") }}
                </el-button>
                <el-button size="mini" type="danger" @click="clear" class="margin-r">
                    {{ $translate("清空") }}
                </el-button>
                <!-- <ExportExcel :title="currentData.desc" :fields="excel_fields" :data="excel_data" /> -->
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
import { apiGetHistoricalPlantData } from "@/api/plant";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
const { mapGetters: plant_getters } = createNamespacedHelpers("plant");

export default {
    name: "TotalPower",
    props: ['currentData', 'close'],
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
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: []
                    },

                    series: [

                    ],
                },
            },
            seriesName: {
                dayEarning: {
                    type: "bar",
                    key: "dayEarning",
                    name: "当日收益",
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
            allData: [
                {
                    peakChargeEnergy: {
                        data: [],
                        name: '峰值充电量'
                    },
                    tipChargeEnergy: {
                        data: [],
                        name: '尖值充电量'
                    },
                    valleyChargeEnergy: {
                        data: [],
                        name: '谷值充电量'
                    },
                    flatChargeEnergy: {
                        data: [],
                        name: '平值充电量'
                    },
                },
                {
                    peakDischargeEnergy: {
                        data: [],
                        name: '峰值放电量'
                    },
                    tipDischargeEnergy: {
                        data: [],
                        name: '尖值放电量'
                    },
                    valleyDischargeEnergy: {
                        data: [],
                        name: '谷值放电量'
                    },
                    flatDischargeEnergy: {
                        data: [],
                        name: '平值放电量'
                    },

                }
            ]
        };
    },
    mounted() {
        // this.handleSearch();
    },
    components: {
        PlaneBox: (_) => import("@/components/PlaneBox"),
        ExportExcel: (_) => import("@/components/ExportExcel"),
        TimeChart: (_) => import("@/components/Chart/TimeChart"),
    },
    computed: {
        ...device_getters(["currentDevice"]),
        ...plant_getters(["currentPlant"]),

    },
    methods: {
        handleChangePlant() {
        },
        async handleSearch() {
            let requestData = {
                startD: this.date[0],
                endD: this.date[1],
                modelId: this.currentData.id,
                plantId: this.currentPlant.plantId,
            };
            let { code, data } = await apiGetHistoricalPlantData(
                requestData
            )
            if (code === 'ok') {
                let { format, unit,data:parseData } = data
                this.chartArgs.options.yAxis.name = unit;
                this.chartArgs.options.series = [];
                this.chartArgs.options.xAxis.data = [];
                if (format == 3) {
                    if (this.currentData.code == 'CHARGE_DAILY'||this.currentData.code == 'CHARGE_TOTAL') {
                        for (const key in this.allData[0]) {
                            parseData.forEach((item, index) => {
                                this.allData[0][key].data[index]=item[key];
                        })
                        let obj = {
                                name: this.allData[0][key].name,
                                type: 'bar',
                                data: this.allData[0][key].data
                                }
                                this.chartArgs.options.series.push(obj);
                        }
                        parseData.forEach((item, index) => {
                        this.chartArgs.options.xAxis.data.push(new Date(item.date).toLocaleString())
                        })

                    } else if (this.currentData.code == 'DISCHARGE_DAILY'||this.currentData.code == 'DISCHARGE_TOTAL') {
                        for (const key in this.allData[1]) {
                                data.data.forEach((item, index) => {
                                this.allData[1][key].data[index]=item[key];
                        })
                        let obj = {
                                name: this.allData[1][key].name,
                                type: 'bar',
                                data: this.allData[1][key].data
                                }
                                this.chartArgs.options.series.push(obj);
                        }
                        parseData.forEach((item, index) => {
                        this.chartArgs.options.xAxis.data.push(new Date(item.date).toLocaleString())
                        })
                    }else{
                            let xData = [];
                            let yData = [];
                        parseData.forEach((item,index)=>{
                            xData.push(momentFormate(item.date, "YYYY-MM-DD"));
                            yData.push(item.dayEarning);
                        })

                this.chartArgs.options.series.push({ name: this.currentData.desc, type: 'line', data: yData,smooth: true ,},)
                this.chartArgs.options.xAxis.data = xData;

                    }

                };
                if (format == 1||format == 2) {
                    let obj={
                                data: [],
                                type: 'bar'
                                }
                    data.data.forEach((item, index) => {
                        this.chartArgs.options.xAxis.data.push(new Date(item.date).toLocaleString())
                        obj.data[index]=item.fee || item.sum;    
                        });
                        this.chartArgs.options.series.push(obj)
                }
            } else {
                this.clear();
            }
            this.formateExcelData();
        },
        clear() {
            this.dateArr = [];
            this.chartArgs.options.series = [];
            this.excel_data = [];
        },
        formateExcelData() {
            let { series: seriesData } = this.chartArgs.options;
            if (seriesData.length && seriesData[0].data.length) {
                let arr = this.excel_data;
                seriesData[0].data.forEach((item, index) => {
                    let dataItem = {};
                    seriesData.forEach(({ name, key, data }) => {
                        this.excel_fields = {
                            ...this.excel_fields,
                            [name]: key,
                        };
                        let [time, value] = data[index]["value"];
                        dataItem = {
                            time,
                            [key]: `${value}`,
                            ...dataItem,
                        };
                    });
                    arr.push(dataItem);
                });
                this.excel_data = arr.sort((a, b) => a.time - b.time);
            }
            
        },
       
    },
    watch: {
        chartArgs: {
            deep: true,
            immediate: true,
            handler: function (newVal) {
            }
        },
        close: {
            handler: function (newVal) {
                if (newVal == 0) {
                    this.clear();
                }
            }
        }
    }
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
