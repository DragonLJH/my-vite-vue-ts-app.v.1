import { createApp, h } from "vue";

const Message = {
    props: {
        msg: { type: String }
    },
    render(ctx: any) {
        const { $props, $emit } = ctx
        const commonStyle = { width: "calc(100% - 20px)", margin: "0px 0px 5px 0px", padding: "0px 10px", boxShadow: "0px 0px 10px #ccc" }
        const itemStyle = { width: "300px", height: "200px", backgroundColor: "#fff" }
        const headStyle = { height: "40px", lineHeight: "40px" }
        const msgStyle = { height: "100px", display: "flex", justifyContent: "center", alignItem: "center" }
        const footerStyle = { height: "40px", display: "flex", justifyContent: "center", alignItem: "center" }
        return h("div", { class: "message-com-item", style: itemStyle },
            [
                h("div", { class: "head", style: { ...commonStyle, ...headStyle } }, "提示"),
                h("div", { class: "msg", style: msgStyle }, $props.msg),
                h("div", { class: "footer", style: footerStyle }, [
                    h("button", { class: "close", onClick: () => $emit("close") }, "close")
                ]),
            ])
    }
}

export function showMsg(msg: string, onClick: Function) {
    const div = document.createElement("div")
    document.body.appendChild(div)
    div.setAttribute("class", "message-com")
    div.setAttribute("style", "display: flex;justify-content: center;align-items: center;position: fixed;top:0;left:0;width: 100%; height: 100%;background-color: rgba(0, 0, 0, 0.5);")

    const app = createApp(Message, {
        msg: msg,
        // 驼峰 onClose == @close
        onClose: () => {
            // 将关闭弹窗的方法 返回
            onClick(() => {
                app.unmount()
                div.remove()
            })
        }

    })
    app.mount(div)
}