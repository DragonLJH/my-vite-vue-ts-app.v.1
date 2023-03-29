<template>
    <div class="low-code">
        <div class="low-code-coms" @dragstart="dragstart">
            <div class="item" v-for="(item, index) in items" :key="index" draggable="true" :data-name="item.name">
                {{ item.title }}
            </div>
        </div>
        <div class="low-code-canvas" ref="canvas" @drop="drop" @dragover="dragover">
            <div class="low-code-canvas-item" v-for="(item, index) in canvasData" :key="index" :style="toPx(item.style)">
                <component :is='item.component'></component>
            </div>
        </div>
        <div class="low-code-config">
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, createApp, defineComponent } from 'vue';
import { useCounterStore } from '@/stores/index'
import { pathsMsg, paths } from '@/lowcoms/index'
import { toPx } from '@/utils/index'
type canvasStyleProps = {
    top: number
    left: number
    width: number
    height: number
}
type canvasProps = {
    component: string
    style: canvasStyleProps
}

const canvasData = reactive([] as Array<canvasProps>)

const canvas = ref()
onMounted(() => {
})

const dragstart = (e: any) => {
    e.dataTransfer.setData("name", e.target.dataset.name);
}
const drop = (e: any) => {
    const name = e.dataTransfer.getData("name")
    const { clientX, clientY } = e
    const { x, y } = canvas.value.getBoundingClientRect()
    const canvasItem = {} as canvasProps
    canvasItem.component = name
    canvasItem.style = {
        top: clientY - y,
        left: clientX - x,
        width: 100,
        height: 50,
    }
    canvasData.push(canvasItem)
    console.log("drop", e, clientY - y, clientX - x)
}
const dragover = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
}

// low-code-coms 组件信息
const items = reactive(
    Object.entries(pathsMsg).map(([name, title]) => {
        return {
            name, title
        }
    })
)
console.log("low-coms", items)





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
        position: relative;
        flex: 1;
        margin: 0px 10px;
        height: 100%;
        box-shadow: 0px 0px 10px 1px #ccc;

        .low-code-canvas-item {
            position: absolute;
            display: inline-block;
        }
    }

    .low-code-config {
        width: 200px;
        height: 100%;
        box-shadow: -10px 0px 10px 1px #ccc;
    }
}
</style>