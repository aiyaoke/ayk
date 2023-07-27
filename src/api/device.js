import HttpRequest from "@/common/request";

const axios = new HttpRequest();

const apiGetDeviceCount = () =>
  axios.request({ url: "/energy/getAllDtu", method: "get" });

const apiGetAllDevices = params =>
  axios.request({ url: "/energy/getDtusOfPlant", method: "get", params });

const apiDeleteDevice = params =>
  axios.request({ url: "/energy/deleteDtu", method: "get", params });

const apiUpdateDevice = data =>
  axios.request({ url: "/energy/updateDtus", method: "post", data });

const apiModifyDevice = data =>
  axios.request({ url: "/energy/updateDtus", method: "post", data });

const apiAddDevice = data =>
  axios.request({ url: "/energy/updateDtus", method: "post", data });

const apiGetPowerCurve = params =>
  axios.request({
    url: "/minsys/fetchPowerHistoryBetweenTime",
    method: "get",
    params
  });

const apiGetPvCurve = params =>
  axios.request({
    url: "/minsys/fetchPvProduceEnergyByTime",
    method: "get",
    params
  });

const apiGetSocCurve = params =>
  axios.request({
    url: "/minsys/fetchBatterySocByTime",
    method: "get",
    params
  });

const apiRunStatusValue = params =>
  axios.request({
    url: "/minsys/fetchOverAllPowerInfo",
    method: "get",
    params
  });

const apiGetBatteryData = params =>
  axios.request({ url: "/minsys/fetchBatteryInfo", method: "get", params });

const apiGetInverterData = params =>
  axios.request({ url: "/minsys/fetchOSIMInfo", method: "get", params });

const apiGetPvData = params =>
  axios.request({ url: "/minsys/fetchPvInfo", method: "get", params });

const apiGetLoadData = params =>
  axios.request({ url: "/minsys/fetchLoadInfo", method: "get", params });

const apiGetGridData = params =>
  axios.request({ url: "/minsys/fetchNetInfo", method: "get", params });

const apiIsNewData = params =>
  axios.request({ url: "/minsys/isNewData", method: "get", params });

// 大机

const apiAllDevices = params =>
  axios.request({ url: "/energy/getAllDtu", method: "get", params });

const apiGetOverviewSideMeter = params =>
  axios.request({
    url: "/meter/fetchEnergySideMeterByName",
    method: "get",
    params
  });

const apiGetOverviewTotalMeter = params =>
  axios.request({
    url: "/meter/fetchOverAllMeterByName",
    method: "get",
    params
  });

const apiGetOverviewBatteryTable = params =>
  axios.request({
    url: "/battery/fetchOverAllBatteryInfo",
    method: "get",
    params
  });

const apiGetOverviewPcsTable = params =>
  axios.request({ url: "/pcs/fetchOverAllPcsInfo", method: "get", params });

const apiFetchGenerateSideMeter = params =>
  axios.request({
    url: "/sermatec-meter/fetchGenerateSideMeter",
    method: "get",
    params
  });

const apiFetchUserSideMeter = params =>
  axios.request({
    url: "/sermatec-meter/fetchUserSideMeter",
    method: "get",
    params
  });

const apiGetOverviewBmsTable = params =>
  axios.request({ url: "/bms/fetchOverAllBmsInfo", method: "get", params });

const apiGetOverviewPcsStatus = params =>
  axios.request({ url: "/pcs/fetchPCSStatus", method: "get", params });

const apiGetOverviewBatteryDaily = params =>
  axios.request({
    url: "/battery/fetchOverAllBatteryStatus",
    method: "get",
    params
  });

const apiGetMeterChartData = params =>
  axios.request({
    url: "/meter/fetchEnergySideMeterHistory",
    method: "get",
    params
  });

const apiChargeDisChargeCurve = params =>
  axios.request({
    url: "/meter/fetchDisChargePowerHistory",
    method: "get",
    params
  });

const apiChargeDisChargeMostValue = params =>
  axios.request({
    url: "/meter/fetchMaxDisChargePowerHistory",
    method: "get",
    params
  });

const apiChargeStatistics = params =>
  axios.request({
    url: "/battery/fetchBatteryChargeHistory",
    method: "get",
    params
  });

const apiDisChargeStatistics = params =>
  axios.request({
    url: "/battery/fetchBatteryDisChargeHistory",
    method: "get",
    params
  });

const apiGetProfitStatistics = params =>
  axios.request({ url: "/energy/fetchProfitStat", method: "get", params });

const apiGetProfitDetail = params =>
  axios.request({ url: "/energy/fetchFeeStat", method: "get", params });

const apiGetElectricityStatistics = params =>
  axios.request({ url: "/energy/fetchElecUsedStat", method: "get", params });

const apiGetEnergyMonitor = params =>
  axios.request({ url: "/pcs/fetchEnergyPcsHistory", method: "get", params });

const apiGetMonitorCurve = params =>
  axios.request({
    url: "/battery/fetchBatteryCVSHistory",
    method: "get",
    params
  });

const apiGetRealCurve = params =>
  axios.request({ url: "/battery/fetchMaxMinValtage", method: "get", params });

const apiBatteryCount = params =>
  axios.request({ url: "/battery/fetchBatteryCount", method: "get", params });

const apiBatteryIconData = params =>
  axios.request({
    url: "/battery/fetchBatteryClusterInfo",
    method: "get",
    params
  });

const apiBatteryClusterChart = params =>
  axios.request({
    url: "/battery/fetchBatteryClusterHistory",
    method: "get",
    params
  });

const apiBatterySocChart = params =>
  axios.request({
    url: "/battery/fetchBatteryCellSocHistory",
    method: "get",
    params
  });

const apiPcsPower = params =>
  axios.request({ url: "/pcs/fetchPcsPowerHistory", method: "get", params });

const apiMaxPressure = params =>
  axios.request({
    url: "/battery/selectMaxMinVolDiffAllDay",
    method: "get",
    params
  });

const apiGetBatteryCount = params =>
  axios.request({ url: "/battery/fetchBatteryCount", method: "get", params });

const apiTmpCurve = params =>
  axios.request({
    url: "/battery/fetchBattClusterMaxTmptDiff",
    method: "get",
    params
  });

const apiVolCurve = params =>
  axios.request({
    url: "/battery/fetchBattClusterMaxVolDiff",
    method: "get",
    params
  });

const apiGetTimePrice = params =>
  axios.request({
    url: "/energy/findAllEffectElecPrice",
    method: "get",
    params
  });

// const apiAddTimePrice = data =>
// axios.request({ url: "/energy/saveElecPrice", method: "post", data });

const apiAddTimePrice = data =>
  axios.request({ url: "/energy/saveElecPrices", method: "post", data });

const apiClearTimePrice = params =>
  axios.request({ url: "/energy/delElecPrice", method: "get", params });

const apiReset = data =>
  axios.request({
    url: "/minsys/setInitCommandWithPass",
    method: "post",
    data
  });

const apiClusterInfo = params =>
  axios.request({
    url: "/sermatec-battery/fetchClusterInfoByGroupId",
    method: "get",
    params
  });

const apiGet60kBatteryStatus = params =>
  axios.request({
    url: "/sermatec-minsys/k60/fetchBatInfo",
    method: "get",
    params
  });

const apiGet60kAcInfo = params =>
  axios.request({
    url: "/sermatec-minsys/k60/fetchACInfo",
    method: "get",
    params
  });

const apiGet60kDcInfo = params =>
  axios.request({
    url: "/sermatec-minsys/k60/fetchDCInfo",
    method: "get",
    params
  });

const apiGet60kPvInfo = params =>
  axios.request({
    url: "/sermatec-minsys/k60/fetchPVInfo",
    method: "get",
    params
  });

const apiGet60kOnceGraph = params =>
  axios.request({
    url: "/sermatec-minsys/k60/fetchPowerInfo",
    method: "get",
    params
  });

const apiGet60kPowerCurve = params =>
  axios.request({
    url: "/sermatec-minsys/k60/fetchPowerHistoryBetweenTime",
    method: "get",
    params
  });

const apiGetConnectGridtHistory = params =>
  axios.request({
    url: "/sermatec-minsys/fetchToGridEnergyByTime",
    method: "get",
    params
  });

const apiGetGridBuytHistory = params =>
  axios.request({
    url: "/sermatec-minsys/fetchGridBuyEnergyByTime",
    method: "get",
    params
  });

const apiGetGridBuyConnectPvtHistory = params =>
  axios.request({
    url: "/sermatec-minsys/fetchPvGridEnergyByTime",
    method: "get",
    params
  });

const apiGetVideo = params =>
  axios.request({
    url: "/sermatec-energy/video/getHLS",
    method: "get",
    params
  });

const apiGetOverViewTablesData = params =>
  axios.request({
    url: "/sermatec-bms/real/fetchOverAllInfo",
    method: "get",
    params
  });

const apiGetOverViewGraph = params =>
  axios.request({
    url: "/sermatec-bms/real/fetchStatusInfo",
    method: "get",
    params
  });

const apiGetBatteryCVS = params =>
  axios.request({
    url: "/sermatec-bms/bat/fetchBatteryCVS",
    method: "get",
    params
  });

// 辅源侧电表电量柱状图
const apiGetHelpMaterELecCure = params =>
  axios.request({
    url: "/sermatec-bms/meter/getDayUsedElec",
    method: "get",
    params
  });

const apiGetBatteryCure = params =>
  axios.request({
    url: "/sermatec-bms/bat/fetchAllBatteryCVS",
    method: "get",
    params
  });

//最大最小压差 按电池组查询 
const apiGetMaxMinVolCure = params =>
  axios.request({
    url: "/sermatec-battery/getMaxMinVolDiffByGroupId",
    method: "get",
    params
  });

// 获取设备权限 http://192.168.6.9:8989/bigsys/getAllWithModuleByType?type=8
const apiDevicePermissions = params =>
  axios.request({ url: '/user/bigsys/getAllWithModuleByType', method: "get", params });

  // 215户外柜获取户外柜实时数据接口
  const apiOutdoorCabinet = params =>
  axios.request({
    url: "/minsys/outdoorCabinet/liveSummary",
    method: "get",
    params
  });
  // 获取壁挂实时数据接口

  const apiWallMounted = params =>
  axios.request({
    url: "/minsys/hvwh/liveSummary",
    method: "get",
    params
  });

   // 232户外柜获取户外柜实时数据接口
   const api232OutdoorCabinet = params =>
   axios.request({
     url: "/minsys/232/liveSummary",
     method: "get",
     params
   });
export {
  api232OutdoorCabinet,
  apiWallMounted,
  apiOutdoorCabinet,
  apiGetDeviceCount,
  apiGetAllDevices,
  apiDeleteDevice,
  apiUpdateDevice,
  apiModifyDevice,
  apiAddDevice,
  apiGetPowerCurve,
  apiGetPvCurve,
  apiGetSocCurve,
  apiRunStatusValue,
  apiGetBatteryData,
  apiGetInverterData,
  apiGetPvData,
  apiGetLoadData,
  apiGetGridData,
  apiGetOverviewSideMeter,
  apiGetOverviewTotalMeter,
  apiGetOverviewBatteryTable,
  apiGetOverviewPcsTable,
  apiFetchUserSideMeter,
  apiFetchGenerateSideMeter,
  apiGetOverviewBmsTable,
  apiGetOverviewPcsStatus,
  apiGetOverviewBatteryDaily,
  apiGetMeterChartData,
  apiChargeDisChargeCurve,
  apiChargeDisChargeMostValue,
  apiChargeStatistics,
  apiDisChargeStatistics,
  apiGetProfitStatistics,
  apiGetProfitDetail,
  apiGetElectricityStatistics,
  apiGetEnergyMonitor,
  apiGetMonitorCurve,
  apiGetRealCurve,
  apiBatteryCount,
  apiBatteryIconData,
  apiBatteryClusterChart,
  apiBatterySocChart,
  apiPcsPower,
  apiMaxPressure,
  apiTmpCurve,
  apiVolCurve,
  apiGetBatteryCount,
  apiAllDevices,
  apiGetTimePrice,
  apiAddTimePrice,
  apiClearTimePrice,
  apiReset,
  apiIsNewData,
  apiClusterInfo,
  apiGet60kBatteryStatus,
  apiGet60kAcInfo,
  apiGet60kDcInfo,
  apiGet60kPvInfo,
  apiGet60kOnceGraph,
  apiGet60kPowerCurve,
  apiGetConnectGridtHistory,
  apiGetGridBuytHistory,
  apiGetGridBuyConnectPvtHistory,
  apiGetVideo,
  apiGetOverViewTablesData,
  apiGetOverViewGraph,
  apiGetBatteryCVS,
  apiGetHelpMaterELecCure,
  apiGetBatteryCure,
  apiGetMaxMinVolCure,
  apiDevicePermissions

};
