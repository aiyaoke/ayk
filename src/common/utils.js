import { Message, Loading } from "element-ui";
import { JSEncrypt } from "jsencrypt";
import cookie from "cookie_js";
import Vue from "@/main";
import moment from "moment";
import store from "@/store/index";
import { accountSatus, plantTypes, plantStatus, colorList } from "./config";

const userToken = "user_token";
const defaultLoadingOptions = {
  text: "loading",
  spinner: "el-icon-loading",
  background: "rgba(0, 0, 0, 0.7)"
};

export const setEncrypt = (key, str) => {
  const jsencrypt = new JSEncrypt();
  jsencrypt.setPublicKey(key);
  return jsencrypt.encrypt(str);
};

export const getToken = _ => cookie.get(userToken);

export const setToken = token => cookie.set(userToken, token, { path: "/" });

export const removeToken = _ => cookie.remove(userToken, { path: "/" });

// success warning  info  error
export const showMessage = (type, message) =>
  Message({ message, type, showClose: true });

export const showLoading = options =>
  Loading.service(Object.assign(defaultLoadingOptions, options));

export const closeLoading = loadingInstance =>
  Vue.$nextTick(_ => loadingInstance.close());

export const redirectPath = path => Vue.$router.push({ path });

export const deepClone = value => JSON.parse(JSON.stringify(value));

export const clearStore = () => {
  store.commit("plant/setAllPlants", []);
  store.commit("plant/setCurrentPlant", {});
  store.commit("device/setAllDevices", []);
  store.commit("device/setCurrentDevice", {});
};

//将两组日期合并为一组 ( 今日和对比日期 )
export const makeSameDate = (arr1, arr2) => {
  arr2.forEach((item, i) => (arr1[i]["time"] = item["time"]));
  return arr1;
};

export const getOtherDate = (date, step = 1, format = "YYYY-MM-DD") =>
  moment(date)
    .subtract(step, "days")
    .format(format);

// 'YYYY-MM-DD HH:mm:ss'
export const momentFormate = (timeStamp, format) => {
  let { timeZone } = Vue.$store.getters["plant/currentPlant"];
  return timeZone
    ? moment(timeStamp)
        .utcOffset(timeZone * 60)
        .format(format)
    : moment(timeStamp).format(format);
};

export const nowTime = (count, format) => {
  let { timeZone } = Vue.$store.getters["plant/currentPlant"];
  return moment()
    .utcOffset(timeZone * 60)
    .add(count, "days")
    .format(format);
};

export const getHoursBetweenTime = (sTime, eTime) => {
  return eTime.diff(sTime, "seconds") / 60 / 60;
};

export const getRandomColor = index => colorList[index % colorList.length];

export const getFileType = src => src.split(".").pop();

export const deteleConfirm = (fn, requestData, callBack) => {
  Vue.$confirm(Vue.$translate("确定删除？"), Vue.$translate("提示"), {
    confirmButtonText: Vue.$translate("确定"),
    cancelButtonText: Vue.$translate("取消"),
    type: "warning"
  }).then(async _ => {
    let { code } = await fn(requestData);
    if (code === "ok") {
      showMessage("success", Vue.$translate("删除成功"));
      callBack("ok");
    }
  });
};
export const checkValueIsAvailable = (value, type) => {
  const types = {
      phone: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
      chinese: /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g,
      spaceWith: /\s/g, // 包含空格
      spaceStart: /^\s+/g, // 以空格开头
      spaceEnd: /\s+$/g, // 以空格结尾
      spaceAll: /^[ ]*$/, // 全是空格
      spaceStartEnd: /^\S.*\S$|(^\S{0,1}\S$)/, // 以空格开头或结尾
      posPattern: /^\d+$/, // 正整数 包含0
      negPattern: /^-\d+$/, // 负整数 不包含0
      intPattern: /^-\d+$/, // 整数
  };
  return types[type].test(value);
};
export const checkIsNull = message => ({
  required: true,
  message,
  trigger: "blur",
  type: "string",
  transform(value) {
      if (value) {
          return String(value);
      }
  },
});
export const checkFormat=(type, label)=> {
  switch (type) {
      case "number":
          return {
              validator: (rule, value)=> {
                  if (value && !/^\d+$/.test(value)) {
                      return Promise.reject(`${label}`);
                  }
                  return Promise.resolve();
              },
          };
      case "longitude":
          return {
              validator: (rule, value)=> {
                  if (
                      value &&
                      !/^[\-\+]?(0?\d{1,2}(\.\d{1,6})*|1[0-7]?\d{1}(\.\d{1,6})*|180(\.0{1,5})*)$/.test(
                          value
                      )
                  ) {
                      return Promise.reject(`${label}`);
                  }
                  return Promise.resolve();
              },
          };
      case "latitude":
          return {
              validator: (rule, value) => {
                  if (value && !/^[\-\+]?([0-8]?\d{1}(\.\d{1,6})*|90(\.0{1,6})*)$/.test(value)) {
                      return Promise.reject(`${label}`);
                  }
                  return Promise.resolve();
              },
          };
      case "Space":
          return {
              validator: (rule ,value) => {
                  if (value && !/^\S.*\S$|(^\S{0,1}\S$)/.test(value)) {
                      return Promise.reject(`${label}`);
                  }
                  return Promise.resolve();
              },
          };
  }
}
//拼接echarts时间轴数据格式
export const getEchatsData = array => {
  if (!Array.isArray(array)) return [];
  array.forEach(
    item =>
      (item.value = [
        momentFormate(item.time, "YYYY-MM-DD HH:mm:ss"),
        item.value && parseFloat(item.value)
      ])
  );
  return array;
};

export const getAccountSatus = id =>
  accountSatus.find(item => item.value === id).label;
export const getPlantTypes = id =>
  plantTypes.find(item => item.value === id).label;
export const getPlantStatus = id =>
  plantStatus.find(item => item.value === id).label;

export const getLabelById = (id, arry) =>
  arry.find(item => item.value === id).label;

// export const setVal = (arr, obj) = arr.forEach(item => {
//   item.value = obj[item.key];
// });

export const deepCopy = function(data = {}) {
  //string,number,bool,null,undefined,symbol
  //object,array,date
  if (data && typeof data === "object") {
    //针对函数的拷贝
    if (typeof data === "function") {
      let tempFunc = data.bind(null);
      tempFunc.prototype = deepCopy(data.prototype);
      return tempFunc;
    }

    switch (Object.prototype.toString.call(data)) {
      case "[object String]":
        return data.toString();
      case "[object Number]":
        return Number(data.toString());
      case "[object Boolean]":
        return new Boolean(data.toString());
      case "[object Date]":
        return new Date(data.getTime());
      case "[object Array]":
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          arr[i] = deepCopy(data[i]);
        }
        return arr;

      //js自带对象或用户自定义类实例
      case "[object Object]":
        let obj = {};
        for (let key in data) {
          //会遍历原型链上的属性方法，可以用hasOwnProperty来控制 （obj.hasOwnProperty(prop)
          obj[key] = deepCopy(data[key]);
        }
        return obj;
    }
  } else {
    //string,number,bool,null,undefined,symbol
    return data;
  }
};
