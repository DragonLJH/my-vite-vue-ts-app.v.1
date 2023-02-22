<template>
    <div class="tabs-com" :style="tabsComStyle">
        <div class="tabs-com-top">
            <div v-for="(item, index) in tabs" :type="topType" :key="index"
                :class="`item ${thisActive === item.path ? 'active' : ''}`" @click="tabClick(item.path)">
                {{ item.name }}
            </div>
        </div>
        <div class="tabs-com-main" >
            <div v-for="(item, index) in tabs" :key="index">
                <slot :name="thisActive === item.path ? item.path : ''"></slot>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';

type tabProps = {
    name: string
    path: string
}
type tabsProps = {
    tabs: Array<tabProps>
    active?: string
    width?: number
    height?: number
    topHeight?: number
    topType?: "default" | "flex"

}

// withDefaults定义默认值
const props = withDefaults(defineProps<tabsProps>(), {
    tabs: () => {
        return []
    },
    active: () => {
        return ""
    },
    width: () => {
        return 300
    },
    height: () => {
        return 300
    },
    topHeight: () => {
        return 30
    },
    topType: () => {
        return "default"
    }
})

let thisActive = ref<string>(props.active === "" ? props.tabs[0].path : props.active)

const tabClick = (data: string) => {
    thisActive.value = data
}


const tabsComStyle = {
    "--width": props.width + "px",
    "--height": props.height + "px",
    "--topHeight": props.topHeight + "px",

}


</script>

<style lang="scss" scoped>
.tabs-com {
    width: var(--width);
    height: var(--height);
    box-shadow: 0px 0px 10px #ccc;
    position: relative;

    .tabs-com-top {
        height: var(--topHeight);
        display: flex;
        border-bottom: solid 1px #ccc;

        .item {
            width: 4rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            text-align: center;

            &[type=flex] {
                flex: 1;
            }

            &.active {
                box-shadow: 0px 0px 3px #ccc;
                border-bottom: solid 2px #3bb0f9;
            }

        }
    }

    .tabs-com-main {
        width: 100%;
        height: calc(100% - var(--topHeight));
        // display: flex;
        // justify-content: center;
        // align-items: center;
    }
}
</style>