import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router'

const Share = {
  template: '<div>User</div>'
}

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
      path: '/file',
      name: 'file',
      component: () => import('@/views/FileView.vue'),
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
    {
      path: '/share/:shareId',
      name: 'share',
      component: () => import('@/views/ShareView.vue'),
      props: true,
    },
    {
      path: '/allshare',
      name: 'allshare',
      component: () => import('@/views/ShareListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import('@/views/ShareRankView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/manage/user',
      name: 'usermanage',
      component: () => import('@/views/UserManageView.vue'),
      meta: { requiresAuth: true, requireAdmin: true },
    },
    {
      path: '/manage/share',
      name: 'sharemanage',
      component: () => import('@/views/ShareManageView.vue'),
      meta: { requiresAuth: true, requireAdmin: true },
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = useUserStore().token
  const state = useUserStore().status
  if (to.matched.length === 0) {
    next('/404')
  }
  if (to.meta.requireAdmin && state != "common_admin" && state != "super_admin") {
    next('/'); // 跳转到根界面
  } else if (to.meta.requiresAuth && token === '') {
    next('/login'); // 跳转到登录页面
  }
  else {
    next(); // 继续导航
  }
})

export default router
