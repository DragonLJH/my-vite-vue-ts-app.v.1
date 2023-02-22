<template>
    <div class="input-com" v-if="props.inpType === 'text'" :inpType="props.inpType">
        <div class="title">
            {{ props.title }}
        </div>
        <input type="text" :placeholder="props.placeholder" :value="props.modelValue"
            @input="emit('update:modelValue', $event.target.value)">
    </div>
    <div class="input-com" v-if="props.inpType === 'password'" :inpType="props.inpType">
        <div class="title">
            {{ props.title }}
        </div>
        <input type="password" :placeholder="props.placeholder" :value="props.modelValue"
            @input="emit('update:modelValue', $event.target.value)">
    </div>
    <div class="input-com" v-if="props.inpType === 'button'" :inpType="props.inpType">
        <input type="button" :value="props.value" @click="emit('btnClick')">
    </div>
</template>

<script lang="ts" setup>
type inputComProps = {
    title: string
    placeholder?: string
    inpType?: 'text' | 'button' | 'password'
    value?: string
    modelValue?: string
}


const props = withDefaults(defineProps<inputComProps>(), {
    title: () => {
        return "???"
    },
    placeholder: () => {
        return "请输入"
    },
    inpType: () => {
        return "text"
    },
    value: () => {
        return "button"
    },
    modelValue: () => {
        return ""
    }
})

const emit = defineEmits(['update:modelValue', 'btnClick'])

</script>
<style lang="scss">
$default-color: #3bb0f9;

.input-com {
    --color: #000;
    outline: solid 1px #eeeeee;
    padding: 5px 10px;
    margin: 5px 0px;
    display: flex;

    &:hover {
        outline: solid 1px $default-color;
    }

    &[inptype=button]:hover {
        background-color: $default-color;
        box-shadow: 3px 3px 5px $default-color;
        padding: 5px 10px;
        --color: #fff;
    }

    .title {
        font-size: 1rem;
        width: 5rem;
        text-align: left;
        cursor: pointer;
        margin: 0;
        padding: 0;
    }

    >input {
        width: 100%;
        border: none;
        background: none;

        &[type=button] {
            font-weight: bold;
            color: var(--color);
        }

        &:focus {
            outline: none;
        }
    }
}
</style>