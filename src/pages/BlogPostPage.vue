<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogPosts } from '../composables/useBlogPosts'

const route = useRoute()
const { posts } = useBlogPosts()

const post = computed(() =>
  posts.value.find(p => p.slug === route.params.slug)
)
</script>

<template>
  <div v-if="post" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <header class="mb-12">
      <img :src="post.coverImage" :alt="post.title" class="w-full h-[400px] object-cover rounded-xl shadow-lg mb-10" />

      <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">{{ post.title }}</h1>

      <!-- Author and Meta Info -->
      <div class="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div v-if="post.author" class="flex items-center">
          <img :src="post.author.img" :alt="post.author.name"
            class="w-12 h-12 rounded-full mr-4 border-2 border-white dark:border-gray-800 shadow-sm" />
          <div>
            <div class="font-semibold text-gray-900 dark:text-gray-100">{{ post.author.name }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ new Date(post.date).toLocaleDateString() }} · {{ post.readTime }}
            </div>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div v-if="post.categories" class="flex flex-wrap gap-2 mb-8">
        <span v-for="category in post.categories" :key="category"
          class="px-4 py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          {{ category }}
        </span>
      </div>
    </header>

    <!-- Content -->
    <article class="prose prose-lg max-w-none">
      <div v-html="post.content"></div>
    </article>

    <!-- Tags -->
    <footer v-if="post.tags" class="mt-12 pt-8 border-t border-gray-100">
      <div class="flex flex-wrap gap-2">
        <span v-for="tag in post.tags" :key="tag"
          class="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
          #{{ tag }}
        </span>
      </div>
    </footer>
  </div>
  <div v-else class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <p class="text-center text-gray-600">Post not found</p>
  </div>
</template>

<style>
/* Enhanced Typography Styles with Dark Mode */
.prose {
  @apply max-w-none text-gray-700 dark:text-gray-300;
}

/* Add this new style for bold text */
.prose strong {
  @apply text-gray-900 dark:text-gray-100 font-bold;
}

/* Update existing styles */
.prose h2 {
  @apply text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-6;
}

.prose h3 {
  @apply text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4;
}

.prose p {
  @apply my-6 leading-relaxed dark:text-gray-300;
}

.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors decoration-2 underline-offset-2;
}

.prose ul {
  @apply my-6 list-disc list-inside dark:text-gray-300;
}

.prose li {
  @apply mb-2;
}

.prose img {
  @apply rounded-lg shadow-md dark:shadow-gray-800 my-8;
}

.prose blockquote {
  @apply pl-4 border-l-4 border-gray-200 dark:border-gray-700 italic my-8 text-gray-600 dark:text-gray-400;
}

/* Table Styles */
.prose table {
  @apply w-full my-8 border-collapse;
}

.prose th {
  @apply bg-gray-50 dark:bg-gray-800 text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700;
}

.prose td {
  @apply py-3 px-4 border-b border-gray-100 dark:border-gray-800 dark:text-gray-300;
}

/* Code Block Styles */
.prose pre {
  @apply bg-gray-900 dark:bg-gray-800 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 px-1.5 py-0.5 rounded text-sm;
}

.prose pre code {
  @apply bg-transparent text-inherit p-0;
}

/* Tags */
.prose footer span {
  @apply dark:bg-blue-900/30 dark:text-blue-300;
}
</style>
