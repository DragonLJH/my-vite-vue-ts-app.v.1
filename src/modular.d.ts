declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}

declare module 'long-npm-vue' {
    const install: any;
    export default install
  }