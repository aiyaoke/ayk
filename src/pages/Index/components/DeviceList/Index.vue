<template>
    <div class="deviceList">
        <div class="card-title">
            <span>{{ $translate("设备列表") }}</span>
            <el-tooltip
                v-show="userInfo.type === 2 && currentPlant.cstUserCreate"
                effect="dark"
                :content="$translate('添加设备')"
                placement="bottom"
            >
                <el-button
                    @click="handleAddDevice"
                    icon="el-icon-plus"
                    circle
                    size="mini"
                    class="create-icon"
                ></el-button>
            </el-tooltip>
        </div>
        <div class="card-content">
            <el-table
                size="small"
                :data="tableData"
                v-loading="loading"
                element-loading-text="...loading"
                element-loading-spinner="el-icon-loading"
            >
                <el-table-column
                    v-for="item in columns"
                    :key="item.key"
                    :prop="item.key"
                    :label="$translate(item.label)"
                    align="center"
                    :render-header="renderHeader"
                >
                    <template slot-scope="scope">
                        <span
                            v-if="item.key === 'online'"
                            :class="
                                'onLineColumn ' +
                                [
                                    scope.row.online == '在线'
                                        ? 'onLine'
                                        : 'offLine',
                                ]
                            "
                            >{{ $translate(scope.row.online) }}</span
                        >
                        <div v-else-if="item.key === 'nowAlarmCount'">
                            <template v-if="scope.row.nowAlarmCount">
                                <svg
                                    class="
                                        activeWarn-colorIcon
                                        animate__animated
                                        animate__flash
                                        animate__infinite
                                    "
                                >
                                    <use xlink:href="#icon-icon-test" />
                                </svg>
                                <span class="active-warn"
                                    >+{{ scope.row.nowAlarmCount }}</span
                                >
                            </template>
                            <span v-else>-</span>
                        </div>
                        <div v-else-if="item.key === 'sn'">
                            <!-- <el-input
                                v-if="editItem.id === scope.row.id"
                                v-model="scope.row.sn"
                                size="mini"
                            ></el-input>
                            <span v-else>{{ scope.row.sn }}</span> -->
                            <span>{{ scope.row.sn }}</span>
                        </div>
                        <div v-else-if="item.key === 'address'">
                            <el-input
                                v-if="editItem.id === scope.row.id"
                                v-model="scope.row.address"
                                size="mini"
                            ></el-input>
                            <span v-else>{{ scope.row.address }}</span>
                        </div>
                        <span v-else>{{ scope.row[item.key] }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    align="center"
                    :label="$translate('操作')"
                    width="90"
                    v-if="userInfo.type === 2 || currentPlant.cstUserCreate"
                >
                    <template slot-scope="scope">
                        <div
                            v-if="editItem.id !== scope.row.id"
                            class="operate-buttons"
                        >
                            <el-button
                                icon="el-icon-edit"
                                circle
                                type="info"
                                size="mini"
                                :disabled="
                                    editItem.id && editItem.id !== scope.row.id
                                "
                                @click="handleEdit(scope.row,scope.$index)"
                            ></el-button>
                            <el-button
                                slot="reference"
                                icon="el-icon-delete"
                                circle
                                type="danger"
                                size="mini"
                                :disabled="
                                    editItem.id && editItem.id !== scope.row.id
                                "
                                @click="handleDelete(scope.row)"
                            ></el-button>
                        </div>
                        <div v-else class="operate-buttons">
                            <el-button
                                size="mini"
                                @click="handleCancleEdit(scope.$index,scope.row)"
                                circle
                                icon="el-icon-close"
                            ></el-button>
                            <el-button
                                size="mini"
                                @click="handleConfirmEdit(scope.row,scope.$index)"
                                type="success"
                                circle
                                icon="el-icon-check"
                            ></el-button>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    align="center"
                    :label="$translate('详情')"
                    width="60"
                >
                    <template slot-scope="scope">
                        <el-button
                            icon="el-icon-more"
                            circle
                            type="primary"
                            size="mini"
                            @click="handleShowDetail(scope.row)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <AddDevice :addDeviceVisible.sync="addDeviceVisible" />
    </div>
</template>

<script>
import { apiDeleteDevice, apiModifyDevice } from "@/api/device";
import {
    showMessage,
    deepClone,
    deteleConfirm,
    redirectPath,
    getToken,
} from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
import { SubSocket } from "@/lib/socket/socketTools";
import { socketSubUrlTopic } from "@/common/config";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
const { mapGetters: plant_getters } = createNamespacedHelpers("plant");
const {
    mapGetters: device_getters,
    mapMutations: device_mutations,
    mapActions: device_actions,
} = createNamespacedHelpers("device");

export default {
    name: "Index",
    data() {
        return {
            loading: false,
            addDeviceVisible: false,
            columns: [
                { key: "sn", label: "sn" },
                { key: "version", label: "型号" },
                { key: "online", label: "状态" },
                { key: "nowAlarmCount", label: "告警" },
                { key: "batteryBrand", label: "电池类型" },
                { key: "hardwareVersion", label: "DSP" },
                { key: "softwareVersion", label: "PCU" },
                { key: "address", label: "安装位置" },
            ],
            tableData: [],
            editItem: {},
            oldEditItem:{}
        };
    },
    components: {
        AddDevice: (_) => import("./components/AddDevice"),
    },
    mounted() {
        this.subscribe();
    },
    computed: {
        ...user_getters(["userInfo"]),
        ...plant_getters(["currentPlant"]),
        ...device_getters(["allDevices", "currentDevice"]),
        deepClone() {
            return (value) => myDeepClone(value);
        },
    },
    methods: {
        ...device_mutations(["setCurrentDevice"]),
        ...device_actions(["getAllDevices"]),
        renderHeader(createElement, { column, _self }) {
            const label = column.label;
            const labelArr = label.split(" ");
            return createElement(
                "span", //创建最外层的标签可随意
                [
                    createElement(
                        "span",
                        {
                            // 创建第一个元素的标签可随意
                            attrs: { type: "text" },
                        },
                        [labelArr[0]]
                    ),
                    createElement(
                        "p",
                        {
                            // 创建第二个元素的标签可随意
                            attrs: { type: "text", style: "font-size:12px" }, // 给分割的某个元素单独加样式
                        },
                        [labelArr[1] || ""]
                    ),
                ]
            );
        },
        async handleDelete({ id }) {
            let requestData = { dtuId: id };
            deteleConfirm(
                apiDeleteDevice,
                requestData,
                (res) =>
                    res === "ok" &&
                    this.getAllDevices({ plantId: this.currentPlant.plantId })
            );
        },
        handleEdit(item) {
            this.editItem = deepClone(item);
        },
        handleCancleEdit(index,it) {
            this.tableData[index] =  this.editItem;
            this.editItem = {};
            this.getAllDevices({ plantId: this.currentPlant.plantId });
        },
        async handleConfirmEdit({ id, plantId }) {
            let { sn, address,type } = this.tableData.find((item) => item.id === id);
            let requestData = {
                id,
                // deviceTypeId: 2,
                type,
                plantId,
                sn,
                address,
            };
            let { code } = await apiModifyDevice(requestData);
            if (code === "ok") {
                showMessage("success", this.$translate("编辑成功"));
                this.editItem = {};
                this.getAllDevices({ plantId: this.currentPlant.plantId });
            }
        },
       
        handleAddDevice() {
            this.addDeviceVisible = true;
        },
        handleShowDetail(row) {
            this.setCurrentDevice(row);
            redirectPath("/system/status");
        },
        subscribe() {
            let { subUrl, topic } = socketSubUrlTopic.onLineStatus;
            SubSocket(subUrl, topic, getToken(), "", ({ code }) => {
                console.log(code);
                code === "ok" &&
                    this.getAllDevices({ plantId: this.currentPlant.plantId });
            });
        },
    },
    watch: {
        async currentPlant({ plantId }) {
            if (plantId) {
                this.editItem = {};
                this.loading = true;
                await this.getAllDevices({ plantId });
                this.loading = false;
            }
        },
        allDevices(newVal) {
            this.editItem = {};
            this.tableData = deepClone(newVal);
        },
        editItem:{
            handler(newD,oldD){
                // console.log(newD);
            },
            deep:true
        }
    },
};
</script>

<style scoped lang="scss">
.card-title {
    @include dis-flex(space-between, center);
    .el-button--mini.is-circle {
        padding: 5px;
    }
}
.card-content {
    padding: 10px;
    box-sizing: border-box;
    .onLineColumn {
        font-weight: bolder;
    }
    .activeWarn-colorIcon {
        width: 20px;
        height: 20px;
        vertical-align: text-bottom;
    }
    .operate-buttons {
        @include dis-flex(space-between, center);
    }
}
</style>
