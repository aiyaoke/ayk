<template>
    <div class="battery">
        <span
            class="val_wrapper"
            :style="{ color: status.isActive ? color : '' }"
        >
            {{ getValue.val }}
            {{ getValue.unit }}
        </span>
        <div class="svg_wrapper" ref="svg_wrapper">
            <AnimatePath
                :isRuning="status.isActive"
                :direction="status.direction"
                :color="color"
                :linearColor="[color, 'rgb(247, 162, 25)']"
                linearId="battery"
                :svgPath="svgPath"
                :pointPath="pointPath"
            />
        </div>
        <div class="icon_wrapper">
            <IconBox
                :isActive="status.isActive"
                iconClassName="icon-dianchibao"
                :color="color"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "AC",
    props: ["graphData", "backgroundColor"],
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
            color: "#30bf78",
            svgPath: [],
            pointPath: [],
        };
    },
    computed: {
        getValue() {
            let res = { val: 0, unit: "" };
            if (this.graphData) {
                let tempVal = parseFloat(this.graphData.batPower.val);
                tempVal = -10;
                this.status = {
                    isActive: Boolean(tempVal),
                    direction: tempVal > 0 ? "forward" : "backward",
                };
                res = {
                    ...this.graphData.batPower,
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
            this.svgPath = [`M 5 ${height} V55 Q 5 5 55 5 H${width}`];
            this.pointPath = [`M 5 ${height} V55 Q 5 5 55 5 H${width}`];
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
