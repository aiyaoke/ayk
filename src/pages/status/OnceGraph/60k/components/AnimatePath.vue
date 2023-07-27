<template>
  <div class="svg_box">
    <svg class="svg" version="1.1">
      <path
        v-for="item in svgPath"
        :key="item"
        :d="item"
        fill="none"
        :stroke="com_color"
        stroke-width="3"
      />
    </svg>
    <template v-for="(item, index) in pointPath">
      <div
        v-show="isRuning"
        :key="index + item"
        :class="'point ' + com_isRuning"
        :style="{
          'offset-path': `path('${item}')`,
          border: `2px solid ${color}`,
        }"
      ></div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AnimatePath',
  props: [
    'isRuning',
    'direction',
    'color',
    'linearColor',
    'svgPath',
    'pointPath',
    'linearId',
  ],
  computed: {
    com_isRuning() {
      return this.isRuning ? (this.direction ? this.direction : 'forward') : ''
    },
    com_color() {
      return this.isRuning ? (this.color ? this.color : '#999') : '#999'
    },
  },
}
</script>

<style lang="scss" scoped>
.svg_box {
  width: 100%;
  height: 100%;
  position: relative;
}
.svg {
  width: 100%;
  height: 100%;
}
.point {
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  animation: arrowAnimation 5s ease-in-out infinite;
  offset-distance: 0;
}

.forward {
  animation: forward 4s linear infinite;
}
.backward {
  animation: backward 4s linear infinite;
}
@keyframes forward {
  0% {
    opacity: 1;
    offset-distance: 0%;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    offset-distance: 100%;
  }
}
@keyframes backward {
  0% {
    opacity: 1;
    offset-distance: 100%;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    offset-distance: 0%;
  }
}
</style>
