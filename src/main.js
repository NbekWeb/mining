import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './assets/css/style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
})

app.use(pinia)
app.use(Antd)
app.use(router)
app.mount('#app')
