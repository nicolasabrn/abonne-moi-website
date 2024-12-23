<script setup lang="ts">
import { ref } from 'vue'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  coverImage: string
}

const posts = ref<BlogPost[]>([
  {
    slug: 'getting-started',
    title: 'Getting Started with Our Platform',
    excerpt: 'A comprehensive guide to help you get up and running with our platform quickly and efficiently.',
    date: '2024-03-21',
    readTime: '5 min read',
    coverImage: '/blog-1.jpg'
  },
  // Add more sample posts here
])
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="text-4xl font-bold mb-12">Blog</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <router-link v-for="post in posts" :key="post.slug" :to="`/blog/${post.slug}`" class="group">
        <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img :src="post.coverImage" :alt="post.title" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-2 group-hover:text-blue-600">
              {{ post.title }}
            </h2>
            <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
            <div class="flex justify-between text-sm text-gray-500">
              <time>{{ new Date(post.date).toLocaleDateString() }}</time>
              <span>{{ post.readTime }}</span>
            </div>
          </div>
        </article>
      </router-link>
    </div>
  </div>
</template>
