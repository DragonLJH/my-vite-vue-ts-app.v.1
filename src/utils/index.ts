// 随机颜色
export const randomColor = () => {
    return "#" + Math.random().toString(16).slice(2, 8)
}

// 对象返回值
export const ObjectPropertyValue = (obj: { [x: string]: any; }, str: string | number) => {
    return obj[str]
}

