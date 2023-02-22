import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("../view/LoginView/index.vue"),
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../view/HomeView/index.vue"),
    }
]

const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router