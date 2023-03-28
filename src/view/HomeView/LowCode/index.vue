<template>
    <div class="low-code">
        <div class="low-code-coms" @dragstart="dragstart">
            <div class="item" v-for="(item, index) in items" :key="index" draggable="true" :data-name="item.name">
                {{ item.title }}
            </div>
        </div>
        <div class="low-code-canvas" ref="canvas" @drop="drop" @dragover="dragover">
        </div>
        <div class="low-code-config">
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { pathsMsg, paths } from '@/low-coms/index'

const canvas = ref()
const canvasXY = reactive({ x: 0, y: 0 })
onMounted(() => {
    console.log(canvas.value)
})
console.log("canvas.value", canvas.value)

const items = reactive(
    Object.entries(pathsMsg).map(([name, title]) => {
        return {
            name, title
        }
    })
)
console.log("low-coms", pathsMsg, paths)

const dragstart = (e: any) => {
    e.dataTransfer.setData("name", e.target.dataset.name);
}
const drop = (e: any) => {
    const name = e.dataTransfer.getData("name")
    const { screenX: x, screenY: y } = e
    console.log("drop", name, x, y)
}
const dragover = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
}



</script>
<style lang="scss">
.low-code {
    width: 100%;
    height: 100%;
    display: flex;

    .low-code-coms {
        width: 100px;
        height: 100%;
        box-shadow: 10px 0px 10px 1px #ccc;

        .item {
            margin: 5px 10px;
            padding: 5px 10px;
            box-shadow: 5px 5px 5px 1px #000, inset 0px 0px 2px 1px #fff;
            cursor: pointer;
            user-select: none;
        }
    }

    .low-code-canvas {
        flex: 1;
        margin: 0px 10px;
        height: 100%;
        box-shadow: 0px 0px 10px 1px #ccc;
    }

    .low-code-config {
        width: 200px;
        height: 100%;
        box-shadow: -10px 0px 10px 1px #ccc;
    }
}
</style>