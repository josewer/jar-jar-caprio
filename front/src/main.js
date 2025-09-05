import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import Vue3Toastify from "vue3-toastify";

const pinia = createPinia()

const toastDefaultConfig = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: true,
    theme: 'dark'
}


createApp(App)
    .use(Vue3Toastify , toastDefaultConfig)
    .use(pinia)
    .use(router)
    .mount('#app')
