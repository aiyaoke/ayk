<template>
    <el-dialog
        :title="$translate('修改密码')"
        :visible.sync="visible"
        width="500px"
        :before-close="handleCancle"
    >
        <el-form
            :model="formData"
            size="medium"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
        >
            <el-form-item :label="$translate('旧密码')" prop="oldPwd">
                <el-input
                    type="password"
                    v-model="formData.oldPwd"
                    autocomplete="off"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item :label="$translate('新密码')" prop="newPwd">
                <el-input
                    type="password"
                    v-model="formData.newPwd"
                    autocomplete="off"
                    show-password
                ></el-input>
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
import { apiGetPublicKey, apiModifyPwd } from "@/api/user";
import { setEncrypt, showMessage,checkValueIsAvailable } from "@/common/utils";

export default {
    name: "ModifyPwd",
    data() {
        return {
            visible: false,
            formData: {
                oldPwd: "",
                newPwd: "",
            },
            rules: {
                oldPwd: [
                    {
                        required: true,
                        message: this.$translate("请输入旧密码"),
                        trigger: "blur",
                    },
                ],
                newPwd: [
                    {
                        required: true,
                        trigger: "blur",
                        pattern: /^(?=.*[0-9\!@#\$%\^&\*])(?=.*[a-zA-Z]).{8,16}$/,
                        validator: (rule, value) => {
                            if (value === "") {
                                return Promise.reject(this.$translate("请输入密码"));
                            } else if (checkValueIsAvailable(value, "spaceStart")) {
                                return Promise.reject(this.$translate("不能以空格开头"));
                            } else if (value.length > 16 || value.length < 8) {
                                return Promise.reject(this.$translate("密码长度8~16位"));
                            } else {
                                return Promise.resolve();
                            }
                        },
                    },
                ],
            },
        };
    },
    props: {
        modifyPwdVisible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleCancle() {
            this.$emit("update:modifyPwdVisible", false);
            this.$refs.ruleForm.resetFields();
        },
        handleSure() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let { data: key } = await apiGetPublicKey();
                    if (!key) return;
                    let { oldPwd, newPwd } = this.formData;
                    let requestData = {
                        oldPswd: setEncrypt(key, oldPwd),
                        newPswd: setEncrypt(key, newPwd),
                    };
                    let { code } = await apiModifyPwd(requestData);
                    if (code === "ok") {
                        this.handleCancle();
                        showMessage("success", this.$translate("修改成功"));
                    }
                }
            });
        },
    },
    watch: {
        modifyPwdVisible(newVal) {
            this.visible = newVal;
        },
    },
};
</script>
