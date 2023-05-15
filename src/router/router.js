import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
      path: '/userUV',
      name: 'userUV',
      component: () => import('../views/UserUVView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound', 
      redirect: '/' 
    }
  ]
})

export default router
