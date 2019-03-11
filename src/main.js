import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
import axios from 'axios'
import md5 from 'js-md5'

Vue.use(iView);
axios.defaults.withCredentials = true
Vue.prototype.$echarts=echarts
Vue.prototype.$http=axios
Vue.prototype.$md5=md5
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
