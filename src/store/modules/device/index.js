import { apiGetAllDevices, apiGetDeviceCount, apiDevicePermissions } from "@/api/device";
import { showMessage, setToken, redirectPath } from "@/common/utils";

const state = {
  devicesCount: 0,
  allDevices: [],
  currentDevice: {},
  devicePermissions: {}
};

const mutations = {
  setAllDevices(state, value) {
    state.allDevices = value;
  },
  setCurrentDevice(state, value) {
    sessionStorage.setItem("currentDevice", JSON.stringify(value));
    state.currentDevice = value;
  },
  setDevicesCount(state, value) {
    state.devicesCount = value;
  },
  setDevicePermissions(state, value) {
    state.devicePermissions = value;
  }
};

const getters = {
  allDevices: state => state.allDevices,
  currentDevice: state => state.currentDevice,
  devicesCount: state => state.devicesCount,
  devicePermissions: state => state.devicePermissions,
};

const actions = {
  async getAllDevices({ commit }, requestData) {
    let { data } = await apiGetAllDevices(requestData);
    data = JSON.parse(data || "[]");
    commit("setAllDevices", data);
  },
  async getDevicesCount({ commit }) {
    let { data } = await apiGetDeviceCount();
    data = JSON.parse(data || "[]");
    commit("setDevicesCount", data.length);
  },
  async getDevicePermissions({ commit }, requestData) {
    let { data } = await apiDevicePermissions(requestData)
    if (data) {
      let { modules } = JSON.parse(data)
      let permissions = {}
      modules.forEach(item => {
        permissions[item.code] = item.show
        permissions[item.code + '-' + item.name] = item.show
        if (item.subModules) {
          item.subModules.forEach(uu => {
            permissions[uu.code + '-' + uu.name] = uu.show
          })
        }
      });
      commit("setDevicePermissions", permissions);
    } else {
      commit("setDevicePermissions", {});
    }
  }
};

export default {
  namespaced: true, // 命名空间
  state,
  getters,
  mutations,
  actions
};
