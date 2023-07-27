<template>
    <el-dialog :title="$translate('数据显示配置')" :visible.sync="visible" @close="close" width="800px">
        <div class="wrap">
            <el-transfer v-model="value" :data="data" :titles="['未展示数据', '展示数据']" :render-content="renderFunc"
                @change="handleChange"></el-transfer>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="visible = false">{{ $translate("取消") }}</el-button>
            <el-button type="primary" size="mini" @click="updateModels">{{ $translate("确定") }}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { apiUpdatePlantModel } from "@/api/plant";
import { showMessage, } from "@/common/utils";

const { mapGetters: plant_getters } = createNamespacedHelpers("plant");
const { mapActions: plant_actions } = createNamespacedHelpers("plant");

export default {
    name: "DispositPlant",
    data() {

        return {
            visible: false,
            value: [],
            data: [],
            renderFunc(h, option) {
                return <span>{option.label}</span>;
            }
        };
    },
    props: {
        dispositPlantVisible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...plant_getters(["currentPlant", "plantModels"]),
    },

    methods: {
        ...plant_actions(["getPlantModels"]),
        close() {
            this.$emit("update:dispositPlantVisible", false);
        },
        getData() {
            for (let index = 0; index < this.plantModels.length; index++) {
                if (this.plantModels[index].enabled) {
                    this.value.push(this.plantModels[index].id)
                }               
                this.data.push({
                    key: this.plantModels[index].id,
                    label: this.plantModels[index].desc,
                    disabled: false
                });
            }
        },
        handleChange(value, direction, movedKeys) {
        },
        async updateModels() {
            if ( this.value.length>6) {
                return showMessage('warning',this.$translate('仅可展示6个模块'));
            }
            let { data } = await apiUpdatePlantModel({
                plantId: this.currentPlant.plantId,
                list: this.value
            })
            if (data === 1) {
                this.getPlantModels(this.currentPlant.plantId);
                this.visible = false;
            } else {
                showMessage('warning', data)
            }
        }
    },
    mounted() {
        this.getData();
    },
    watch: {
        dispositPlantVisible(newVal) {
            this.visible = newVal;
        },
      
        plantModels: {
            handler(newVal, oldVal) {
                this.data=[];
                this.value=[];
                this.getData();
            },
            immediate: true,
            deep: true
        }
    },
};
</script>

<style lang="scss" scoped>
>>>.el-dialog__body {
    padding: 0 !important;
}

>>>.el-transfer {
    display: flex;
    justify-content: center;
}
</style>
