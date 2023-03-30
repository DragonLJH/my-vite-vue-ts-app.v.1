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
    const newObj = { ...obj }
    Object.entries(newObj).forEach(([k, v]) => {
        if (Object.prototype.toString.call(v) == '[object Number]') newObj[k] += "px"
    })
    return newObj
}

//驼峰转连体 
export const HumpToHyphen = (data: string) => {
    return data.replace(/([A-Z])/g, "-$1").toLowerCase().split("-").filter(item => item).join("-");
}




