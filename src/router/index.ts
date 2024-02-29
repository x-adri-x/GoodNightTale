import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/init',
      name: 'init',
      component: () => import('../views/InitView/InitView.vue')
    },
    {
      path: '/content',
      name: 'content',
      component: () => import('../views/ContentView/ContentView.vue')
    },
    { path: '/:catchAll(.*)', name: 'NotFound', component: () => import('../views/404Page.vue') }
  ]
})

export default router
