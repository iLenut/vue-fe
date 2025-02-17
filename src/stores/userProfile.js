import { defineStore } from "pinia";

export const useUserProfileStore = defineStore("userProfile", {
  state: () => {
    return {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      confirmed: false,
    };
  },
  actions: {
    updateConfirmed(newName) {
      this.name = newName;
    },
    updateEmail(newEmail) {
      this.email = newEmail;
    },
    updateAge(newAge) {
      this.age = newAge;
    },
    updateProfile(username, firstname, lastname, email, confirmed) {
      this.username = username;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.confirmed = confirmed;
    },
  },
});
