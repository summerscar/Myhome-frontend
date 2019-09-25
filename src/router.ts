import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import { loadTokens, loadHassUrl, connectToHASS } from '@/utils/homeassistant'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login

    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.connected && loadTokens() && loadHassUrl()) {
    connectToHASS(loadHassUrl()).then(() => {
      next()
    }).catch(() => {
      next('/login')
    })
  } else if (!store.state.connected && to.name !== 'login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
export default router
