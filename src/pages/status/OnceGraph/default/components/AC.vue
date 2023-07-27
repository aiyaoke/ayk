<template>
    <div class="ac">
        <span class="val_wrapper">
            <span
                :style="{ color: gridActive ? status.color : '' }"
                class="val grid"
                >{{ status.val[0] }}</span
            >
            <span
                :style="{ color: loadActive ? status.color : '' }"
                class="val load"
                >{{ status.val[1] }}</span
            >
        </span>
        <div class="icon_wrapper">
            <IconBox
                :isActive="gridActive"
                iconClassName="icon-dianwanggongsi"
                :color="status.color"
            />
        </div>
        <div class="svg_wrapper" ref="svg_wrapper">
            <AnimatePath
                :isActive="status.isActive"
                :direction="status.direction"
                :color="status.color"
                :svgConfig="svgConfig"
            />
        </div>
        <div class="icon_wrapper">
            <IconBox
                :isActive="loadActive"
                iconClassName="icon-fuzaijunheng"
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
            svgPath: [],
            pointPath: [],
            svgConfig: [],
        };
    },
    computed: {
        gridActive() {
            let { elecToGridPower } = this.graphData;
            return Boolean(parseFloat(elecToGridPower));
        },
        loadActive() {
            let { loadPower } = this.graphData;
            return Boolean(parseFloat(loadPower));
        },
        status() {
            let { elecToGridPower, loadPower } = this.graphData;
            let tempVal = parseFloat(elecToGridPower);
            return {
                isActive: Boolean(tempVal),
                direction: tempVal > 0 ? "backward" : "forward",
                color: "#f76457 ",
                val: [elecToGridPower, loadPower],
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
                height = svgWrapperEl.clientHeight - 5,
                { loadPower } = this.graphData;
            this.svgConfig = [
                {
                    path: `M ${width} 5 V${height / 2 - 55} Q ${width} ${
                        height / 2
                    } ${width - 55} ${height / 2} H 5`,
                    ...this.status,
                },
                {
                    path: `M ${width - 55} ${height / 2}  Q ${width} ${
                        height / 2
                    } ${width} ${height / 2 + 55} v ${height / 2 - 55} `,
                    ...this.status,
                    isActive: Boolean(parseFloat(loadPower)),
                    direction: "forward",
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
    .val {
        position: absolute;
        right: 20px;
        font-size: 16px;
        font-family: DINCondensed-Bold;
        &.grid {
            top: 20%;
        }
        &.load {
            top: 80%;
        }
    }
}
</style>
