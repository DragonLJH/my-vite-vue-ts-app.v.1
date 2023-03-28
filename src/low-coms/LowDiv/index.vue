<template>
    <div class="low-div" :style="toPx(props)">
        <input type="text">
    </div>
</template>
<script setup lang="ts">
import { withDefaults } from 'vue'
import { toPx } from '@/utils/index'

type lowDivProps = {
    width: number
    height: number
}

const props = withDefaults(defineProps<lowDivProps>(), {
    width: 100,
    height: 50,
})

</script>
<style></style>