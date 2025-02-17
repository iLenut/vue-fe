<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserProfileStore } from '@/stores/userProfile';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const router = useRouter();

const updateUserProfile = (user) => {
  const userProfile = useUserProfileStore();

  userProfile.updateProfile(
    user.username,
    user.firstname,
    user.lastname,
    user.email,
    user.confirmed,
  );
};

const handleLogin = async () => {
  try {
    const backendApi = import.meta.env.VITE_BACKEND_API;

    // Make a POST request to the backend API
    const response = await axios.post(`${backendApi}/api/login`, {
      email: email.value,
      password: password.value,
    });

    const token = response.data.token;
    const authStore = useAuthStore();
    authStore.login(token);

    const user = await axios.post(`${backendApi}/api/user`, {
      email: email.value,
    });

    if (user) {
      updateUserProfile(user.data.user);
    }
    alert('Login successful!');
    router.push('/');
  } catch (error) {
    // Handle error response
    console.error(error);
    alert('Login failed. Please try again.');
  }
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1b1c1c;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

form {
  text-align: right;
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
  font-weight: bold;
}

input {
  color: #1b1c1c;
  background-color: #d9d9d9;
  margin-top: 5px;
  padding: 10px;
  font-size: 14px;
  border-radius: 2rem;
  border: 1px solid #ccc;
  margin: 0.5rem;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
