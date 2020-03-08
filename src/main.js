import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsVue from 'highcharts-vue'

HighchartsMore(Highcharts)
Vue.use(HighchartsVue)

Vue.config.productionTip = false

Vue.component('my-map', require('./components/MyMap'))
// Vue.component('merch-info', require('./components/MerchantInfo'))
Vue.component('merch-list', require('./components/MerchantList'))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
