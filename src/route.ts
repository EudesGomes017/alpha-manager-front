import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('./pages/Index.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('./pages/Dashboard.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./pages/NotFound.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
