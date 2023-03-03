<template>
    <div class="table-com">
        <div class="table-com-top">

        </div>
        <div class="table-com-main">
            <div class="left-right" v-if="Object.prototype.toString.call(props.tableDate) === '[object Object]'">
                <div v-for="(item, index)  in Object.keys(props.tableDate)" :key="index">
                    <div class="left">{{ alias ? alias[item] : item }}</div>
                    <div class="right">{{ ObjectPropertyValue(props.tableDate, item) }}</div>
                </div>
            </div>
            <div class="top-bottom" v-else>
                <div class="head">
                    <div v-for="(key, h)  in Object.values(props.alias) " :key="h">{{ key.label }}</div>
                </div>
                <div v-for="(item, index)  in props.tableDate " :key="index">
                    <div v-for="(value, f)  in Object.values(item)" :key="f">
                        {{ value }}
                    </div>
                </div>
            </div>

        </div>
        <div class="table-com-bottom" v-if="countShow()">
            <div class="table-com-bottom-top">
                count
            </div>
            <div class="table-com-bottom-msg">
                <div v-for="(key, h)  in Object.keys(props.alias) " :key="h">
                    <span v-if="ObjectPropertyValue(ObjectPropertyValue(props.alias, key), 'type')">
                        {{ countSun(key) }}
                    </span>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ObjectPropertyValue } from '@/utils/index';
type aliasProps = {
    [key: string]: { label: string, type?: boolean }
}


type tableObjProps = {
    [key: string]: string | number
}
type tableComProps = {
    count?: boolean
    tableDate?: Array<tableObjProps> | tableObjProps
    alias?: aliasProps
}


const props = withDefaults(defineProps<tableComProps>(), {
    tableDate: () => {
        return [{ name: "zs", age: 18, address: "广州", fraction: "569" }, { name: "ls", age: 19, address: "深圳", fraction: "609" }]
    },
    alias: () => {
        return {
            name: { label: "姓名" },
            age: { label: "年龄" },
            address: { label: "地址" },
            fraction: { label: "分数", type: true },
        }
    },
    count: () => {
        return true
    }
})

const countShow = () => {
    return (Object.prototype.toString.call(props.tableDate) === '[object Array]' ? true : false) && props.count ? true : false
}

const countSun = (flag: string) => {
    let list = [...props.tableDate as Array<tableObjProps>];
    let arr = list.map((item: tableObjProps) => {
        return item[flag]
    }).map(Number).reduce((a, b) => a + b)
    return arr
}

</script>
<style lang="scss">
$table-border-color: #909090;
$title-color: #B0B0B0;


.table-com {
    border: solid 1px $table-border-color;

    .table-com-top {
        display: none;
    }

    .table-com-main {
        // box-shadow: 5px 5px 5px #909090;

        .left-right {
            >div {
                display: flex;
                border: solid 1px $table-border-color;
                line-height: 40px;

                >div {
                    padding: 10px;
                }

                .left {
                    flex: 1;
                    border-right: solid 2px $table-border-color;
                    background-color: $title-color;
                    text-align: right;
                }

                .right {
                    flex: 2;
                }
            }
        }

        .top-bottom {
            .head {
                background-color: $title-color;
            }

            >div {
                border: solid 1px $table-border-color;
                display: flex;
                line-height: 30px;

                >div {
                    flex: 1;
                    border-right: solid 2px $table-border-color;
                    padding-left: 10px;

                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }
    }

    .table-com-bottom {
        border: solid 1px $table-border-color;

        >div {
            display: flex;

            >div {
                flex: 1;
                padding-left: 10px;
            }
        }

        .table-com-bottom-msg {}
    }
}
</style>