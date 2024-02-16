import api from '@/api.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    component: () => import('../views/Profile.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  const protectedRoutes = ["/profile"]
  protectedRoutes.forEach(path => {
    if (to.path === path) {
      if (!store.getters.token)
        next('/login')

      api.get('/users/profile').then(response => {
        if (response.data.error)
          next('/login')

        next()
      })
    }
  });
  next()
})

export default router
