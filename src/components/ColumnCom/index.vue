<template>
    <div class="column-com" :style="columnComStyle">
        <div class="column-com-top" v-if="props.show">
            <div :class="`top-icon ${iconState ? 'show' : ''}`" @click="topIconClick">

            </div>
        </div>
        <div class="column-com-main">
            <div :class="`item ${item.children ? 'children' : ''} `" v-for="(item, index) in props.columnData" :key="index"
                @click.stop="() => item.children ?? toPath(item.path)">
                <div v-if="iconState">
                    <div v-if="item.children" :class="`children-icon ${childrenObj[item.path] ? 'active' : ''}`"
                        @click.stop="() => childrenIconClick(item.path)">
                    </div>
                    <div class="item-name">
                        <div>{{ item.name }}</div>
                        <div v-if="item.children && childrenObj[item.path]">
                            <Column :column-data="item.children" />
                        </div>
                    </div>
                </div>

                <div class="item-icon" v-if="!iconState">
                    <div>{{ item.icon ? item.icon : item.name }}</div>
                </div>

                <div class="item-msg" v-if="!iconState">
                    <div>{{ item.name }}</div>
                    <div v-if="item.children">
                        <Column :column-data="item.children" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import Column from './index.vue'

import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

type columnComItemProps = {
    name: string
    icon: string
    path: string
    children?: Array<columnComItemProps>
}
type columnComProps = {
    show?: boolean
    columnData: Array<columnComItemProps>
}

// 路由
const router = useRouter()

// 控制路由跳转
const toPath = (path: string) => {
    console.log("toPath", path)
    router.push(path)
}

// withDefaults 给props赋值（默认值）
// defineProps 接受父组件的值
const props = withDefaults(defineProps<columnComProps>(), {
    columnData: () => {
        const list = new Array(10).fill(null).map((_: null, index: number) => {
            const obj: columnComItemProps = { name: "name" + index, icon: "icon" + index, path: "path" + index, }
            if (index % 2) {
                obj.children = [
                    { name: "name-children" + index, icon: "icon-children" + index, path: "path-children" + index, }
                ]
            }
            return obj
        })
        return list
    }
})


// 菜单栏放大缩小的icon（按钮）
const iconState = ref(true)

// 菜单栏 子元素对象
// 控制 子元素对象的显示隐藏
const childrenObj = reactive<any>({})

// --height 控制 菜单栏是否可以放大缩小
// --width 控制  菜单栏放大缩小 
const columnComStyle = reactive<any>({
    "--height": (props.show ? "40px" : "0px"),
    "--width": (iconState ? "200px" : "auto")
})

props.columnData.forEach((item: columnComItemProps) => {
    if (item.children) {
        console.log(item.children)
        childrenObj[item.path] = false
    }
})


// 控制菜单栏放大缩小 以及 icon的变化
const topIconClick = () => {
    if (iconState.value) {
        columnComStyle["--width"] = "auto"
    } else {
        columnComStyle["--width"] = "200px"
    }
    iconState.value = !iconState.value

}

// 控制 子元素对象的显示隐藏 以及 icon的变化
const childrenIconClick = (path: string, flag: boolean = false) => {
    if (flag) {
        Object.keys(childrenObj).forEach((item: string) => {
            childrenObj[item] = false
        })
    }
    childrenObj[path] = !childrenObj[path]
    console.log(childrenObj)
}


</script>


<style lang="scss" scoped>
@import "./index.scss"
</style>