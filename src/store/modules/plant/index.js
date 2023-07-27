import { apiGetAllPlants,getPlantModels } from "@/api/plant";
import { showMessage, setToken, redirectPath } from "@/common/utils";

const state = {
  allPlants: [],
  currentPlant: {},
  plantModels:[{}]
};

const mutations = {
  setAllPlants(state, value) {
    state.allPlants = value;
  },
  setCurrentPlant(state, value) {
    value = JSON.parse(JSON.stringify(value))
    let { timeZone } = value
    if (timeZone) {
      value.timeZone = timeZone.split("UTC")[1]
    }
    state.currentPlant = value;
  },
  setPlantModels(state, value){
    state.plantModels = value;
  }
};

const getters = {
  allPlants: state => state.allPlants,
  currentPlant: state => state.currentPlant,
  plantModels:state => state.plantModels,
};

const actions = {
  async getAllPlants({ commit }) {
    let { data } = await apiGetAllPlants()
    data = JSON.parse(data || '[]')
    commit('setAllPlants', data);
    let currdata=data.find(v => v.plantId == localStorage.getItem("currentPlant"));
    if (data.length) {
      if (localStorage.getItem("currentPlant")&&currdata) {
        commit('setCurrentPlant',  currdata )
      }else{
        commit('setCurrentPlant',  data[0] )
      }
    }else{
    commit('setCurrentPlant',  {})
    }
   
  },
  async getPlantModels({ commit },plantId) {
    let { data } = await getPlantModels({plantId})
    commit('setPlantModels',data);
  },
};

export default {
  namespaced: true, // 命名空间
  state,
  getters,
  mutations,
  actions
};
