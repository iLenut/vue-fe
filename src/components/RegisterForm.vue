<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserProfileStore } from '@/stores/userProfile';
import { useRouter } from 'vue-router';

const username = ref('');
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const updateUserProfile = () => {
  const userProfile = useUserProfileStore();

  userProfile.updateProfile(
    username.value,
    firstname.value,
    lastname.value,
    email.value,
    false,
  );
};

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const backendApi = import.meta.env.VITE_BACKEND_API;
    // Make a POST request to the backend API
    await axios.post(`${backendApi}/api/register`, {
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    });

    updateUserProfile;

    alert('Registration successful! Please check your email for confirmation');
    router.push('/');
  } catch (error) {
    // Handle error response
    console.error(error);
    alert('Registration failed. Please try again.');
  }
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="firstname">First Name:</label>
        <input v-model="firstname" type="text" id="firstname" required />
      </div>
      <div>
        <label for="lastname">Last Name:</label>
        <input v-model="lastname" type="text" id="lastname" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          required
        />
      </div>
      <button type="submit">Register</button>
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
