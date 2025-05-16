import './index.css'
import 'iconify-icon'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin } from '@formkit/vue'
import { createHead } from '@vueuse/head'
import config from '../formkit.config'
import App from './App.vue'
import router from './router'

const head = createHead()
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(head)
app.use(plugin , config)

app.mount('#app')
