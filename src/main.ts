import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './registerServiceWorker'
import Rippuru from 'rippuru'
import Message from '@/components/message/index'

Vue.config.productionTip = false
Vue.prototype.$message = Message

Vue.use(MuseUI)
Vue.use(Rippuru)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
