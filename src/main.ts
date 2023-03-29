import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import { showMsg } from '@/utils/message'
import { lowPlugin } from '@/lowcoms/index'

const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$showMsg = showMsg
app.use(router).use(pinia).use(lowPlugin).mount('#app')