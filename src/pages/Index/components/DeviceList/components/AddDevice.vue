<template>
    <el-dialog :title="$translate('添加设备')" :visible.sync="visible" width="500px" :before-close="handleCancle">
        <el-form :model="formData" size="medium" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <el-form-item label="SN" prop="sn">
                <el-input v-model="formData.sn"></el-input>
            </el-form-item>
            <el-form-item :label="$translate('设备类型')" prop="type">
                <el-select v-model="formData.type" :placeholder="$translate('请选择设备类型')" style="width: 100%;" >
                    <el-option v-for="item in options" :key="item.value" :label="item.desc" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$translate('安装位置')" prop="address">
                <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="handleSure">{{
                    $translate("确定")
                }}</el-button>
                <el-button size="small" @click="handleCancle">{{
                    $translate("取消")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { apiAddDevice } from "@/api/device";
import { apiGetIndexKeywords } from "@/api/command";

import { showMessage, checkFormat } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";

const { mapGetters: plant_getters, mapActions: plant_actions } = createNamespacedHelpers("plant");
const { mapActions: device_actions } = createNamespacedHelpers("device");
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
    name: "AddDevice",
    data() {
        return {
            visible: false,
            options:[],
            formData: {
                sn: "",
                address: "",
                type:""
            },
            rules: {
                sn: [
                    checkIsNull(this.$translate("请输入sn号")),
                    checkFormat("Space", this.$translate("不能以空格开头")),
                ],
                type:[
                checkIsNull(this.$translate("请选择设备类型")),

                ]
            },
        };
    },
    props: {
        addDeviceVisible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...plant_getters(["currentPlant"]),
    },mounted () {
        this.getType();
    },
    methods: {
        ...device_actions(["getAllDevices", "getPlantModels"]),
        ...plant_actions(["getPlantModels"]),

        handleCancle() {
            this.$emit("update:addDeviceVisible", false);
            this.$refs.ruleForm.resetFields();
        },
        handleSure() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (!valid) return;
                let plantId = this.currentPlant.plantId;
                let requestData = Object.assign(this.formData, {
                    id: 0,
                    deviceTypeId: 2,
                    plantId,
                });
                let { code } = await apiAddDevice(requestData);
                if (code === "ok") {
                    this.handleCancle();
                    this.getAllDevices({ plantId });
                    showMessage("success", this.$translate("添加成功"));
                }
            });
            this.getPlantModels(this.currentPlant.plantId);
        },
       async getType(){
            let {data}= await apiGetIndexKeywords(
                {
                    code:"O"
                }
            );
            this.options=data;
            console.log(this.options);
        }
    },
    watch: {
        addDeviceVisible(newVal) {
            this.visible = newVal;
        },
    },
};
</script>

<style lang="scss" scoped>
>>>.el-dialog__header {
    background: rgba(0, 0, 0, 0.03);
    padding: 0 20px;
    height: 45px;
    @include dis-flex(flex-start, center);

    .el-dialog__title {
        font-size: 15px;
        color: #427173;
        font-weight: bolder;
    }
}
</style>
