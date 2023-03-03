<template>
    <div class="message-com" v-if="props.show">
        <div class="message-com-item">
            <div class="message-com-item-top">

            </div>
            <div class="message-com-item-main">
                message-com
            </div>
            <div class="message-com-item-bottom">
                <button @click="emit('asd', false)">asd</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
type messageProps = {
    show?: boolean
}

const props = withDefaults(defineProps<messageProps>(), {

})

const emit = defineEmits(["asd"])

</script>

<style lang="scss" scoped>
.message-com {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    .message-com-item {
        width: 200px;
        height: 200px;
        background-color: #fff;

        >div {
            width: 100%;
            display: flex;
            justify-content: center;

        }

        .message-com-item-top {
            height: 50px;
        }

        .message-com-item-main {
            height: 100px;
        }

        .message-com-item-bottom {
            height: 50px;
        }

    }
}
</style>