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
export const useCanvasDataStore = defineStore('canvasData', () => {
    const canvasData = reactive([] as Array<canvasProps>)
    function addCanvasItem(data: canvasProps) {
        canvasData.push(data)
    }

    return { canvasData, addCanvasItem }
})

