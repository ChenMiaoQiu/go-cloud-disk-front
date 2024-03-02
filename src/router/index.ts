import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = useUserStore().token
  if (to.meta.requiresAuth && token === '') {
    next('/login'); // 跳转到登录页面
  } else {
    next(); // 继续导航
  }
})

export default router
