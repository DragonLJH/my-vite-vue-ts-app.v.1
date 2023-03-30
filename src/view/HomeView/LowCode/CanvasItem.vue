<template>
    <div class="canvas-item" :style="toPx(props.canvasStyle)">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { withDefaults, reactive, onMounted } from 'vue'
import type { canvasStyleProps } from '@/stores/index'
import { toPx } from '@/utils/index'
type canvasItemStyleProps = {
    canvasStyle: canvasStyleProps
}


const props = withDefaults(defineProps<canvasItemStyleProps>(), {
    canvasStyle: () => {
        return {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        }
    }
})
const canvasItemSty = reactive(props.canvasStyle)

onMounted(() => {
    console.log("canvasItemSty", canvasItemSty)
})
</script>

<style lang="scss">
.canvas-item {
    &.active {
        outline: solid 1px #1995e8;
    }
}
</style>
