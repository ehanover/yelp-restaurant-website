import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'

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
  }
]

const router = new VueRouter({
  routes
})

const PAGE_TITLE = {
  Home: 'Yelp Restaurant Search',
  About: 'About'
}
router.afterEach((toRoute, fromRoute) => {
  window.document.title = PAGE_TITLE[toRoute.name]
})

export default router
