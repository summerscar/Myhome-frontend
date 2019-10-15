import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './registerServiceWorker'
import Rippuru from 'rippuru'
import Message from '@/components/message/index'
import lodash from 'lodash'

Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype['$_'] = lodash
Vue.use(MuseUI)
Vue.use(Rippuru)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
