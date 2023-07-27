<template>
    <div class="used">
        <div class="extra"></div>
        <div class="dtu"></div>
        <div class="content">
            <span
                class="val"
                :style="{ color: status.isActive ? status.color : '' }"
                >{{ status.val }}</span
            >
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
                    iconClassName="icon-susheyongdian"
                    :color="status.color"
                />
            </div>
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
            let { elecUsedPower } = this.graphData;
            return {
                isActive: Boolean(parseFloat(elecUsedPower)),
                direction: "forward",
                color: "#e6aa0f",
                val: elecUsedPower,
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
                height = svgWrapperEl.clientHeight - 5;
            this.svgConfig = [
                {
                    path: `M ${50} 0 V ${height}`,
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
.used {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .extra,
    .content {
        flex: 1;
    }
    .dtu {
        width: 125px;
        height: 100px;
        background: url("#{$img-url}/5-10kdtu.png") no-repeat;
        background-size: 100% 100%;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .val {
            position: absolute;
            top: 40%;
            left: 80px;
            font-size: 16px;
            font-family: DINCondensed-Bold;
        }
        .svg_wrapper {
            width: 100%;
            height: calc(100% - 64px);
        }
        .icon_wrapper {
            width: 64px;
            height: 64px;
            position: relative;
        }
    }
}
</style>
