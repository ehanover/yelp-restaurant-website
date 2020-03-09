import Vue from 'vue'
import VueRouter from 'vue-router'

import Search from '../views/Search.vue'
import Recommendation from '../views/Recommendation.vue'
import Specials from '../views/Specials.vue'
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
    path: '/specials',
    component: Specials,
    name: 'Specials'
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

// changes the window title based on the name of the active route
const PAGE_TITLE = {
  Search: 'Restaurant Search',
  Recommendation: 'Restaurant Recommendations',
  MerchantInfo: 'Merchant Info',
  Specials: 'Special Restaurant Deals',
  About: 'About'
}
router.afterEach((toRoute, fromRoute) => {
  window.document.title = PAGE_TITLE[toRoute.name]
})

export default router
