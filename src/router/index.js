import Vue from 'vue'
import VueRouter from 'vue-router'

import Search from '../views/Search.vue'
import Recommendation from '../views/Recommendation.vue'
import About from '../views/About.vue'
import MerchantInfo from '../views/MerchantInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/search'
  },
  {
    path: '/search',
    component: Search,
    name: 'Search'
  },
  {
    path: '/recommendation',
    component: Recommendation,
    name: 'Recommendation'
  },
  {
    path: '/about',
    component: About,
    name: 'About'
  },
  {
    path: '/merchant',
    component: MerchantInfo,
    name: 'MerchantInfo',
    props: true
  }
]

const router = new VueRouter({
  routes
})

const PAGE_TITLE = {
  Search: 'Restaurant Search',
  Recommendation: 'Restaurant Recommendations',
  About: 'About',
  MerchantInfo: 'Merchant Info'
}
router.afterEach((toRoute, fromRoute) => {
  window.document.title = PAGE_TITLE[toRoute.name]
})

export default router
