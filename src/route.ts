import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('./App.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('./App.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./App.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
