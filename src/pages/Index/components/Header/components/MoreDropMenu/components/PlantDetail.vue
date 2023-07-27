<template>
    <el-dialog
        :title="$translate('详细信息')"
        :visible.sync="visible"
        @close="close"
        width="800px"
    >
        <div class="detail-content">
            <div class="item" v-for="(item, index) in detailArry" :key="index">
                <i :class="'iconfont ' + item.icon + addRotate(item.key)"></i>
                <span>{{ $translate(item.title) }}：</span>
                <div>{{ item.value }}</div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapGetters: plant_getters } = createNamespacedHelpers("plant");

export default {
    name: "PlantDetail",
    data() {
        return {
            visible: false,
            detailArry: [
                {
                    title: "名称",
                    key: "name",
                    value: "",
                    icon: "icon-zhongxingshuidianzhan",
                },
                {
                    title: "所属用户",
                    key: "userNames",
                    value: "",
                    icon: "icon-duoren",
                },
                {
                    title: "位置",
                    key: "position",
                    value: "",
                    icon: "icon-weizhi1",
                },
                {
                    title: "经销商",
                    key: "fName",
                    value: "",
                    icon: "icon-renwu",
                },
                {
                    title: "经度",
                    key: "longitude",
                    value: "",
                    icon: "icon-jingweidu",
                },
                {
                    title: "纬度",
                    key: "latitude",
                    value: "",
                    icon: "icon-jingweidu",
                },
                {
                    title: "电话",
                    key: "phone",
                    value: "",
                    icon: "icon-dianhua1",
                },
                {
                    title: "邮箱",
                    key: "mail",
                    value: "",
                    icon: "icon-youxiang",
                },
                {
                    title: "时区",
                    key: "timeZone",
                    value: "",
                    icon: "icon-earth",
                },
            ],
        };
    },
    props: {
        pLantDetailVisible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...plant_getters(["currentPlant"]),
    },
    methods: {
        addRotate(key) {
            return key === "latitude" ? " rotate" : "";
        },
        close() {
            this.$emit("update:pLantDetailVisible", false);
        },
        setVal() {
            this.detailArry.forEach((item) => {
                let value = this.currentPlant[item.key];
                item.value =
                    item.key === "userNames"
                        ? value && value.join("，")
                        : value;
            });
        },
    },
    watch: {
        pLantDetailVisible(newVal) {
            this.visible = newVal;
            newVal && this.setVal();
        },
    },
};
</script>

<style lang="scss" scoped>
>>> .el-dialog__body {
    padding: 0 !important;
}
.detail-content {
    @include dis-flex(flex-start, center);
    flex-wrap: wrap;
    .item {
        width: calc(50% - 20px);
        @include bg-color("1");
        border-radius: 5px;
        margin: 10px;
        @include dis-flex(flex-start, center);
        padding: 10px;
        box-sizing: border-box;
        @include font-color("1");
        i {
            color: $colorful-6;
            font-size: 19px;
            margin-right: 10px;
            &.rotate {
                transform: rotateX(180deg);
            }
        }
    }
}
</style>
