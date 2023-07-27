<template>
    <div class="chart-wrapper">
        <div class="mask" @click="showDetail">
            <span class="showDetail-text">{{ $translate("查看详情") }}</span>
            <span class="number">{{ chartArgs.number }}</span>
        </div>
        <TimeChart :args="mergeOptions" />
    </div>
</template>

<script>
export default {
    name: "Thumbnail",
    data() {
        return {
            options: {
                title: {
                    text: this.$translate(this.chartArgs.text),
                    left: "center",
                    top: 10,
                    textStyle: {
                        color: "#999",
                        fontSize: 14,
                    },
                },
                toolbox: {
                    show: false,
                },
                xAxis: {
                    type: "time",
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    name: "",
                },
                yAxis: {
                    type: "value",
                    name: "",
                    splitLine: { show: false },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                },
                grid: {
                    left: 20,
                    top: 40,
                    right: 20,
                    bottom: 20,
                },
                series: [],
            },
        };
    },
    props: {
        chartArgs: {
            type: Object,
            default: (_) => {},
        },
    },
    components: {
        TimeChart: (_) => import("@/components/Chart/TimeChart"),
    },
    methods: {
        showDetail() {
            this.$router.push({
                path: "/system/chart",
                query: { ref: this.chartArgs.ref },
            });
        },
    },
    computed: {
        mergeOptions() {
            let options = { ...this.options, ...this.chartArgs.options };
            return { ...this.chartArgs, options };
        },
    },
};
</script>

<style lang="scss" scoped>
.chart-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    @include bg-color("1");
    border-radius: 5px;
    .chart {
        width: 100%;
        height: 100%;
    }

    .mask {
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        @include dis-flex(center, center);

        .showDetail-text {
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            @include font-color("1");
            font-weight: bold;
            transition: all 0.5s ease;
        }

        .number {
            font-size: 50px;
            font-weight: bolder;
            font-family: DINCondensed-Bold;
            @include font-color("1");
            color: transparent;
        }

        &:hover {
            .showDetail-text {
                bottom: 20px;
            }
        }
    }
}
</style>
