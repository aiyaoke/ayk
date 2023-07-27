const domain = ".sermatec-cloud.com";

export const serve = 1; // 1 国内 0 国外
// export const baseUrl = 'http://192.168.6.9/api' //联想

export const baseUrl = `https://${serve ? "api" : "api1"}${domain}`;
export const socketUrl = `https://${serve ? "www" : "eur"}${domain}`;

export const uploadLogoUrl = `${baseUrl}/zuul/user/uploadHead/`;

export const storageUrl = `${baseUrl}/sermatec-minsys/dtuExcelBatchImport`;

export const downLoadStorageTemplateUrl = `${baseUrl}/minsys/download/dtuBatchImportSheetTemplet`;

export const codeImgUrl = `${baseUrl}/user/getKaptchaImage`;

// export const weatherUrl = "https://free-api.heweather.net/s6/weather/forecast";
export const weatherUrl = "https://devapi.qweather.com/v7/grid-weather/3d";

export const weatherIconUrl =
  "https://cdn.heweather.com/img/plugin/190516/icon/c/";

export const socketSubUrlTopic = {
  controlStrategy: {
    subUrl: "/ws/cmd_status_info",
    topic: "/topic/cmd_status_info/user"
  },
  alarm: {
    subUrl: "/ws/alarm_info",
    topic: "/topic/alarm_info/user"
  },
  workOrder: {
    subUrl: "/ws/work_order",
    topic: "/topic/work_order"
  },
  onLineStatus: {
    subUrl: "/ws/flush_up",
    topic: "/topic/flush_up"
  }
};

export const localeOptions = [
  { icon: "#icon-zhongguo-", label: "简体中文", value: "zh" },
  { icon: "#icon-zhongguo-", label: "繁体中文", value: "zh_tw" },
  { icon: "#icon-meiguo-", label: "English", value: "en" },
  { icon: "#icon-jieke", label: "czech", value: "czech" },
  { icon: "#icon-deguo", label: "Germany", value: "german" },

];

export const plantStatus = [
  { label: "正常", value: 1 },
  { label: "告警", value: 2 },
  { label: "工程", value: 3 }
];

export const plantTypes = [
  { label: "家用屋顶", value: 1 },
  { label: "小型工商业", value: 2 },
  { label: "微网", value: 3 }
];

export const accountSatus = [
  { label: "正常", value: true },
  { label: "停用", value: false }
];

export const roleType = [
  { label: "普通用户", value: 1 },
  { label: "超级用户", value: 2 },
  { label: "管理员", value: 3 }
];

export const deviceTypes = [
  { label: "储能集装箱", value: 1 },
  { label: "小机系统", value: 2 },
  { label: "小高压", value: 3 }
];

export const priceTypes = [
  { label: "尖", value: 1 },
  { label: "峰", value: 2 },
  { label: "平", value: 3 },
  { label: "谷", value: 4 }
];

export const timeZone = [
  { label: "UTC+1", value: "UTC+1" },
  { label: "UTC+2", value: "UTC+2" },
  { label: "UTC+3", value: "UTC+3" },
  { label: "UTC+4", value: "UTC+4" },
  { label: "UTC+5", value: "UTC+5" },
  { label: "UTC+6", value: "UTC+6" },
  { label: "UTC+7", value: "UTC+7" },
  { label: "UTC+8", value: "UTC+8" },
  { label: "UTC+9", value: "UTC+9" },
  { label: "UTC+10", value: "UTC+10" },
  { label: "UTC+11", value: "UTC+11" },
  { label: "UTC+12", value: "UTC+12" },
  { label: "UTC+0", value: "UTC+0" },
  { label: "UTC-1", value: "UTC-1" },
  { label: "UTC-2", value: "UTC-2" },
  { label: "UTC-3", value: "UTC-3" },
  { label: "UTC-4", value: "UTC-4" },
  { label: "UTC-5", value: "UTC-5" },
  { label: "UTC-6", value: "UTC-6" },
  { label: "UTC-7", value: "UTC-7" },
  { label: "UTC-8", value: "UTC-8" },
  { label: "UTC-9", value: "UTC-9" },
  { label: "UTC-10", value: "UTC-10" },
  { label: "UTC-11", value: "UTC-11" }
];

export const runMonitor_dataList = [
  { value: "101_130_V", label: "U相电压" },
  { value: "102_131_A", label: "U相电流" }, 
  { value: "103_132_V", label: "V相电压" },
  { value: "104_133_A", label: "V相电流" },
  { value: "105_134_V", label: "W相电压" },
  { value: "106_135_A", label: "W相电流" },
  { value: "107_136_V", label: "U线电压" },
  { value: "108_137_A", label: "U线电流" },
  { value: "109_138_V", label: "V线电压" },
  { value: "110_139_A", label: "V线电流" },
  { value: "111_140_V", label: "W线电压" },
  { value: "112_141_A", label: "W线电流" },
  { value: "113_142_kW", label: "U相有功" },
  { value: "114_143_kVar", label: "U相无功" },
  { value: "115_144_kW", label: "V相有功" },
  { value: "116_145_kVar", label: "V相无功" },
  { value: "117_146_kW", label: "W相有功" },
  { value: "118_147_kVar", label: "W相无功" },
  { value: "119_148_kW", label: "U线有功" },
  { value: "120_149_kVar", label: "U线无功" },
  { value: "121_150_kW", label: "V线有功" },
  { value: "122_151_kVar", label: "V线无功" },
  { value: "123_152_kW", label: "W线有功" },
  { value: "124_153_kVar", label: "W线无功" },
  { value: "125_154_kW", label: "总有功功率" },
  { value: "126_155_kVar", label: "总无功功率" },
  { value: "127_156_kW", label: "总视在功率" },
  { value: "128_157_f", label: "频率" },
  { value: "129_158_", label: "功率因数" }
];

export const energyMonitor_dataList = [
  { value: "163_V", label: "U相电压" },
  { value: "164_A", label: "U相电流" },
  { value: "165_V", label: "V相电压" },
  { value: "166_A", label: "V相电流" },
  { value: "167_V", label: "W相电压" },
  { value: "168_A", label: "W相电流" },
  { value: "169_kW", label: "总有功功率" },
  { value: "170_kVar", label: "总无功功率" },
  { value: "171_", label: "功率因数" }
];

export const dayTypes = [
  { id: 1, type: "天" },
  { id: 2, type: "周" },
  { id: 3, type: "月" },
  { id: 4, type: "年" }
];

export const tooltipStyle = {
  backgroundColor: "rgb(255, 255, 255)",
  borderColor: "rgba(77, 80, 84, 0.2)",
  borderWidth: 1,
  extraCssText: "box-shadow:rgba(0, 0, 0, 0.1) 0px 5px 15px 0px",
  textStyle: {
    color: "rgb(51, 51, 51)",
    fontSize: 12
  }
};

export const colorList = [
  "#c23531",
  "#3af3a7",
  "#ca8622",
  "#b06ceb",
  "#31e0f0",
  "#749f83"
];

// 大系统
// 写
// 1000 控制通道执行指令
// 1027 需量控制
// 1003 日控制测略
// 1004 月控制测略
// 1005 控制测略两分钟

// 读
// 1029 控制通道执行指令
// 1031 指令状态
// 1030 当前执行指令
// 1028 需量控制

// 小高压
// 写
// 2007 写故障屏蔽
// 2009 写调式模式故障屏蔽
// 2002 写系统电池指令
// 2005 设置调试模式
// 2011 写调试模式低功耗故障屏蔽

// 读
// 2006 读故障
// 2008 读调试模式故障
// 2000 读当前电池指令
// 2001 读系统电池指令
// 2003 读当前pcs指令
// 2004 读调试模式状态
// 2010 读调试模式低功耗故障

// 中哲
// 3000  写策略运行模式设置
// 3001  逆变器开关机设置
// 3002  充放电时段设置
// 3004  系统充放电有功功率设置
// 3003  尖峰平谷电价设置
// 3005  变压器需量阈值设置
// 3006  变压器防逆流安全余量设置

export const controlStrategyArr = [
  1000,
  1027,
  1003,
  1004,
  1005,
  1029,
  1031,
  1030,
  1028,
  2007,
  2009,
  2002,
  2005,
  2011,
  2006,
  2008,
  2000,
  2001,
  2003,
  2004,
  2010,
  3000,
  3001,
  3002,
  3003,
  3004,
  3005,
  3006
];
