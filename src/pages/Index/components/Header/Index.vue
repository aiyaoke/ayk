<template>
  <div class="header">
    <div class="brand">
      <img :src="userInfo.headImg" alt="" />
      <el-dropdown
        placement="top"
        @command="handleChangePlant"
        v-if="allPlants.length"
      >
        <span class="el-dropdown-link">
          {{ currentPlant.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :class="item.plantId == currentPlant.plantId ? 'active' : ''"
            v-for="item in allPlants"
            :key="item.plantId"
            :command="item.plantId"
          >
            {{ item.name }}
            <i class="iconfont icon-duoren" v-if="!item.cstUserCreate"></i>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span v-if="!allPlants.length">{{ $translate("请先添加电站") }}</span>
    </div>
    <div class="dropmenu-list">
      <MoreDropMenu />
      <Tips />
      <UserDropMeun />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
const {
  mapGetters: plant_getters,
  mapMutations: plant_mutations,
  mapActions: plant_actions
} = createNamespacedHelpers("plant");

export default {
  name: "Header",

  computed: {
    ...user_getters(["userInfo"]),
    ...plant_getters(["allPlants", "currentPlant"])
  },
  components: {
    Brand: _ => import("@/components/Brand"),
    Tips: _ => import("./components/Tips"),
    UserDropMeun: _ => import("./components/UserDropMeun"),
    MoreDropMenu: _ => import("./components/MoreDropMenu/Index.vue")
  },
  mounted () {
    // this.setCurrentPlant(sessionStorage.getItem(this.currentPlant));
  },
  methods: {
    ...plant_mutations(["setCurrentPlant"]),
    ...plant_actions(["getPlantModels"]),

    handleChangePlant(plantId) {
      let choosePlant = this.allPlants.find(v => v.plantId === plantId);
      this.setCurrentPlant(choosePlant);
      this.getPlantModels(this.currentPlant.plantId);
      localStorage.setItem("currentPlant",this.currentPlant.plantId)
    },
    handleCreatePlant() {
      this.createPLantVisible = "create";
    }
  }
};
</script>

<style scoped lang="scss">
.active {
  background-color: #ecf5ff;
  color: $primary-color;
}

.el-dropdown-menu {
  max-height: 500px;
  overflow-y: scroll;
}

.header {
  width: 100%;
  height: 60px;
  @include font-color("1");
  padding: 0 40px 0 20px;
  @include bg-color("2");
  box-sizing: border-box;
  @include dis-flex(space-between, center);
  .brand {
    @include dis-flex(center, center);
    img {
      width: 120px;
      height: 14px;
      margin-right: 20px;
    }
  }

  .dropmenu-list {
    @include dis-flex(center, center);
  }
}
</style>
