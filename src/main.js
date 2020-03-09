import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsVue from 'highcharts-vue'

HighchartsMore(Highcharts) // highchartsmore is needed for the packedbubble chart
Vue.use(HighchartsVue)

Vue.config.productionTip = false

// html elements separate vue component files
Vue.component('my-router-header', require('./components/MyRouterHeader'))
Vue.component('my-map', require('./components/MyMap'))
Vue.component('merch-list', require('./components/MerchantList'))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
