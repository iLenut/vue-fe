<template>
  <div class="post-create-view">
    <header class="header">
      <h1>Create a New Post</h1>
    </header>

    <div class="content">
      <!-- Sidebar (optional) -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/posts">All Posts</router-link></li>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
            <li><router-link to="/profile">Profile</router-link></li>
          </ul>
        </div>
      </aside>

      <!-- Main Post Creation Form -->
      <main class="main-content">
        <PostForm />
        <!-- Embedding the PostForm component here -->
      </main>
    </div>
  </div>
</template>

<script setup>
import PostForm from "@/components/PostForm.vue"; // Import the PostForm component
</script>

<style scoped>
.post-create-view {
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #4caf50;
  padding: 20px;
  text-align: center;
  color: white;
}

.content {
  display: flex;
  margin-top: 20px;
}

.sidebar {
  flex: 1;
  background-color: #f1f1f1;
  padding: 5px;
}

.sidebar h3 {
  margin-top: 0;
  color: #3b3b3b;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.sidebar ul li a {
  text-decoration: none;
  color: #333;
}

.main-content {
  flex: 3;
  padding: 20px;
  background-color: #fff;
  border-left: 1px solid #ddd;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .sidebar {
    margin-bottom: 20px;
  }
}
</style>
