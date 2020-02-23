import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from '../views/HelloWorld.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'HelloWorld', TODO
    component: Home
  },
  {
    path: '/about',
    // name: 'About',
    // component: () => import('../views/About.vue') // TODO which import style is better?
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
