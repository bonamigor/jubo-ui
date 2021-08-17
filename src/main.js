import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'animate.css'
import '@/assets/css/tailwind.css'
import '@/assets/css/fonts.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
