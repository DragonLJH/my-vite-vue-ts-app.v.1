<template>
    <div class="low-div">
        <div :class="`low-div-text ${active ? 'active' : ''}`" @dblclick="changeActive">
            {{ text }}
        </div>
        <input :class="active ? '' : 'active'" type="text" v-model="text" @blur="changeActive">
    </div>
</template>
<script setup lang="ts">
import { ref, withDefaults, onMounted } from 'vue';
const active = ref(true)
const text = ref("")
const changeActive = () => {
    active.value = !active.value
    emits("update:modelValue", text.value)
}

const props = withDefaults(defineProps<{
    modelValue?: string
}>(), {
    modelValue: ""
})
const emits = defineEmits(["update:modelValue"])

onMounted(() => {
    text.value = props.modelValue
})


</script>
<style lang="scss">
$fontSize: 16px;

.low-div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: solid 1px #ccc;
    position: relative;

    .low-div-text {
        width: 100%;
        height: 100%;
        display: none;
        justify-content: center;
        align-items: center;
        font-size: $fontSize;

        &.active {
            display: inline-flex;
        }
    }

    input {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: 100%;
        height: 100%;
        border: none;
        background: none;
        text-align: center;
        font-size: $fontSize;

        &.active {
            display: block;
        }

        &:focus {
            outline: none;
        }
    }
}
</style>