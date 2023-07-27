<template>
  <div class="table">
    <div class="title">
      <span>{{ $translate(value.title) }}</span>
      <span></span>
    </div>
    <div v-for="(item, index) in value.data" :key="index" class="value">
      <span>{{ $translate(item.name) }}</span>
      <span class="num">{{ item.value }}</span>
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
  }
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
    @include bg-color("1");
  }
  div + div {
    @include dis-flex(center, stretch);
    border-top: 1px solid #999;
    span {
      padding: 8px;
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
</style>