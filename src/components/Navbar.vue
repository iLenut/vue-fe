<script setup>
import { useUserProfileStore } from '@/stores/userProfile';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();
const router = useRouter();

const logout = () => {
  userProfileStore.$reset();
  userProfileStore.logout();
  authStore.logout();
  router.push('/login');
};

const confirmEmail = async () => {
  try {
    const backendApi = import.meta.env.VITE_BACKEND_API;
    const userProfile = localStorage.getItem('user_profile');
    const userEmail = userProfile.email;

    // Make a POST request to the backend API
    await axios.post(`${backendApi}/api/send-confirmation-email`, {
      email: userEmail,
    });

    alert('A confirmation email has been sent!');
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again later.');
  }
};
</script>

<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>

      <template v-if="!authStore.token">
        <!-- Show login/register if user is NOT logged in -->
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </template>

      <template v-else>
        <li><router-link to="/post-create">New Post</router-link></li>
        <!-- Show Logout if user IS logged in -->
        <li><button @click="logout">Logout</button></li>

        <!-- Show Confirm Email button if user IS logged in but NOT confirmed -->
        <li v-if="!userProfileStore.confirmed">
          <button @click="confirmEmail">Confirm Email</button>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  background: #333;
  padding: 5px;
  width: 100%; /* Full width */
  position: fixed; /* Stick to the top */
  top: 0; /* Align to the very top */
  left: 0; /* Ensure it starts from the left */
  z-index: 1000; /* Keep it above other elements */
}
ul {
  list-style: none;
}
li {
  display: inline;
  padding: 10px;
  background-color: #4d4d4d;
  margin: 0.5rem;
  border-radius: 3rem;
}
a,
button {
  padding: 0;
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}
li:hover {
  background-color: #666565;
}

a:hover {
  text-decoration: none;
  color: white;
}
</style>
