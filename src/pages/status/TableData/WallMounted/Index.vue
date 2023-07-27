<template>
    <div class="params-value">
        <CardValue :value="batteryValue" />
        <CardValue :value="bmcTable" />
    </div>
</template>

<script>
import {
    apiWallMounted
} from "@/api/device";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: device_getters } = createNamespacedHelpers("device");
export default {
    name: "Wall",
    props: {
        connectStatus: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            batteryValue: {
                title: "BMS",
                data: [
                    { name: "BMS系统状态", value: "-", key: "status" },
                    { name: "充放电状态", value: "-", key: "cdStatus" },
                    { name: "禁止充电标志", value: "-", key: "fcFlag" },
                    { name: "禁止放电标志", value: "-", key: "fdFlag" },
                    { name: "电流", value: "-", key: "cur" },
                    { name: "电压", value: "-", key: "vol" },
                    { name: "功率", value: "-", key: "power" },
                    { name: "SOE", value: "-", key: "soe" },
                    { name: "SOH", value: "-", key: "soh" },
                    { name: "充电功率限值", value: "-", key: "cPowerLimit" },
                    { name: "放电功率限值", value: "-", key: "dPowerLimit" },
                    { name: "充电电流限值", value: "-", key: "cCurLimit" },
                    { name: "放电电流限值", value: "-", key: "dCurLimit" },
                    { name: "充电电压限值", value: "-", key: "cVolLimit" },
                    { name: "放电电压限值", value: "-", key: "dVolLimit" },
                    { name: "充电可用电量", value: "-", key: "cLeftAh" },
                    { name: "放电可用电量", value: "-", key: "dLeftAh" },
                    { name: "充电可用电能量", value: "-", key: "cLeftKwh" },
                    { name: "放电可用电能量", value: "-", key: "dLeftKwh" },
                    { name: "历史充电电量", value: "-", key: "hcAh" },
                    { name: "历史放电电量", value: "-", key: "hdAh" },
                    { name: "历史充电电能量", value: "-", key: "hcKwh" },
                    { name: "历史放电电能量", value: "-", key: "hdKwh" },
                    { name: "最高电压", value: "-", key: "hcVol" },
                    { name: "最高电压电池号", value: "-", key: "hcVolNo" },
                    { name: "最低电压", value: "-", key: "lcVol" },
                    { name: "最低电压电池号", value: "-", key: "lcVolNo" },
                    { name: "最高电池温度", value: "-", key: "hcTemp" },
                    { name: "最高温度电池号", value: "-", key: "hcTempNo" },
                    { name: "最低温度", value: "-", key: "lcTemp" },
                    { name: "最低温度电池号", value: "-", key: "lcTempNo" },
                    { name: "簇单体压差最大值", value: "-", key: "volDiffMax" },
                    { name: "堆单体温差最大值", value: "-", key: "tempDiffMax" }, 
                    { name: "充放电循环次数", value: "-", key: "cycleCount" },
                    { name: "正极最小绝缘电阻阻值", value: "-", key: "posRes" },
                    { name: "负极最小绝缘电阻阻值", value: "-", key: "negRes" },
                ],
            },
            BmcValue: {
                title: "BMC",
                data: [
                    { name: "簇状态", value: "-", key: "status" },
                    { name: "簇充放电状态", value: "-", key: "cdStatus" },
                    { name: "接触器状态", value: "-", key: "contactStatus" },
                    { name: "禁止充电标志", value: "-", key: "fcFlag" },
                    { name: "禁止放电标志", value: "-", key: "fdFlag" },
                    { name: "簇电流", value: "-", key: "cur" },
                    { name: "簇电压", value: "-", key: "vol" },
                    { name: "簇功率", value: "-", key: "power" },
                    { name: "簇SOC", value: "-", key: "soc" },
                    { name: "簇SOE", value: "-", key: "soe" },
                    { name: "簇SOH", value: "-", key: "soh" },
                    { name: "簇充电功率限值", value: "-", key: "cPowerLimit" },
                    { name: "簇放电功率限值", value: "-", key: "dPowerLimit" },
                    { name: "簇充电电流限值", value: "-", key: "cCurLimit" },
                    { name: "簇放电电流限值", value: "-", key: "dCurLimit" },
                    { name: "簇充电电压限值", value: "-", key: "cVolLimit" },
                    { name: "簇放电电压限值", value: "-", key: "dVolLimit" },
                    { name: "簇充电可用电量", value: "-", key: "cLeftAh" },
                    { name: "簇放电可用电量", value: "-", key: "dLeftAh" },
                    { name: "簇充电可用电能量", value: "-", key: "cLeftKwh" },
                    { name: "簇放电可用电能量", value: "-", key: "dLeftKwh" },
                    { name: "簇历史充电电量", value: "-", key: "hcAh" },
                    { name: "簇历史放电电量", value: "-", key: "hdAh" },
                    { name: "簇历史充电电能量", value: "-", key: "hcKwh" },
                    { name: "簇历史放电电能量", value: "-", key: "hdKwh" },
                    { name: "簇最高电压", value: "-", key: "hcVol" },
                    { name: "簇最高电压电池号", value: "-", key: "hcVolNo" },
                    { name: "簇最低电压", value: "-", key: "lcVol" },
                    { name: "簇最低电压电池号", value: "-", key: "lcVolNo" },
                    { name: "簇最高电池温度", value: "-", key: "hcTemp" },
                    { name: "簇最高温度电池号", value: "-", key: "hcTempNo" },
                    { name: "簇最低温度", value: "-", key: "lcTemp" },
                    { name: "簇最低温度电池号", value: "-", key: "lcTempNo" },
                    { name: "充放电循环次数", value: "-", key: "cycleCount" },
                    { name: "正极最小绝缘电阻阻值", value: "-", key: "posRes" },
                    { name: "负极最小绝缘电阻阻值", value: "-", key: "negRes" },

                ],
            },
            
            cellData:{
                title: "Pack数据详情",
                data:[]
            },
            intervalInstance: null,
            bmcTable:[],
        };
    },
    components: {
        CardValue: (_) => import("./components/TableData.vue"),
    },
    mounted() {
        this.getBatteryData();
        this.intervalInstance = setInterval((_) => this.getBatteryData(), 60000);
    },
    computed: {
        ...device_getters(["currentDevice"]),
    },
    methods: {
     
        async getBatteryData() {
            let { data } = await apiWallMounted({ dtuId:1});
            if (data) {
                let {
                bms,
                bmcList
        } = data;
        this.initValue(this.batteryValue, bms);
        this.bmcTable=[];
        bmcList.map(item=>{
            this.initValue(this.BmcValue, item);
            this.bmcTable.push(this.BmcValue)
        })
            }
            console.log(this.bmcTable,222222222222);
        },
       
        initValue(baseData, resData) {
            baseData.data.forEach((item) => {
                if (resData&&resData.hasOwnProperty(item.key)) {
                    item.value = resData[item.key];
                }
            });
        },
      
    },
    watch: {
        // connectStatus(newVal) {
        //     this.$set(this.inverterValue.data, 5, {
        //         name: "连接状态",
        //         value: newVal,
        //         key: "onConnect",
        //     });
        // },
    },
    destroyed() {
        clearInterval(this.intervalInstance);
    },
};
</script>

<style lang="scss" scoped>
.params-value {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    > div {
        @include bg-color("2");
        border-radius: 3px;
    }
}
</style>
