<script setup lang="ts">
import { ref, onMounted } from 'vue'

const post = ref({
  title: '',
  content: '',
  date: '',
  author: '',
  readTime: '',
  coverImage: ''
})

onMounted(() => {
  // In a real app, you would fetch the post data based on route.params.slug
  // This is just example data
  post.value = {
    title: 'Getting Started with Our Platform',
    content: `
      <p>This is where your blog post content would go. In a real application,
      you would likely fetch this content from a CMS or API.</p>

      <p>You might want to support rich text formatting, images, code blocks,
      and other markdown or HTML content.</p>
    `,
    date: '2024-03-21',
    author: 'John Doe',
    readTime: '5 min read',
    coverImage: '/blog-1.jpg'
  }
})
</script>

<template>
  <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <header class="mb-8">
      <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
      <div class="flex gap-4 text-gray-600">
        <time>{{ new Date(post.date).toLocaleDateString() }}</time>
        <span>{{ post.readTime }}</span>
        <span>By {{ post.author }}</span>
      </div>
    </header>

    <img :src="post.coverImage" :alt="post.title" class="w-full h-64 object-cover rounded-lg mb-8" />

    <div class="prose prose-lg max-w-none" v-html="post.content" />
  </article>
</template>
