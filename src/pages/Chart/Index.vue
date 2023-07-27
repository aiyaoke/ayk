<template>
    <div class="chart">
        <TotalPower />
        <GridBuy />
        <SocStatus />
    </div>
</template>

<script>
export default {
    name: "Chart",
    components: {
        TotalPower: (_) => import("./components/TotalPower"),
        GridBuy: (_) => import("./components/GridBuy"),
        SocStatus: (_) => import("./components/SocStatus"),
    },
};
</script>
<style lang="scss" scoped>
.chart {
    .plane-box {
        height: 50vh;
        min-height: 470px;
    }
}
</style>
