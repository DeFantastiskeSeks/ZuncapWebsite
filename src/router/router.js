import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/hudtypetest',
      name: 'hudtypetest',
      component: () => import('../views/HudtypeTestView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/useruv',
      name: 'useruv',
      component: () => import('../views/UserUVView.vue')
    },
    {
      path: '/:catchAll(.*)*',
      name: 'notFound', 
      redirect: '/' 
    }
  ]
})

export default router
