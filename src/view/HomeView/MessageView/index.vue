<template>
    <div>
        {{ store.count }} 
        <button @click="store.increment">increment</button>
        <button @click="messageClick">MessageView</button>

    </div>
</template>
<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { useCounterStore } from '@/stores/index'
const store = useCounterStore()
const showMsg = getCurrentInstance()?.appContext.config.globalProperties.$showMsg
const messageClick = () => {
    showMsg(new Date().getTime() + "", (close: () => void) => {
        close()
        console.log("messageClick")
    })
}

</script>