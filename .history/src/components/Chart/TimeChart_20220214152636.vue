<template>
  <chart :ref="args.ref" :options="options" :auto-resize="true"></chart>
</template>

<script>
import { tooltipStyle, getSeriesStyle } from "@/common/utils.echarts";
import { deepClone } from "@/common/utils";
import { lineColor, labelColor } from "@/assets/styles/echarts-dark.scss";
import { loadingOptions } from "@/common/utils.echarts";
export default {
  name: "TimeChart",
  data() {
    return {
      baseOptions: {
        legend: {
          top: 4,
          textStyle: {
            fontSize: 12,
            color: labelColor
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          ...tooltipStyle
        },
        dataZoom: [{ type: "inside" }],
        toolbox: {
          show: true,
          right: 25,
          feature: {
            magicType: { show: true, type: ["line", "bar"], title: "123" },
            dataView: {
              //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新

              show: true, //是否显示该工具。

              title: "数据视图",

              readOnly: false, //是否不可编辑（只读）

              lang: ["数据视图", "关闭", "刷新"], //数据视图上有三个话术，默认是['数据视图', '关闭', '刷新']

              backgroundColor: "#fff", //数据视图浮层背景色。

              textareaColor: "#fff", //数据视图浮层文本输入区背景色

              textareaBorderColor: "#333", //数据视图浮层文本输入区边框颜色

              textColor: "#000", //文本颜色。

              buttonColor: "#c23531", //按钮颜色。

              buttonTextColor: "#fff" //按钮文本颜色。
            },

            saveAsImage: { title: this.$translate("保存图片") }
          }
        },
        xAxis: {
          type: "time",
          name: this.$translate("时间"),
          splitNumber: 12,
          axisPointer: {
            type: "line",
            lineStyle: {
              width: 1
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: lineColor,
              width: 1,
              type: "dashed"
            }
          },
          axisLine: {
            lineStyle: {
              color: lineColor
            }
          },
          axisLabel: {
            textStyle: {
              color: labelColor
            }
          }
        },
        yAxis: {
          type: "value",
          nameLocation: "end",
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle: {
              color: lineColor,
              width: 1,
              type: "dashed"
            }
          },
          axisLine: {
            lineStyle: {
              color: lineColor
            }
          },
          axisLabel: {
            textStyle: {
              color: labelColor
            }
          }
        },
        series: []
      },
      options: {}
    };
  },
  props: {
    args: {
      type: Object,
      default: _ => {}
    }
  },
  methods: {
    mergeOptions() {
      let chartInstance = this.$refs[this.args.ref];
      if (chartInstance) {
        chartInstance.showLoading(loadingOptions);
        setTimeout(_ => {
          chartInstance.hideLoading();
        }, 500);
      }
      this.options = deepClone(this.baseOptions);
      let { colorIndex, options: aOptions } = this.args;
      Object.keys(aOptions).forEach(item => {
        if (item === "series") {
          aOptions.series.forEach((uu, index) => {
            this.options.series[index] = {
              type: "line",
              ...getSeriesStyle(colorIndex || index),
              ...uu
            };
          });
        } else {
          let type = Object.prototype.toString.call(this.options[item]);
          if (type === "[object Array]") {
            this.options[item] = [...this.options[item], ...aOptions[item]];
          } else {
            this.options[item] = {
              ...this.options[item],
              ...aOptions[item]
            };
          }
        }
      });
    }
  },
  watch: {
    args: {
      deep: true,
      immediate: true,
      handler: function(newVal) {
        this.mergeOptions();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
