<script setup>
import { useUserProfileStore } from '@/stores/userProfile';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';
import ConfirmEmailPopup from './ConfirmEmailPopup.vue';

const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();
const router = useRouter();
const confirmPopupRef = ref(null); // Create a ref for the popup component

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
    const userEmail = userProfile ? JSON.parse(userProfile).email : '';

    if (!userEmail) {
      alert('User email not found.');
      return;
    }

    // Make a POST request to the backend API to send confirmation email
    await axios.post(`${backendApi}/api/send-confirmation-email`, {
      email: userEmail,
    });

    alert('A secret token has been sent on email!');
    if (confirmPopupRef.value) {
      confirmPopupRef.value.showPopup(); // Trigger the popup to show
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again later.');
  }
};

// Handle the email confirmation process after user inputs the token
const handleConfirmEmail = async (token) => {
  try {
    const backendApi = import.meta.env.VITE_BACKEND_API;

    // Make the POST request to confirm the email with the token
    const response = await axios.post(`${backendApi}/api/confirm-email`, {
      token,
    });

    // Check the response for success
    if (response.data.success) {
      alert(response.data.message); // Display success message
      userProfileStore.confirmed = true; // Mark the email as confirmed in the store
    } else {
      alert(response.data.message); // Display error message
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while confirming your email.');
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

        <!-- The Confirm Email Popup -->
        <ConfirmEmailPopup
          ref="confirmPopupRef"
          @confirm-email="handleConfirmEmail"
        />
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
