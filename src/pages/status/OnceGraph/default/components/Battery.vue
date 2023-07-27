<template>
    <div class="battery">
        <span
            class="val_wrapper"
            :style="{ color: status.isActive ? status.color : '' }"
        >
            {{ status.val }}
            {{ status.unit }}
        </span>
        <div class="svg_wrapper" ref="svg_wrapper">
            <AnimatePath
                :isRuning="status.isActive"
                :direction="status.direction"
                :color="status.color"
                :svgConfig="svgConfig"
            />
        </div>
        <div class="icon_wrapper">
            <IconBox
                :isActive="status.isActive"
                iconClassName="icon-dianchibao"
                :color="status.color"
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
            svgConfig: [],
        };
    },
    computed: {
        status() {
            let { batteryPower } = this.graphData;
            let tempVal = parseFloat(batteryPower);
            return {
                isActive: Boolean(tempVal),
                direction: tempVal > 0 ? "forward" : "backward",
                color: "#30bf78",
                val: batteryPower,
                unit: "",
            };
        },
    },
    mounted() {
        this.initSvgSize();
    },
    methods: {
        initSvgSize() {
            let svgWrapperEl = this.$refs.svg_wrapper,
                width = svgWrapperEl.clientWidth - 5,
                height = svgWrapperEl.clientHeight - 5;
            this.svgConfig = [
                {
                    path: `M 5 ${height} V55 Q 5 5 55 5 H${width}`,
                    ...this.status,
                },
            ];
        },
    },
    watch: {
        graphData() {
            this.initSvgSize();
        },
    },
};
</script>

<style lang="scss" scoped>
.battery {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .svg_wrapper {
        width: 100%;
        flex: auto;
    }
    .icon_wrapper {
        width: 64px;
        height: 64px;
        position: relative;
        left: -30px;
    }
    .val_wrapper {
        position: absolute;
        left: 50%;
        top: 20px;
        transform: translateX(-50%);
        font-size: 16px;
        font-family: DINCondensed-Bold;
    }
}
</style>
