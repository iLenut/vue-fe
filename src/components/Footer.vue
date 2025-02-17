<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer>
    <p>&copy; {{ currentYear }} LenBlog</p>
  </footer>
</template>

<style>
footer {
  margin-top: auto;
  padding: 10px;
  text-align: center;
}
</style>
