import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { useAuthStore } from './stores/auth';
import { useUserProfileStore } from './stores/userProfile';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');

const authStore = useAuthStore();
authStore.checkAuth();

const userProfile = useUserProfileStore();
userProfile.checkUser();
