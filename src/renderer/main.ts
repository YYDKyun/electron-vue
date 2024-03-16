import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import initSVGIcon from './assets/icons/index.ts'

const pinia = createPinia()
const app = createApp(App)

//vue-router
app.use(router)
//Element ui
app.use(ElementPlus)
//状态管理
app.use(pinia)
app.use(initSVGIcon)
//element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//
// const req = require.context('./icons/svg', false, /\.svg$/)
// const requireAll = (requireContext) => requireContext.keys().map(requireContext)
// requireAll(req)

app.mount('#app')
