<template>
    <div class="ac">
        <span
            class="val_wrapper"
            :style="{ color: status.isActive ? color : '' }"
        >
            <template v-for="(item, index) in getValue">
                <div v-if="item.val !== undefined" :key="index">
                    {{ item.val }}
                    {{ item.unit }}
                </div>
                <div v-else class="extra" :key="index"></div>
            </template>
        </span>
        <div class="icon_wrapper">
            <IconBox
                :isActive="status.isActive"
                iconClassName="icon-dianwanggongsi"
                :color="color"
            />
        </div>
        <div class="svg_wrapper" ref="svg_wrapper">
            <AnimatePath
                :isRuning="status.isActive"
                :direction="status.direction"
                :color="color"
                :linearColor="['rgb(247, 162, 25)', color]"
                linearId="ac"
                :svgPath="svgPath"
                :pointPath="pointPath"
            />
        </div>
        <div class="icon_wrapper">
            <IconBox
                :isActive="status.isActive"
                iconClassName="icon-fuzaijunheng"
                :color="color"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "AC",
    props: ["graphData"],
    components: {
        AnimatePath: (_) => import("./AnimatePath"),
        IconBox: (_) => import("./IconBox"),
    },
    data() {
        return {
            status: {
                isActive: false,
                direction: "",
            },
            color: "#f76457",
            svgPath: [],
            pointPath: [],
        };
    },
    computed: {
        getValue() {
            let res = [];
            if (this.graphData) {
                let {
                    acAPhaseVol,
                    acBPhaseVol,
                    acCPhaseVol,
                    acActivePower,
                    acReactivePower,
                } = this.graphData;
                res = [
                    acBPhaseVol,
                    acCPhaseVol,
                    acAPhaseVol,
                    {},
                    acActivePower,
                    acReactivePower,
                ];
                let tempVal = parseFloat(this.graphData.acActivePower.val);
                this.status = {
                    isActive: Boolean(tempVal),
                    direction: tempVal > 0 ? "forward" : "backward",
                };
            } else {
                this.status = {
                    isActive: false,
                    direction: "",
                };
            }

            return res;
        },
    },
    mounted() {
        this.initSvgSize();
        window.onresize = () => {
            this.$nextTick(() => {
                this.initSvgSize();
            });
        };
    },
    methods: {
        initSvgSize() {
            let width = this.$refs.svg_wrapper.clientWidth - 5;
            let height = this.$refs.svg_wrapper.clientHeight - 5;
            this.svgPath = [
                `M ${width} 5 V${height / 2 - 55} Q ${width} ${height / 2} ${
                    width - 55
                } ${height / 2} H 5`,
                `M ${width} ${height} V${height / 2 + 55} Q ${width} ${
                    height / 2
                } ${width - 55} ${height / 2} H 5 `,
            ];
            this.pointPath = [
                `M ${width} 5 V${height / 2 - 55} Q ${width} ${height / 2} ${
                    width - 55
                } ${height / 2} H 5`,
                `M ${width} ${height} V${height / 2 + 55} Q ${width} ${
                    height / 2
                } ${width - 55} ${height / 2} H 5 `,
            ];
        },
    },
};
</script>

<style lang="scss" vars="{ color }" scoped>
.ac {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .svg_wrapper {
        width: 100%;
        flex: auto;
    }
    .icon_wrapper {
        width: 64px;
        height: 64px;
        position: relative;
        left: 30px;
    }
    .val_wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, calc(-50% - 10px));
        font-size: 16px;
        font-family: DINCondensed-Bold;
        > div {
            height: 20px;
        }
    }
}
</style>
