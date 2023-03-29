// 随机颜色
export const randomColor = () => {
    return "#" + Math.random().toString(16).slice(2, 8)
}

// 对象返回值
export const ObjectPropertyValue = (obj: { [x: string]: any; }, str: string | number) => {
    return obj[str]
}

// 固定对象属性得值添加 px 
export const toPx = (obj: { [k: string]: string | number }) => {
    Object.entries(obj).forEach(([k, v]) => {
        if (Object.prototype.toString.call(v) == '[object Number]') obj[k] += "px"
    })
    return obj
}

//驼峰转连体 
export const HumpToHyphen = (data: string) => {
    return data.replace(/([A-Z])/g, "-$1").toLowerCase().split("-").filter(item => item).join("-");
}




