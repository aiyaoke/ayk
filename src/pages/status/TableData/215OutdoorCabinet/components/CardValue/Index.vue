<template>
  <div class="table">
    <div class="title">
      <span>{{ $translate(value.title) }}</span>
      <span  @click="handleCollapse"
            class="el-icon-d-arrow-right collapse-icon"
            :style="
              !isCollapse
                ? {
                    transform: 'rotate(0deg)',
                  }
                : {
                    transform: 'rotate(90deg)',
                  }
            "></span>
    </div>
    <div
          class="content"
          :style="
            !isCollapse
              ? {
                  height: 0,
                }
              : {
                  height: Object.keys(value.data).length* 33 + 'px'||0,
                }
          "
        >
    <div v-for="(item, index) in value.data" :key="index" class="value">
      <span>{{ $translate(item.name) }}</span>
      <span class="num">{{ item.value }}</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    value: {
      type: Object,
      default: _ => {}
    }
  },
  data() {
      return {
        isCollapse: false,
      };
    },
    methods: {
      handleCollapse() {
        this.isCollapse = !this.isCollapse;
      },
    }
};
</script>

<style lang="scss" scoped>
 .collapse-icon {
          cursor: pointer;
          transition: all 0.5s;
        };
        .content {
        transition: height 0.5s;
        overflow: hidden;
        display: flex;
        flex-direction:column;
        .value {
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
.table {
  border: 1px solid rgb(136, 125, 125);
  height: fit-content;
  .title {
    padding: 8px;
    box-sizing: border-box;
    @include font-color("1");
    @include bg-color("1");
    display: flex;
        justify-content: space-between;
  }
}
</style>