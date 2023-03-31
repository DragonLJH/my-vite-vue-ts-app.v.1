<template>
    <div class="low-code">
        <div class="low-code-coms" @dragstart="dragstart">
            <div class="item" v-for="(item, index) in items" :key="index" draggable="true" :data-name="item.name">
                {{ item.title }}
            </div>
        </div>
        <div class="low-code-canvas" ref="canvas" @drop="drop" @dragover="dragover" @click="store.changeCanvasItemIndex(-1)"
            @mousedown="canvasMouseDown">
            <div :class="`low-code-canvas-item ${store.canvasItemActiveIndex == index ? 'active' : ''}`"
                v-for="(item, index) in store.canvasData" :key="index" :style="toPx(item.style)"
                @click.stop="store.changeCanvasItemIndex(index)">
                <div class="low-code-canvas-item-main">
                    <div :class="`item ${direction}`" v-for=" direction in ['r', 'b', 'rb']" :key="direction"
                        @mousedown.stop="canvasMouseDown($event, direction)"></div>
                    <component :is='item.component' v-model="item.value"></component>
                </div>
            </div>
        </div>
        <div class="low-code-config">
            <div>
                <div class="low-code-config-item" v-for="(item, index) in store.canvasData[store.canvasItemActiveIndex]  "
                    :key="index">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, createApp, defineComponent } from 'vue';
import { toPx } from '@/utils/index'
import { useCanvasDataStore } from '@/stores/index'
import { pathsMsg, paths } from '@/lowcoms/index'
import type { canvasProps } from '@/stores/index'
const store = useCanvasDataStore()


const canvas = ref()
onMounted(() => {
})

const dragstart = (e: any) => {
    const { clientX, clientY, target } = e
    // 计算拖拽组件起始 x,y 的值
    const { x: tX, y: tY } = target.getBoundingClientRect()
    e.dataTransfer.setData("name", e.target.dataset.name);
    // 计算鼠标在拖拽组件的位置
    e.dataTransfer.setData("cX", clientX - tX);
    e.dataTransfer.setData("cY", clientY - tY);
}
const drop = (e: any) => {
    const name = e.dataTransfer.getData("name")
    const cX = e.dataTransfer.getData("cX")
    const cY = e.dataTransfer.getData("cY")
    const { style, value } = pathsMsg[name]
    const { clientX, clientY } = e
    const { x, y } = canvas.value.getBoundingClientRect()
    const canvasItem = {} as canvasProps
    let initX = clientX - x - cX
    let initY = clientY - y - cY
    // 画布局限
    if (initX < 0) initX = 0
    if (initY < 0) initY = 0
    canvasItem.style = {
        ...style,
        top: initY,
        left: initX,
    }
    canvasItem.component = name
    canvasItem.value = value
    store.addCanvasItem(canvasItem)
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



const canvasMouseDown = (e: MouseEvent, direction?: string) => {
    if (store.canvasItemActiveIndex == -1) return
    const { style } = store.canvasData[store.canvasItemActiveIndex]
    const { top, left, width, height } = style
    const { clientX: initX, clientY: initY }: { clientX: number, clientY: number } = e
    // getBoundingClientRect()获取 canvas 元素的左，上，右和下分别相对浏览器视窗的位置  
    const { x: cX, y: cY, width: cW, height: cH } = canvas.value.getBoundingClientRect()
    // 鼠标在组件上相对的位置
    const pointerX = initX - left - cX
    const pointerY = initY - top - cY
    const move = (moveEvent: any) => {
        // 解构赋值 给 moveX 和 moveY 分别赋值 clientX 和 clientY
        // 移动后的坐标
        const { clientX: moveX, clientY: moveY }: { clientX: number, clientY: number } = moveEvent
        let endX = moveX - cX - pointerX
        let endY = moveY - cY - pointerY
        // 画布局限
        if (endX < 0) endX = 0
        if (endY < 0) endY = 0
        if (endX + width > cW) endX = cW - width
        if (endY + height > cH) endY = cH - height
        // 更新目标 宽高 
        if (direction) {
            let mW = width
            let mH = height
            if (direction.indexOf("r") !== -1) mW += (moveX - cX - width - left)
            if (direction.indexOf("b") !== -1) mH += (moveY - cY - height - top)
            if (mW + left > cW) mW = cW - left
            if (mH + top > cH) mH = cH - top
            store.changeCanvasItemIndexStyle({
                ...style,
                width: mW,
                height: mH,
            })
            return
        }

        // 更新目标位置
        store.changeCanvasItemIndexStyle({
            ...style,
            top: endY,
            left: endX,
        })
    }
    const up = (e: any) => {  // 鼠标松开结束事件的监听

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };
    // 鼠标按下的时候分别监听鼠标移动事件和鼠标松开事件
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
}

// const directionMouseDown = (e: MouseEvent, direction: string) => {
//     const { style } = store.canvasData[store.canvasItemActiveIndex]
//     const { top, left, width, height } = style
//     const { x: cX, y: cY, width: cW, height: cH } = canvas.value.getBoundingClientRect()
//     const move = (moveEvent: any) => {
//         // 解构赋值 给 moveX 和 moveY 分别赋值 clientX 和 clientY
//         // 移动后的坐标
//         const { clientX: moveX, clientY: moveY }: { clientX: number, clientY: number } = moveEvent
//         let mW = width
//         let mH = height
//         if (direction.indexOf("r") !== -1) {
//             mW += (moveX - cX - width - left)
//         }
//         if (direction.indexOf("b") !== -1) {
//             mH += (moveY - cY - height - top)
//         }
//         if (mW + left > cW) mW = cW - left
//         if (mH + top > cH) mH = cH - top
//         // 更新目标 宽高
//         store.changeCanvasItemIndexStyle({
//             ...style,
//             width: mW,
//             height: mH,
//         })
//     }
//     const up = (e: any) => {  // 鼠标松开结束事件的监听
//         document.removeEventListener("mousemove", move);
//         document.removeEventListener("mouseup", up);
//     };
//     // 鼠标按下的时候分别监听鼠标移动事件和鼠标松开事件
//     document.addEventListener("mousemove", move);
//     document.addEventListener("mouseup", up);
// }
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

                .low-code-canvas-item-main {
                    .item {
                        position: absolute;
                        width: 6px;
                        height: 6px;
                        background-color: #40a9ff;
                        border-radius: 50%;
                        z-index: 2;

                        &.r {
                            right: -3px;
                            top: 0;
                            bottom: 0;
                            margin: auto 0;
                            cursor: e-resize;
                        }

                        &.b {
                            bottom: -3px;
                            left: 0;
                            right: 0;
                            margin: 0 auto;
                            cursor: s-resize;
                        }

                        &.rb {
                            right: -3px;
                            bottom: -3px;
                            cursor: nw-resize;
                        }
                    }
                }
            }

            .low-code-canvas-item-main {
                width: 100%;
                height: 100%;
                position: relative;
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