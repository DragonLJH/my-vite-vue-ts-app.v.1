<template>
    <div class="low-code">
        <div class="low-code-coms" @dragstart="dragstart">
            <div class="item" v-for="(item, index) in items" :key="index" draggable="true" :data-name="item.name">
                {{ item.title }}
            </div>
        </div>
        <div class="low-code-canvas" ref="canvas" @drop="drop" @dragover="dragover" @click="store.changeCanvasItemIndex(-1)"
            @mousedown="myMouseDown">

            <CanvasItem :class="`low-code-canvas-item ${store.canvasItemActiveIndex == index ? 'active' : ''}`"
                v-for="(item, index) in store.canvasData" :key="index" :canvasStyle="item.style"
                @click.stop="store.changeCanvasItemIndex(index)">
                <component :is='item.component' v-model="item.value"></component>
            </CanvasItem>
        </div>
        <div class="low-code-config">
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, createApp, defineComponent } from 'vue';
import { useCanvasDataStore } from '@/stores/index'
import { pathsMsg, paths } from '@/lowcoms/index'
import type { canvasProps } from '@/stores/index'
import CanvasItem from './CanvasItem.vue';
const store = useCanvasDataStore()


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
    canvasItem.value = pathsMsg[name].value
    store.addCanvasItem(canvasItem)
    console.log("drop", store.canvasData)
}
const dragover = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
}

// low-code-coms 组件信息
const items = reactive(
    Object.entries(pathsMsg).map(([name, res]) => {
        return {
            name, ...res
        }
    }) as Array<{ [k: string]: string }>
)
console.log("low-coms", items)



const myMouseDown = (e: any) => {
    if (store.canvasItemActiveIndex == -1) return
    const move = (moveEvent: any) => {
        // 解构赋值 给 moveX 和 moveY 分别赋值 clientX 和 clientY
        // 移动后的坐标
        let { clientX: moveX, clientY: moveY }: { clientX: number, clientY: number } = moveEvent
        let { x, y } = canvas.value.getBoundingClientRect() // getBoundingClientRect()获取 appLayoutMainEdit 元素的左，上，右和下分别相对浏览器视窗的位置 
        store.changeCanvasItemIndexStyle({
            top: moveY - y,
            left: moveX - x,
            width: 100,
            height: 50
        })
    }
    const up = (e: any) => {  // 鼠标松开结束事件的监听
        // setRange({ top: 0, left: 0, width: 0, height: 0 })
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };
    // 鼠标按下的时候分别监听鼠标移动事件和鼠标松开事件
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
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
        position: relative;
        flex: 1;
        margin: 0px 10px;
        height: 100%;
        box-shadow: 0px 0px 10px 1px #ccc;

        .low-code-canvas-item {
            position: absolute;
            display: inline-block;

            &.active {
                outline: solid 1px #1995e8;
            }
        }

    }

    .low-code-config {
        width: 200px;
        height: 100%;
        box-shadow: -10px 0px 10px 1px #ccc;
    }
}
</style>