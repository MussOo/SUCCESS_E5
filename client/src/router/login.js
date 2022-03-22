import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
