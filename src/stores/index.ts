import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。 
export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    function increment() {
        count.value++
    }

    return { count, increment }
})

export declare type canvasStyleProps = {
    top: number
    left: number
    width: number
    height: number
}
export declare type canvasProps = {
    component: string
    style: canvasStyleProps
    value?: string | object
}
export const useCanvasDataStore = defineStore('canvasDataStore', () => {
    const initCanvasItemActive = {
        component: "",
        style: {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
        },
        value: "",
    } as canvasProps
    const canvasData = reactive([] as Array<canvasProps>)
    const canvasItemActive = reactive(initCanvasItemActive)
    const canvasItemActiveIndex = ref(-1)
    function addCanvasItem(data: canvasProps) {
        canvasData.push(data)
    }
    function changeCanvasItemIndexStyle(style?: canvasStyleProps) {
        if (style) {
            canvasData[canvasItemActiveIndex.value].style = style
            return
        }
        canvasData[canvasItemActiveIndex.value].style = initCanvasItemActive.style
    }
    function changeCanvasItemIndex(index: number) {
        canvasItemActiveIndex.value = index
    }

    return { canvasData, canvasItemActive, canvasItemActiveIndex, addCanvasItem, changeCanvasItemIndexStyle, changeCanvasItemIndex }
})

