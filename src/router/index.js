import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import MerchantInfo from '../views/MerchantInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
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
  Home: 'Yelp Restaurant Search',
  About: 'About',
  MerchantInfo: 'Merchant Info'
}
router.afterEach((toRoute, fromRoute) => {
  window.document.title = PAGE_TITLE[toRoute.name]
})

export default router
