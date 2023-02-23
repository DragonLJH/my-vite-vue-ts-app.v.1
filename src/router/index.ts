import { createRouter, createWebHashHistory } from "vue-router"






export const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../view/LoginView/index.vue"),
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../view/HomeView/index.vue"),
        children: [
            {
                path: "/home/test1",
                name: "test1",
                component: () => import("../view/Home1/index.vue"),
            }, {
                path: "/home/test2",
                name: "test2",
                component: () => import("../view/Home2/index.vue"),
            }, {
                path: "/home/test3",
                name: "test3",
                component: () => import("../view/Home3/index.vue"),
                children: [
                    {
                        path: "/home/test3/test4",
                        name: "test4",
                        component: () => import("../view/Home4/index.vue"),
                    }, {
                        path: "/home/test3/test5",
                        name: "test5",
                        component: () => import("../view/Home5/index.vue"),
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
router.beforeEach((to, from) => {
    if (to.path === "/") { return { name: 'login' } }
})

export default router