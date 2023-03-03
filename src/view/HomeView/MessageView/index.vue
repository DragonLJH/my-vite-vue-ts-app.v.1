<template>
    <div>
        <button @click="messageClick">MessageView</button>

    </div>
</template>
<script setup lang="ts">
import { getCurrentInstance } from "vue";
const showMsg = getCurrentInstance()?.appContext.config.globalProperties.$showMsg
const messageClick = () => {
    showMsg(new Date().getTime() + "", (close: () => void) => {
        close()
        console.log("messageClick")
    })
}

</script>