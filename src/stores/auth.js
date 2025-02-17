import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: null,
  }),
  actions: {
    // Check authentication state on app load
    checkAuth() {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      }
    },
    login(token) {
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem('auth_token', token); // Store token in localStorage
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('auth_token'); // Remove token on logout
    },
  },
});
