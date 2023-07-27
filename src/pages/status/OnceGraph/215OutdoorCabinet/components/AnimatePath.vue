<template>
    <div class="svg_box">
        <svg class="svg" version="1.1">
            <path
                v-for="{ path, isActive, color } in svgConfig"
                :key="path"
                :d="path"
                fill="none"
                :stroke="com_color(isActive, color)"
                stroke-width="3"
            />
        </svg>
        <template
            v-for="({ path, isActive, direction, color }, index) in svgConfig"
        >
            <div
                v-show="isActive"
                :key="index + path"
                :class="'point ' + com_direction(isActive, direction)"
                :style="{
                    'offset-path': `path('${path}')`,
                    border: `2px solid ${color}`,
                }"
            ></div>
        </template>
    </div>
</template>

<script>
export default {
    name: "AnimatePath",
    props: ["svgConfig"],
    computed: {
        com_direction() {
            return (isActive, direction) => {
                return isActive ? (direction ? direction : "forward") : "";
            };
        },
        com_color() {
            return (isActive, color) => {
                return isActive ? (color ? color : "#999") : "#999";
            };
        },
    },
};
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
