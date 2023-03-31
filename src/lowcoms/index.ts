import type { App } from 'vue';
import { HumpToHyphen } from '@/utils/index'
import type { canvasStyleProps } from '@/stores/index'

// 获取页面信息  
const pageInformationPath = import.meta.glob('./**/page.ts', {
    eager: true,
    import: "default"
})
// 获取页面路径
const indexInformationPath = import.meta.glob('./**/index.vue')

type lowDivValue = string

type metaProps = {
    title: string
    value: lowDivValue
    style: canvasStyleProps

}


export const pathsMsg = {} as { [k: string]: any }
export const paths = {} as { [k: string]: any }
export const lowPlugin = {
    install(app: App) {
        Object.entries(paths).forEach(([k, v]) => {
            v().then((result: any) => {
                app.component(k, result.default);
            })
        })
    }
}

Object.entries(pageInformationPath).forEach(([pagePath, meta]) => {
    const { title, value, style } = meta as metaProps
    const name = pagePath.replace("./", "").replace("/page.ts", "")
    const path = pagePath.replace("page.ts", "index.vue")
    pathsMsg[name] = { title, value, style }
    paths[name] = indexInformationPath[path]
})



