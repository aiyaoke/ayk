<template>
  <div class="electricity-statistics">
    <div class="card-title">{{ $translate("电量统计") }}</div>
    <div class="card-content">
      <div class="electricity-value">
        <div v-for="item in autoElectricityModels" :key="item.id" v-if="item.enabled">
          <div class="mask" @click="openDetails(item)">
            <span class="title">{{ item.desc }}</span>
            <span class="value">{{ item.value }}
            </span>
            <span class="showDetail-text">{{ $translate("查看详情") }}</span>
          </div>
          <el-dialog :visible.sync="dialogVisible" top="10vh" background-color="rgb(28,42,53)">
            <Chart :currentData="currentChar" :close="dialogVisible" />
          </el-dialog>
        </div>
      </div>
      <div class="electricity-charts" ref="electricity-charts"></div>
    </div>
  </div>
</template>

<script>
import { apiGetElectricityValue, apiGetElectricityCharts } from "@/api/plant";
import { tooltipStyle } from "@/common/config";
import { createNamespacedHelpers } from "vuex";
const { mapGetters: app_getters } = createNamespacedHelpers("app");
const { mapGetters: plant_getters } = createNamespacedHelpers("plant");
export default {
  name: "ElectricityStatistics",
  data() {
    return {
      chartNames: [
        this.$translate("光伏"),
        this.$translate("电网"),
        this.$translate("负载")
      ],
      dialogVisible: false,
      currentChar: {},
      autoElectricityModels: [{}]
    };
  },
  mounted() {
    this.autoElectricityModels = this.plantModels;
  },
  computed: {
    ...plant_getters(["currentPlant", "plantModels"]),
    ...app_getters(["systemTheme"])
  },
  methods: {

    openDetails(item) {
      this.dialogVisible = true;
      this.currentChar = item;
      // this.$refs.currentChar-ref.clear();
    },
    // async getElectricityValue(plantId) {
    //   let { data } = await apiGetElectricityValue({
    //     plantId
    //   });
    //   data &&
    //     this.electricityValue.forEach(
    //       item => (item.value = JSON.parse(data)[item.key])
    //     );
    // },
    async getElectricityCharts(plantId) {
      let { data } = await apiGetElectricityCharts({
        plantId
      });
      data = JSON.parse(data || "{}");
      let myChart = this.$echarts.init(this.$refs["electricity-charts"]);
      let option = {
        title: {
          text: this.$translate("用电量统计"),
          x: "center",
          textStyle: {
            color: this.systemTheme === "light" ? "#212223" : "#fff"
          }
        },
        tooltip: tooltipStyle,
        legend: {
          orient: "vertical",
          left: "right",
          top: 30,
          data: this.chartNames,
          textStyle: {
            color: "#999"
          },
          formatter: name => {
            let _index;
            let keys = [
              "cumulativeEnergySum",
              "cEnergySum",
              "loadCumulativeEnergySum"
            ];
            this.chartNames.forEach((item, index) => {
              if (item === name) {
                _index = index;
              }
            });
            return `${data[keys[_index]]} kWh`;
          }
        },
        series: [
          {
            name: this.$translate("用电量统计"),
            type: "pie",
            radius: ["30%", "50%"],
            center: ["50%", "55%"],
            data: [
              {
                value: data.cumulativeEnergySum,
                name: this.$translate("光伏")
              },
              { value: data.cEnergySum, name: this.$translate("电网") },
              {
                value: data.loadCumulativeEnergySum,
                name: this.$translate("负载")
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                color: params => {
                  let colorList = [
                    "rgb(195, 240, 156)",
                    "rgb(81, 158, 248)",
                    "rgb(147, 140, 212)"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      window.onresize = function () {
        myChart.resize();
      };
    }
  },
  watch: {
    currentPlant({ plantId }) {
      if (plantId) {
        this.getElectricityCharts(plantId);
      }
    },
    systemTheme() {
      this.getElectricityCharts(this.currentPlant.plantId);
    },
    plantModels: {
      handler(newVal, oldVal) {
        this.autoElectricityModels = newVal;
      },
      immediate: true,
      deep: true
    }

  },
  components: {
    PlaneBox: (_) => import("@/components/PlaneBox"),
    ExportExcel: (_) => import("@/components/ExportExcel"),
    Chart: (_) => import("./Chart.vue"),
  }
};
</script>

<style scoped lang="scss">
.electricity-statistics {
  .card-content {
    @include dis-flex(center, center);

    >div {
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
    }

    .electricity-value {
      flex: 4;
      display: grid;
      grid-gap: 10px;
      grid-template:
        "m1  m2 " 1fr "m3  m4 " 1fr "m5  m6 " 1fr
        /1fr 1fr;

      >div {
        border-radius: 5px;
        @include bg-color("1");
        @include dis-flex(center, center, column);
        font-size: 35px;
        font-family: DINCondensed-Bold;
        position: relative;

        .title {
          font-size: 15px;
          font-family: normal;
          position: absolute;
          left: 5px;
          top: 10px;
        }

        .value {
          @include font-color("1");
        }

        .unit {
          font-size: 13px;
          font-family: normal;
          font-weight: bolder;
        }
      }
    }

    .electricity-charts {
      flex: 3;
    }

    .mask {
      width: 100%;
      height: 100%;
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      @include dis-flex(center, center);
      overflow: hidden;

      .showDetail-text {
        font-size: 10px;
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        @include font-color("1");
        font-weight: bold;
        transition: all 0.5s ease;
      }

      &:hover {
        .showDetail-text {
          bottom: 25px;
        }
      }
    }
  }
}
</style>
