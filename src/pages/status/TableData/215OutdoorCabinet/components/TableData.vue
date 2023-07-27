<template>
      <div class="table">
        <div class="title">
          <div>
            {{ currentIndex+'#' }}{{ value.title }} 
            <i class="arrow el-icon-caret-left" @click="changeIndex(-1)"></i>
            <i class="arrow el-icon-caret-right" @click="changeIndex(1)"></i>
            ({{ $translate("共") }} {{ value.data.length }} {{ $translate("组") }})
          </div>
          <span
            @click="handleCollapse"
            class="el-icon-d-arrow-right collapse-icon"
            :style="
              !isCollapse
                ? {
                    transform: 'rotate(0deg)',
                  }
                : {
                    transform: 'rotate(90deg)',
                  }
            "
          ></span>
        </div>
        <div
          class="content"
          :style="
            !isCollapse
              ? {
                  height: 0,
                }
              : {
                  height: (value.data[currentIndex - 1].vols.length + value.data[currentIndex - 1].tmps.packData.length+4)* 33 + 'px'||0,
                }
          "
        >
        <template >
          <div v-for="(uu, ii) in value.data[currentIndex - 1].vols"
            class="value"
          >
            <span >{{$translate("电芯")+(ii+1)+$translate("电压")}}</span>
            <span class="num">{{ uu }}V</span>
          </div>
          <div v-for="(uu, ii) in value.data[currentIndex - 1].tmps.packData"
            class="value"
          >
            <span >{{ $translate("电芯")+(ii+1)+$translate("温度")}}</span>
            <span class="num">{{ uu }} ℃ </span>
          </div>
          <div v-for="(uu, key) in value.data[currentIndex - 1].tmps.extraPackData"
            class="value"
          >
            <span >{{$translate(tmpName[key]) }}</span>
            <span class="num">{{ uu }} ℃ </span>
          </div>
        </template>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    name: "Table",
    props: {
      value: {
        type: Object,
        default: (_) => {},
      },
    },
    data() {
      return {
        currentIndex: 1,
        isCollapse: false,
        tmpName:{
          fuseLeft:'极柱正极温度',
          fuseRight:'极柱负极温度',
          negativePoles:'熔断器左侧温度',
          positivePoles:'熔断器右侧温度',
        }
      };
    },
    mounted() {
    },
    methods: {
      changeIndex(step) {
        let resIndex = this.currentIndex + step;
        if (resIndex === 0 || resIndex === this.value.data.length + 1||this.value.data.length===0) return;
        this.currentIndex += step;
      },
      handleCollapse() {
        this.isCollapse = !this.isCollapse;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  
    .table {
      border: 1px solid rgb(136, 125, 125);
      height: fit-content;
      .title {
        padding: 8px;
        box-sizing: border-box;
        @include font-color("1");
        display: flex;
        justify-content: space-between;
        .arrow {
          cursor: pointer;
        }
        .collapse-icon {
          cursor: pointer;
          transition: all 0.5s;
        }
      }
      .content {
        transition: height 0.5s;
        overflow: hidden;
        div {
          @include dis-flex(center, stretch);
          border-top: 1px solid #999;
          span {
            padding: 0 8px;
            height: 32px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 0;
            flex: 1;
            box-sizing: border-box;
            word-wrap: break-word;
            &:nth-child(1) {
              border-right: 1px solid #999;
            }
            &.num {
              font-family: DINCondensed-Bold;
              font-size: 16px;
              @include font-color("1");
            }
          }
        }
      }
    }
  </style>
  