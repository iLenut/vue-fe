<script setup>
import { useUserProfileStore } from '@/stores/userProfile';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';
import ConfirmEmailPopup from './ConfirmEmailPopup.vue';
import Notification from './Notification.vue'; // Import the Notification component

const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();
const router = useRouter();
const confirmPopupRef = ref(null); // Create a ref for the popup component
const notifications = ref([]); // Array to hold notifications

const logout = () => {
  userProfileStore.$reset();
  userProfileStore.logout();
  authStore.logout();
  router.push('/login');
};

const showNotification = (message, type) => {
  // Add notification to the array (type: success, error)
  notifications.value.push({ message, type });
  setTimeout(() => {
    notifications.value.shift(); // Remove the notification after 3 seconds
  }, 3000);
};

const confirmEmail = async () => {
  try {
    const backendApi = import.meta.env.VITE_BACKEND_API;
    const userProfile = localStorage.getItem('user_profile');
    const userEmail = userProfile ? JSON.parse(userProfile).email : '';

    if (!userEmail) {
      showNotification('User email not found.', 'error');
      return;
    }

    // Make a POST request to the backend API to send confirmation email
    await axios.post(`${backendApi}/api/send-confirmation-email`, {
      email: userEmail,
    });

    showNotification('A secret token has been sent to your email!', 'success');
    if (confirmPopupRef.value) {
      confirmPopupRef.value.showPopup(); // Trigger the popup to show
    }
  } catch (error) {
    console.error(error);
    showNotification('Something went wrong. Please try again later.', 'error');
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

    if (response.data.success) {
      showNotification('Email confirmed successfully!', 'success');
      userProfileStore.confirmed = true; // Mark the email as confirmed in the store
    } else {
      showNotification('Invalid token. Please try again.', 'error');
    }
  } catch (error) {
    console.error(error);
    showNotification('An error occurred while confirming your email.', 'error');
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

    <!-- Notifications list -->
    <div>
      <Notification
        v-for="(notification, index) in notifications"
        :key="index"
        :message="notification.message"
        :type="notification.type"
      />
    </div>
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
