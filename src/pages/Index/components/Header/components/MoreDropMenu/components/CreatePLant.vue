<template>
    <el-drawer
        :title="
            createPLantVisible === 'create'
                ? $translate('创建一个电站')
                : $translate('编辑电站')
        "
        :visible.sync="visible"
        direction="ttb"
        :before-close="handleCancle"
        size="90%"
    >
        <el-form
            :model="formData"
            size="medium"
            :rules="rules"
            ref="ruleForm"
            label-width="130px"
            class="demo-ruleForm"
        >
            <template v-for="(item, index) in formDataArr">
                <el-form-item
                    :label="$translate(item.label)"
                    :prop="item.key"
                    :key="index"
                >
                    <el-select
                        v-if="item.key === 'timeZone'"
                        v-model="formData.timeZone"
                        size="small"
                    >
                        <el-option
                            v-for="item in item.list"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>

                    <el-radio-group
                        v-else-if="
                            item.key === 'status' || item.key === 'deviceTypeId'
                        "
                        v-model="formData[item.key]"
                    >
                        <el-radio
                            v-for="item in item.list"
                            :label="item.value"
                            :key="item.value"
                            >{{ $translate(item.label) }}
                        </el-radio>
                    </el-radio-group>

                    <el-input
                        v-else
                        type="text"
                        v-model="formData[item.key]"
                    ></el-input>
                </el-form-item>
            </template>

            <el-form-item>
                <el-button type="primary" size="small" @click="handleSure"
                    >{{ $translate("确定") }}
                </el-button>
                <el-button size="small" @click="handleCancle">{{
                    $translate("取消")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script>
import { plantStatus, plantTypes, timeZone } from "@/common/config";
import { apiUpdatePlant } from "@/api/plant";
import { showMessage, deepClone,checkFormat} from "@/common/utils";
import { createNamespacedHelpers } from "vuex";

const { mapGetters: plant_getters, mapActions: plant_actions } =
    createNamespacedHelpers("plant");
    const checkIsNull = message => ({
    required: true,
    message,
    trigger: "blur",
    type: "string",
    transform(value) {
        if (value) {
            return String(value);
        }
    },
});
export default {
    name: "CreatePLant",
    data() {
        return {
            visible: false,
            plantStatus,
            plantTypes,
            timeZone,
            formData: {
                name: "",
                designPower: "",
                position: "",
                latitude: "",
                longitude: "",
                timeZone: "",
                status: 1,
                deviceTypeId: "",
                gridType: "",
                capacity: "",
                angle: "",
                bevel: "",
            },
            formDataArr: [
                { label: "电站名称", key: "name" },
                { label: "电站功率", key: "designPower" },
                { label: "地址", key: "position" },
                { label: "纬度", key: "latitude" },
                { label: "经度", key: "longitude" },
                { label: "时区", key: "timeZone", list: timeZone },
                { label: "电站状态", key: "status", list: plantStatus },
                { label: "电站类型", key: "deviceTypeId", list: plantTypes },
                // { label: "并网类型", key: "gridType" },
                { label: "装机容量", key: "capacity" },
                { label: "方位角", key: "angle" },
                { label: "倾角", key: "bevel" },
            ],
            rules: {
                name: [
                    checkIsNull( this.$translate("请输入电站名称")),
                    checkFormat("Space", this.$translate("不能以空格开头")),
                ],
                designPower: [
                    {
                        required: true,
                        validator: this.checkIsDigital,
                        trigger: "blur",
                    },
                ],
                position: [
                    checkIsNull( this.$translate("请输入电站地址")),
                    checkFormat("Space", this.$translate("不能以空格开头")),
                ],
                latitude: [
                    checkIsNull( this.$translate("请输入纬度")),
                    checkFormat("latitude", this.$translate("格式有误")),
                ],
                longitude: [
                    checkIsNull( this.$translate("请输入经度")),
                    checkFormat("longitude", this.$translate("格式有误")),
                ],
                timeZone: [
                    {
                        required: true,
                        message: this.$translate("请选择时区"),
                        trigger: "blur",
                    },
                ],
                status: [
                    // {
                    //     required: true,
                    //     message: this.$translate("请选择电站状态"),
                    //     trigger: "blur",
                    // },
                ],
                deviceTypeId: [
                    {
                        required: true,
                        message: this.$translate("请选择电站类型"),
                        trigger: "blur",
                    },
                ],
                // gridType: [
                //     {
                //         required: true,
                //         message: this.$translate("请输入并网类型"),
                //         trigger: "blur",
                //     },
                // ],
                capacity: [
                    {
                        required: true,
                        validator: this.checkIsDigital,
                        trigger: "blur",
                    },
                ],
                angle: [
                    // {
                    //     required: true,
                    //     validator: this.checkIsDigital,
                    //     trigger: "blur",
                    // },
                ],
                bevel: [
                    // {
                    //     required: true,
                    //     validator: this.checkIsDigital,
                    //     trigger: "blur",
                    // },
                ],
            },
        };
    },
    props: {
        createPLantVisible: {
            type: String,
            default: "",
        },
    },
    computed: {
        ...plant_getters(["currentPlant"]),
    },
    methods: {
        ...plant_actions(["getAllPlants"]),
        checkIsDigital({ field }, value, callback) {
            let { label } = this.formDataArr.find((item) => item.key === field);
            if (value === "") {
                callback(new Error(`${this.$translate(`请输入${label}`)}`));
            } else if (!/^\d+$/.test(value)) {
                callback(
                    new Error(`${this.$translate(`${label}必须是纯数字`)}`)
                );
            } else {
                callback();
            }
        },
        handleCancle() {
            this.$emit("update:createPLantVisible", "");
            this.$refs.ruleForm.resetFields();
        },
        handleSure() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (!valid) return;
                let plantId =
                    this.createPLantVisible === "edit"
                        ? this.currentPlant.plantId
                        : 0;
                let requestData = Object.assign(this.formData, { plantId });
                let { code } = await apiUpdatePlant(requestData);
                if (code === "ok") {
                    await this.getAllPlants();
                    this.handleCancle();
                    showMessage(
                        "success",
                        plantId
                            ? this.$translate("编辑成功")
                            : this.$translate("添加成功")
                    );
                }
            });
        },
        setDefaultVal() {
            Object.keys(this.formData).forEach(
                (key) => (this.formData[key] = this.currentPlant[key])
            );
        },
    },
    watch: {
        createPLantVisible(newVal) {
            this.visible = Boolean(newVal);
            newVal === "edit" && this.setDefaultVal();
        },
    },
};
</script>

<style lang="scss" scoped>
.el-form {
    width: 50%;
    margin: 0 auto;
    min-width: 800px;
}
</style>
