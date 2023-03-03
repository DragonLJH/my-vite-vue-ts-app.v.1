<template>
    <div class="login-view">
        <div class="login-view-top">
            <div class="logo">logo</div>
        </div>
        <div class="login-view-mian">
            <TabsCom :tabs="tabs" top-type="flex" :width="500">
                <template #path1>
                    <div class="login">
                        <InputCom placeholder="请输入账号" title="账号" v-model="loginObj.account" />
                        <InputCom placeholder="请输入密码" title="密码" v-model="loginObj.password" inp-type="password" />
                        <InputCom value="登录" inp-type="button" @btnClick="login" />
                        <InputCom value="重置" inp-type="button" @btnClick="reset('login')" />
                    </div>
                </template>
                <template #path2>
                    <div class="register">
                        <InputCom placeholder="请输入账号" title="账号" v-model="registerObj.account" />
                        <InputCom placeholder="请输入密码" title="密码" v-model="registerObj.password" inp-type="password" />
                        <InputCom placeholder="请输入密码" title="确认密码" v-model="registerObj.confirmPassword"
                            inp-type="password" />
                        <InputCom value="注册" inp-type="button" @btnClick="register" />
                        <InputCom value="重置" inp-type="button" @btnClick="reset('register')" />
                    </div>
                </template>
            </TabsCom>
        </div>

        <div class="login-view-bottom">
            login-view-bottom
        </div>
    </div>
</template>

<script lang="ts" setup>
import TabsCom from "@/components/TabsCom/index.vue"
import InputCom from "@/components/InputCom/index.vue"
import { reactive } from "vue";

import { useRouter } from "vue-router"

const router = useRouter()

let tabs = reactive([{ name: "登录", path: "path1" }, { name: "注册", path: "path2" }]);
let loginObj = reactive({
    account: "",
    password: ""
})
let registerObj = reactive({
    account: "",
    password: "",
    confirmPassword: "",
})

const login = () => {
    router.push("/HomeView")
}
const register = () => {
    console.log("register", registerObj)
}

const reset = (flag: string) => {
    if (flag === "login") {
        loginObj.account = ""
        loginObj.password = ""

    }
    if (flag === "register") {
        registerObj.account = ""
        registerObj.password = ""
        registerObj.confirmPassword = ""
    }
}


</script>

<style lang="scss" scoped>
.login-view {
    height: 100%;
    box-shadow: 0px 0px 10px #ccc;

    >div {
        display: flex;
        align-items: center;
        box-shadow: 0px 0px 5px #ccc;
    }

    .login-view-top {
        height: 80px;

        .logo {
            width: 100px;
            height: 50px;
            box-shadow: 0px 0px 10px #ccc;
        }

    }

    .login-view-mian {
        height: calc(100% - 160px);

        .login {
            padding: 10px 20px;
        }

        .register {
            padding: 10px 20px;

        }
    }

    .login-view-bottom {
        height: 80px;
    }
}
</style>
