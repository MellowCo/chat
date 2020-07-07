import Vue from 'vue'
import App from './App'

// ui
import uView from 'uview-ui'

// http
import httpInterceptor from './utils/request/interceptor'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
Vue.use(uView)
Vue.use(httpInterceptor, app)

export { app }
