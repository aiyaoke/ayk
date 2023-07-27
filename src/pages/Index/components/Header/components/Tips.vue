<template>
  <el-tooltip class="tips" effect="dark" placement="bottom">
    <div slot="content">
      <span>1.{{ $translate("终端用户建站所属私有电站，可以操作") }}。 </span
      ><br />
      <span
        >2.
        <i class="iconfont icon-duoren"></i>
        {{ $translate("所属共享电站(经销商创建)，终端用户不得操作") }}
        。</span
      ><br />
      <span>3.{{ $translate("经销商在普通版不得操作任何电站和设备") }}。</span>
    </div>
    <i class="iconfont icon-wenhao i-help"></i>
  </el-tooltip>
</template>

<script>
export default {
  name: "Tips"
};
</script>

<style scoped>
.i-help {
  font-size: 20px;
  margin: 0 25px;
  position: relative;
  top: 6px;
}
</style>
