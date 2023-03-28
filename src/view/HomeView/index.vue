<template>
    <div class="home-view">
        <div class="top"></div>
        <div class="mian">
            <div class="column">
                <ColumnCom show :column-data="homeRoute.children"></ColumnCom>
            </div>
            <div class="content">
                <div class="content-top">

                </div>
                <div class="content-main">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ColumnCom from "@/components/ColumnCom/index.vue"
import { routes } from "@/router";
import { reactive } from "vue";
// import { } from "vue"; 
// const route = useRoute()

let homeRoute: any = undefined;
for (let i = routes.length - 1; i >= 0; i--)
    if (routes[i].path === "/HomeView") homeRoute = reactive(routes[i])
console.log("homeRoute", homeRoute)
</script>

<style lang="scss" scoped>
.home-view {
    width: 100%;
    height: 100%;
    background-color: #eee;
    overflow: hidden;
    position: relative;

    >div {
        background-color: #fff;
        margin: 5px 10px;
        box-shadow: 0px 0px 10px #ccc;
    }

    .top {
        height: 50px;
    }

    .mian {
        height: calc(100% - 70px);
        display: flex;

        >div {
            height: 100%;
        }

        .column {
            width: auto;
            background-color: #eee;
            box-shadow: 0px 0px 5px #fff;
        }

        .content {
            flex: 1;
            height: 100%;
            margin: 0px 0px 0px 10px;
            background-color: #f6f6f6;

            .content-top {
                height: 30px;
                background-color: #fff;
            }
            .content-main{
                height: calc(100% - 30px);
            }
        }
    }
}
</style>
