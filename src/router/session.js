import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import PostCreateView from '../views/PostCreateView.vue';

const sessionRoutes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/post-create',
    component: PostCreateView,
  },
];

export default sessionRoutes;
