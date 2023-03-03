
import { createRouter, createWebHashHistory } from "vue-router"

// 获取页面信息 meta 
const pageInformationPath = import.meta.glob('../view/**/page.ts', {
    eager: true,
    import: "default"
})

// 获取页面路径
const indexInformationPath = import.meta.glob('../view/**/index.vue')

// 
let newRoutes = new Map()
// 生成路由
// reverse 路径翻转 从根路径一级往下
// entries 获取key和value ， pagePath：页面路径、 meta：页面信息
Object.entries(pageInformationPath).reverse().forEach(([pagePath, meta]) => {
    // 路由 path 
    const path = pagePath.replace("../view", "").replace("/page.ts", "")
    const pathSplit = path.split("/").filter(Boolean)
    const flag = pathSplit.length - 1
    // name 取文件名
    const name = pathSplit.slice(flag).join("")
    const importPath = pagePath.replace("page.ts", "index.vue")
    const result = {
        path,
        name,
        component: indexInformationPath[importPath],
        meta
    }
    newRoutes.set(name, result)
    if (flag) {
        const parents = pathSplit.slice(flag - 1)[0]
        let parentsRoute = newRoutes.get(parents)
        if (!parentsRoute?.children) {
            parentsRoute["children"] = [result]
        } else {
            parentsRoute["children"].push(result)
        }
    }

})
// 只获取 /XXX 路径的路由
export const routes = [...newRoutes.values()].filter((item) => {
    return item.path.split("/").length === 2
})
console.log("routes", routes)
// export const routes = [
//     {
//         path: "/login",
//         name: "login",
//         component: () => import("../view/LoginView/index.vue"),
//     },
//     {
//         path: "/home",
//         name: "home",
//         component: () => import("../view/HomeView/index.vue"),
//         children: [
//             {
//                 path: "/home/tableView",
//                 name: "TableView",
//                 component: () => import("../view/HomeView/TableView/index.vue"),
//             }, {
//                 path: "/home/test1",
//                 name: "test1",
//                 component: () => import("../view/HomeView/Home1/index.vue"),
//             }, {
//                 path: "/home/test2",
//                 name: "test2",
//                 component: () => import("../view/HomeView/Home2/index.vue"),
//             }, {
//                 path: "/home/test3",
//                 name: "test3",
//                 component: () => import("../view/HomeView/Home3/index.vue"),
//                 children: [
//                     {
//                         path: "/home/test3/test4",
//                         name: "test4",
//                         component: () => import("../view/HomeView/Home3/Home4/index.vue"),
//                     }, {
//                         path: "/home/test3/test5",
//                         name: "test5",
//                         component: () => import("../view/HomeView/Home3/Home5/index.vue"),
//                     }
//                 ]
//             }
//         ]
//     }
// ]

const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
router.beforeEach((to, from) => {
    if (to.path === "/") { return { name: 'LoginView' } }
})

export default router