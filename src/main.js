import { createApp } from 'vue'
import Toast, { POSITION } from 'vue-toastification'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTheMask from 'vue-the-mask'
import 'animate.css'
import '@/assets/css/tailwind.css'
import '@/assets/css/fonts.css'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueTheMask)
app.use(Toast, { position: POSITION.BOTTOM_RIGHT })
app.mount('#app')
