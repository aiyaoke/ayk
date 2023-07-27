<template>
    <div class="pv">
        <span class="val_wrapper" :style="{ color: isActive ? color : '' }">
            {{ getValue.val }}
            {{ getValue.unit }}
        </span>
        <div class="icon_wrapper">
            <IconBox
                :isActive="isActive"
                iconClassName="icon-guangfu"
                :color="color"
            />
        </div>
        <div class="svg_wrapper" ref="svg_wrapper">
            <AnimatePath
                :isRuning="isActive"
                :color="color"
                :linearColor="[color, 'rgb(247, 162, 25)']"
                linearId="pv"
                :svgPath="svgPath"
                :pointPath="pointPath"
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
            isActive: false,
            color: "#416de5",
            svgPath: [],
            pointPath: [],
        };
    },
    computed: {
        getValue() {
            let res = { val: 0, unit: "" };
            if (this.graphData) {
                this.isActive = Boolean(
                    parseFloat(this.graphData.pvLowSidePower.val)
                );
                res = {
                    ...this.graphData.pvLowSidePower,
                };
            } else {
                this.isActive = false;
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
                `M 5 5 V${height - 55} Q 5 ${height} 55 ${height} H${width}`,
            ];
            this.pointPath = [
                `M 5 5 V${height - 55} Q 5 ${height} 55 ${height} H${width}`,
            ];
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
