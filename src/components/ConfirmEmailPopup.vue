<template>
  <div class="popup-overlay" v-if="isVisible">
    <div class="popup">
      <h3>Confirm Your Email</h3>
      <input
        type="text"
        v-model="token"
        placeholder="Enter confirmation token"
      />
      <div class="popup-actions">
        <button :class="cancel" @click="cancel">Cancel</button>
        <button :class="confirmClass" @click="confirm">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: '',
      isVisible: false,
      cancel: 'cancel',
      confirmClass: 'confirmClass',
    };
  },
  methods: {
    // Show the popup
    showPopup() {
      this.isVisible = true;
    },
    // Hide the popup
    hidePopup() {
      this.isVisible = false;
    },
    // Handle the confirmation
    confirm() {
      if (this.token.trim() === '') {
        alert('Please enter a token!');
        return;
      }
      this.$emit('confirm-email', this.token); // Emit event to parent with the token
      this.hidePopup(); // Hide the popup after confirmation
    },
    // Handle cancellation
    cancel() {
      this.hidePopup(); // Just close the popup
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

input {
  border-radius: 12px;
  padding: 1rem;
}

.popup-actions {
  margin-top: 10px;
}

.popup-actions button {
  margin: 5px;
}

.cancel {
  background-color: #d11a2a;
}

.confirmClass {
  background-color: #04aa6d;
}
</style>
