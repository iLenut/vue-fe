<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";

// Get the post ID from the URL
const route = useRoute();
const postId = route.params.id;

// Sample posts data (in a real app, you’d fetch this from an API)
const posts = [
  {
    id: 1,
    title: "My First Blog Post",
    content:
      "# Hello World\nThis is my first blog post written in **Markdown**.",
  },
  {
    id: 2,
    title: "Another Blog Post",
    content:
      "# Another Post\nThis is another post that I wrote in **Markdown**.",
  },
  {
    id: 3,
    title: "Learning Vue 3",
    content:
      "# Learning Vue\nVue 3 is awesome and can be used to build amazing apps.",
  },
];

const post = ref({});
const postContent = ref("");

onMounted(() => {
  const foundPost = posts.find((p) => p.id === parseInt(postId));
  if (foundPost) {
    post.value = foundPost;
    postContent.value = marked(foundPost.content); // Convert Markdown to HTML
  }
});
</script>

<template>
  <div>
    <h1>{{ post.title }}</h1>
    <div v-html="postContent"></div>
  </div>
</template>
