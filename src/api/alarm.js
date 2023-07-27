import HttpRequest from "@/common/request";

const axios = new HttpRequest();

// const apiGetAppNowAlarmsWithPage = params =>
//   axios.request({ url: "/sermatec-energy/getAppNowAlarmsWithPage", method: "get", params });

const apiGetAppNowAlarmsWithPage = params =>
  axios.request({ url: "/sermatec-energy/getNowAlarmsByDtuIdWithPage", method: "get", params });

const apiGetActiveAlarm = params =>
  axios.request({ url: "/sermatec-energy/getNowAlarmsByDtuIdWithPage", method: "get", params });

const apiGetHistoryAlarm = params =>
  axios.request({ url: "/sermatec-energy/getHistoryAlarmsByDtuIdWithPage", method: "get", params });

const apiGetAlarmConfig = _ =>
  axios.request({ url: "/sermatec-energy/alarmType/getAlarmTypeInfos", method: "get", });

const apiUpdateAlarmConfig = data =>
  axios.request({ url: "/sermatec-energy/alarmType/updateAlarmTypeInfos", method: "post", data });

export {
  apiGetActiveAlarm,
  apiGetHistoryAlarm,
  apiGetAlarmConfig,
  apiUpdateAlarmConfig,
  apiGetAppNowAlarmsWithPage
};
