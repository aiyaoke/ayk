<template>
  <div
    :class="{ icon_box: true, breath: isActive }"
    :style="{ '--color': color }"
  >
    <i :class="'iconfont ' + iconClassName"></i>
  </div>
</template>

<script>
export default {
  name: 'IconBox',
  props: ['isActive', 'iconClassName', 'color'],
}
</script>

<style lang="scss" scoped>
.breath {
  @include icon_breath(var(--color));
}
.icon_box {
  width: 100%;
  height: 100%;
  border: 1.5px solid #999;
  border-radius: 50%;
  color: #999;
  @include dis-flex(center, center);
  box-sizing: border-box;
  .iconfont {
    font-size: 35px;
  }
}
</style>
