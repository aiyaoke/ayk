<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-badge :is-dot="Boolean(workOrderMsg)"
          ><span> {{ userInfo.name }}</span>
        </el-badge>
        <img
          src="../../../../../assets/images/head-icon.png"
          class="head-icon"
        />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changeTheme"
          >{{ $translate("切换主题") }}
        </el-dropdown-item>
        <el-dropdown-item command="modifyPwd">{{
          $translate("修改密码")
        }}</el-dropdown-item>
        <el-dropdown-item command="workOrder">
          <el-badge :value="workOrderMsg" :max="99"
            ><span> {{ $translate("工单") }} </span>
          </el-badge>
        </el-dropdown-item>
        <el-dropdown-item command="loginOut">{{
          $translate("退出登录")
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <ChangeTheme />
    <ModifyPwd :modifyPwdVisible.sync="modifyPwdVisible" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import menuStyle from "@/assets/styles/meun-dark.scss";
const { mapGetters: user_getters } = createNamespacedHelpers("user");
const { mapMutations: app_mutations } = createNamespacedHelpers("app");
import { redirectPath, getToken } from "@/common/utils";
import { SubSocket } from "@/lib/socket/socketTools";
import { socketSubUrlTopic } from "@/common/config";
import { apiUnReadMsgCount } from "@/api/user";
export default {
  name: "UserDropMeun",
  data() {
    return {
      modifyPwdVisible: false,
      workOrderMsg: 0
    };
  },
  mounted() {
    this.getUnReadMsgCount();
    this.subscribe();
  },
  components: {
    ChangeTheme: _ => import("@/components/ChangeTheme"),
    ModifyPwd: _ => import("./ModifyPwd")
  },
  computed: {
    ...user_getters(["userInfo"]),
    menuStyle() {
      return menuStyle;
    }
  },
  methods: {
    ...app_mutations(["set_plantListVisible", "set_themeVisible"]),
    async getUnReadMsgCount() {
      let { data } = await apiUnReadMsgCount();
      data && (this.workOrderMsg = data.count);
    },
    subscribe() {
      let { subUrl, topic } = socketSubUrlTopic.workOrder;
      SubSocket(subUrl, topic, getToken(), "", ({ code }) => {
        code === "ok" && this.getUnReadMsgCount();
      });
    },
    changeTheme() {
      this.set_themeVisible(true);
    },
    handleModifyPwd() {
      this.modifyPwdVisible = true;
    },
    handleWorkOrder() {
      let { token, userId, type, roleId } = this.userInfo;
      let locale = this.locale;
      window.open(
        `/workOrder?token=${token}&userId=${userId}&type=${type}&roleId=${roleId}&locale=${locale}`
      );
    },
    handleLoginOut() {
      redirectPath("/");
    },
    handleCommand(command) {
      let _commandFn = {
        changeTheme: this.changeTheme,
        modifyPwd: this.handleModifyPwd,
        workOrder: this.handleWorkOrder,
        loginOut: this.handleLoginOut,
        plantList: this.set_plantListVisible
      };
      _commandFn[command](command == "plantList" ? true : "");
    }
  }
};
</script>

<style lang="scss" scoped>
.head-icon {
  width: 22px;
  height: 22px;
  position: relative;
  top: 6px;
  left: 5px;
}
>>> .el-badge__content {
  top: 11px;
  right: -6px;
  &.is-dot {
    top: -2px;
    right: 4px;
  }
}
</style>
