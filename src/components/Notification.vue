<template>
  <div :class="['notification', type, { visible: true }]">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: String,
  type: String, // success or error
});
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.notification.success {
  background-color: green;
}

.notification.error {
  background-color: red;
}

.notification.visible {
  opacity: 1;
}
</style>
