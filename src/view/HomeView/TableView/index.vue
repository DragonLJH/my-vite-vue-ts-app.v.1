<template>
    <div class="table-view">
        <TableCom />
    </div>
</template>

<script setup lang="ts">
import TableCom from '@/components/TableCom/index.vue';
import { onMounted, reactive } from 'vue';

const tableData = reactive([])
onMounted(() => {
    let alias = {
        product: { label: "" },
        number: { label: "" },
        price: { label: "" },
    }

    let list = new Array(100).fill(null).map((_) => {
        return {

        }
    })

    console.log("onMounted", list)
})



</script>

<style lang="scss">
.table-view {}
</style>