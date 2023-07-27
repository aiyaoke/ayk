<template>
    <div class="pv">
        <span
            class="val_wrapper"
            :style="{ color: status.isActive ? status.color : '' }"
        >
            {{ status.val }}
            {{ status.unit }}
        </span>
        <div class="icon_wrapper">
            <IconBox
                :isActive="status.isActive"
                iconClassName="icon-guangfu"
                :color="status.color"
            />
        </div>
        <div class="svg_wrapper" ref="svg_wrapper">
            <AnimatePath
                :isRuning="status.isActive"
                :color="status.color"
                :svgConfig="svgConfig"
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
            let { pvPower } = this.graphData;
            return {
                isActive: Boolean(parseFloat(pvPower)),
                direction: "forward",
                color: "#416de5",
                val: pvPower,
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
                    path: `M 5 5 V${
                        height - 55
                    } Q 5 ${height} 55 ${height} H${width}`,
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
.pv {
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
        bottom: 20px;
        transform: translateX(-50%);
        font-size: 16px;
        font-family: DINCondensed-Bold;
    }
}
</style>
