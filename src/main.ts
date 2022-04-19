import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import 'animate.css';
// import router from './router'
// import { createPinia } from 'pinia'
// 创建vue实例
const app = createApp(App)
// 挂载pinia
app.use(store)
// app.use(createPinia())
//挂载router
// app.use(router)
// 挂载实例
app.mount('#app');