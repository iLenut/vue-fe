<template>
  <div class="post-form">
    <h1>{{ isEditMode ? 'Edit Post' : 'Create New Post' }}</h1>

    <form @submit.prevent="handleSubmit">
      <!-- Title -->
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-model="post.title"
          type="text"
          id="title"
          placeholder="Post title"
          required
        />
      </div>

      <!-- Content -->
      <div class="form-group">
        <label for="content">Content</label>
        <textarea
          v-model="post.content"
          id="content"
          placeholder="Post content"
          required
          rows="8"
        ></textarea>
      </div>

      <!-- Tags -->
      <div class="form-group">
        <label for="tags">Tags</label>
        <input
          v-model="tagsInput"
          type="text"
          id="tags"
          placeholder="Enter tags (comma separated)"
        />
      </div>

      <!-- Status -->
      <div class="form-group status">
        <label for="status">Status</label>
        <select v-model="post.status" id="status">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <!-- Image Upload -->
      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" @change="handleImageUpload" id="image" />
        <div v-if="imagePreview">
          <img :src="imagePreview" alt="Image Preview" class="image-preview" />
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-btn">
        {{ isEditMode ? 'Update Post' : 'Create Post' }}
      </button>
    </form>
  </div>
  <!-- Notifications list -->
  <div>
    <Notification
      v-for="(notification, index) in notifications"
      :key="index"
      :message="notification.message"
      :type="notification.type"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Notification from './Notification.vue';

// Props
const isEditMode = ref(false); // Flag to check if we're editing or creating a post
const postId = ref(null); // ID of the post we're editing (if applicable)

// Post Data
const post = ref({
  title: '',
  content: '',
  status: 'draft',
  tags: [],
  imageUrl: '',
});

// Tags Input (comma separated)
const tagsInput = ref('');
const imagePreview = ref(null); // For image preview
const notifications = ref([]);
const router = useRouter();

const showNotification = (message, type) => {
  notifications.value.push({ message, type });
  setTimeout(() => {
    notifications.value.shift(); // Remove notification after 3 seconds
  }, 3000);
};

// Watch for changes to tagsInput and update the tags array
watch(tagsInput, (newVal) => {
  post.value.tags = newVal.split(',').map((tag) => tag.trim());
});

// Handle Image Upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result; // Preview the image
    };
    reader.readAsDataURL(file); // Convert the image to base64 for preview
  }
};

// Handle Post Submit
const handleSubmit = async () => {
  try {
    const backendApi = import.meta.env.VITE_BACKEND_API;

    const formData = {
      title: post.value.title,
      content: post.value.content,
      status: post.value.status,
      tags: post.value.tags,
      imageUrl: imagePreview.value, // Assuming image is handled by Base64
    };

    let response;
    if (isEditMode.value) {
      response = await axios.put(
        `${backendApi}/api/post/${postId.value}`,
        formData,
      ); // Update
    } else {
      response = await axios.post(`${backendApi}/api/post`, formData); // Create
    }

    isEditMode.value
      ? showNotification('Post updated successfully!', 'success')
      : showNotification('Post created successfully!', 'success');

    router.push('/'); // Redirect after submit
  } catch (error) {
    console.error('Error submitting post:', error);
    showNotification('An error occurred while submitting the post.', 'error');
  }
};

// If editing, fetch post data
if (isEditMode.value && postId.value) {
  // Fetch the post data to populate the form
  axios
    .get(`${import.meta.env.VITE_BACKEND_API}/api/post/${postId.value}`)
    .then((response) => {
      post.value = response.data;
    })
    .catch((error) => console.error('Error fetching post:', error));
}
</script>

<style scoped>
/* Base Styling */
.post-form {
  padding: 20px;
  width: 100%;
  max-width: 900px; /* Limit width of form */
  margin: 20px auto;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  box-sizing: border-box; /* Include padding and border in width calculation */
}

.post-form h1 {
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  transition: color 0.3s ease;
}

/* Form Group Styles */
.form-group {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

label {
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease;
}

input,
textarea,
select {
  color: #333;
  background-color: #f1f1f1;
  width: 100%; /* Ensure full width inside the form */
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box; /* Include padding in width calculation */
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #ff0000;
}

textarea {
  resize: vertical;
}

.submit-btn {
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3rem;
  font-size: 18px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #45a049;
}

.submit-btn:active {
  transform: scale(0.98);
}

/* Image Preview Styling */
.image-preview {
  margin-top: 10px;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Status dropdown hover effect */
.status select {
  color: #333;
  background: #f9f9f9;
  transition: background-color 0.3s ease;
}

.status select:hover {
  background-color: #f1f1f1;
}

/* Dynamic Hover Effects */
.form-group:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.form-group label {
  color: #4caf50;
}

/* Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
