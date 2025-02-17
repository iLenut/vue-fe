<template>
  <div class="permission-denied">
    <h1>Permission Denied</h1>
    <p>You do not have permission to access this page.</p>
    <router-link to="/login">Go to Login</router-link>
  </div>
</template>

<script>
export default {
  name: "PermissionDeniedView",
};
</script>

<style scoped>
.permission-denied {
  text-align: center;
  margin-top: 50px;
}
</style>
