import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { showMsg } from '@/utils/message'

const app = createApp(App)
app.config.globalProperties.$showMsg = showMsg
app.use(router).mount('#app')