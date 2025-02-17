<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="page-wrapper">
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style scoped>
.page-wrapper {
  width: 100%; /* Ensure it spans the full width of the viewport */
  min-height: 100vh; /* Full viewport height */
  display: flex;
  flex-direction: column;
  margin: 0; /* Remove any margin */
  padding: 0; /* Remove any padding */
}
</style>
