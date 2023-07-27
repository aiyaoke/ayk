<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <i class="el-icon-more more-icon"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="detail">{{
        $translate("电站详情")
      }}</el-dropdown-item>
       <el-dropdown-item command="disposition">{{
        $translate("数据显示配置")
      }}</el-dropdown-item>
      <el-dropdown-item command="create" v-if="showMenuItem()">{{
        $translate("添加电站")
      }}</el-dropdown-item>
      <el-dropdown-item command="modify" v-if="showMenuItem()">
        {{ $translate("编辑电站") }}</el-dropdown-item
      >
      <el-dropdown-item command="delete" v-if="showMenuItem('delete')">
        {{ $translate("删除电站") }}</el-dropdown-item
      >
    </el-dropdown-menu>
    <PlantDetail :pLantDetailVisible.sync="pLantDetailVisible" />
    <CreatePLant :createPLantVisible.sync="createPLantVisible" />
    <DispositPlant :dispositPlantVisible.sync="dispositPlantVisible"/>
  </el-dropdown>
</template>

<script>
import { apiDeletePlant } from "@/api/plant";
import { deteleConfirm } from "@/common/utils";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
const {
  mapGetters: plant_getters,
  mapActions: plant_actions
} = createNamespacedHelpers("plant");
export default {
  name: "MoreDropMenu",
  data() {
    return {
      createPLantVisible: "",
      pLantDetailVisible: false,
      dispositPlantVisible:false
    };
  },
  computed: {
    ...user_getters(["userInfo"]),
    ...plant_getters(["currentPlant"]),
    showMenuItem() {
      return menuType => {
        let isCommonUser = this.userInfo.type === 2;
        if (menuType) {
          return isCommonUser && this.currentPlant.cstUserCreate;
        } else {
          return isCommonUser;
        }
      };
    }
  },
  components: {
    PlantDetail: _ => import("./components/PlantDetail"),
    CreatePLant: _ => import("./components/CreatePLant"),
    DispositPlant: _ => import("./components/DispositPlant"),
  },
  methods: {
    ...plant_actions(["getAllPlants"]),
    createPlant() {
      this.createPLantVisible = "create";
    },
    modifyPlant() {
      this.createPLantVisible = "edit";
    },
    detail() {
      this.pLantDetailVisible = true;
    },
    delete() {
      let requestData = { plantId: this.currentPlant.plantId };
      deteleConfirm(
        apiDeletePlant,
        requestData,
        res => res === "ok" && this.getAllPlants()
      );
    },
    disposition(){
      this.dispositPlantVisible = true;
    },
    handleCommand(command) {
      let _commandFn = {
        detail: this.detail,
        create: this.createPlant,
        modify: this.modifyPlant,
        delete: this.delete,
        disposition:this.disposition,
      };
      _commandFn[command]();
    }
  }
};
</script>

<style scoped>
.el-dropdown {
  position: relative;
  top: 6px;
}
</style>
