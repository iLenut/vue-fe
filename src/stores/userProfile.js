import { defineStore } from 'pinia';

export const useUserProfileStore = defineStore('user_profile', {
  state: () => {
    return {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      confirmed: false,
    };
  },
  actions: {
    checkUser() {
      const storedProfile = JSON.parse(localStorage.getItem("user_profile"));
      if (storedProfile) {
        this.username = storedProfile.username;
        this.firstname = storedProfile.firstname;
        this.lastname = storedProfile.lastname;
        this.email = storedProfile.email;
        this.confirmed = storedProfile.confirmed;
      }
    },

    // Load user profile from localStorage when the store is created
    loadUserProfile() {
      const storedProfile = JSON.parse(localStorage.getItem('user_profile'));
      if (storedProfile) {
        this.username = storedProfile.username;
        this.firstname = storedProfile.firstname;
        this.lastname = storedProfile.lastname;
        this.email = storedProfile.email;
        this.confirmed = storedProfile.confirmed;
      }
    }, 

    // Update the 'confirmed' status
    updateConfirmed(newConfirmedStatus) {
      this.confirmed = newConfirmedStatus;
      this.saveUserProfile(); // Save to localStorage after update
    }, 

    // Update the email address
    updateEmail(newEmail) {
      this.email = newEmail;
      this.saveUserProfile(); // Save to localStorage after update
    }, 

    // Update the user profile fields
    updateProfile(username, firstname, lastname, email, confirmed) {
      this.username = username;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.confirmed = confirmed;
      this.saveUserProfile(); // Save to localStorage after update
    },

    // Save the user profile to localStorage
    saveUserProfile() {
      const userProfile = {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        confirmed: this.confirmed,
      };
      localStorage.setItem('user_profile', JSON.stringify(userProfile));
    },

    logout() {
      this.username = '';
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.confirmed = false;
      this.saveUserProfile();
      localStorage.removeItem('user_profile');
    },
  },

  // Load user profile from localStorage when the store is initialized
  persist: true,
});
