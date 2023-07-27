<template>
    <div class="used">
        <div class="extra"></div>
        <div class="dtuImg"></div>
        <div class="content">
            <div class="runLine-wraper">
                <RunLine :value="value" layout="usedLayout" color="#e6aa0f" />
            </div>

            <div
                :class="
                    'i-wrapper ' +
                    [
                        parseInt(value) !== 0
                            ? 'onLineColor icon-border-animate'
                            : 'runLineIcon-offLine ',
                    ]
                "
            >
                <i class="iconfont icon-susheyongdian"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Used",
    props: {
        value: {
            type: String,
            default: "",
        },
    },
    components: {
        RunLine: (_) => import("@/components/RunLine"),
    },
};
</script>

<style lang="scss" scoped>
$onLineColor: #e6aa0f;
.onLineColor {
    color: $onLineColor;
}
@keyframes breath {
    from {
        box-shadow: 0 0 8px -1px $onLineColor;
    }
    to {
        box-shadow: 0 0 25px -1px $onLineColor;
    }
}
.used {
    width: 100%;
    height: 100%;
    position: relative;
    @include dis-flex(flex-start, flex-start, column);
    .i-wrapper {
        width: 70px;
        height: 70px;
        border: 1.5px solid $onLineColor;
        border-radius: 50%;
        @include dis-flex(center, center);
    }
    i {
        font-size: 40px;
    }
    .extra {
        flex: 1;
    }
    .dtuImg {
        width: 150px;
        height: 100px;
        background: url("#{$img-url}/5-10kdtu.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        left: -20px;
    }
    .content {
        flex: 1;
        @include dis-flex(center, center);
        height: 0;
        .runLine-wraper {
            height: 70%;
        }
    }
}
</style>
