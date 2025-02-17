import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import blogRoutes from './blog';
import sessionRoutes from './session';
import { isAuthenticated } from '../utils/auth.js';
import PermissionDeniedView from '../views/PermissionDeniedView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  ...blogRoutes,
  ...sessionRoutes,
  {
    path: '/permission-denied',
    component: PermissionDeniedView,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/post-create' && !isAuthenticated()) {
    next('/permission-denied'); // Redirect to login page
  } else {
    next();
  }
});

export default router;
