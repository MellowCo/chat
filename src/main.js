import Vue from 'vue'
import App from './App'

// ui
import uView from 'uview-ui'

// filiters
import * as filters from './utils/filter/index'
Vue.filter('timeToNow', function (time) {
  return filters.timeToNow(time)
})

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
Vue.use(uView)
