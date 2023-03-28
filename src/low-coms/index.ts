

// 获取页面信息  
const pageInformationPath = import.meta.glob('./**/page.ts', {
    eager: true,
    import: "default"
})
// 获取页面路径
const indexInformationPath = import.meta.glob('./**/index.vue')

type metaProps = {
    title: string
}

export const pathsMsg = {} as { [k: string]: string }
export const paths = {} as { [k: string]: any }

Object.entries(pageInformationPath).forEach(([pagePath, meta]) => {
    const { title } = meta as metaProps
    const name = pagePath.replace("./", "").replace("/page.ts", "")
    const path = pagePath.replace("page.ts", "index.vue")
    pathsMsg[name] = title
    paths[name] = indexInformationPath[path]
})
