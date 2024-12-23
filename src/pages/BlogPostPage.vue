<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogPosts } from '../composables/useBlogPosts'
import type { BlogPost } from '../types/blog'

const route = useRoute()
const { posts } = useBlogPosts()

const post = computed(() => {
  return posts.value.find((p: BlogPost) => p.slug === route.params.slug) || null
})

interface ContentPart {
  id: string
  content?: string
  isComponent?: boolean
  component?: {
    id: string
    type: string
    props: Record<string, any>
  }
}

const processContent = (content: string, components: BlogPost['components'] = []) => {
  const parts: ContentPart[] = []
  const segments = content.split(/<!--component-\d+-->/)
  const markers = content.match(/<!--component-(\d+)-->/g) || []

  segments.forEach((segment, index) => {
    if (segment) parts.push({ id: `text-${index}`, content: segment })
    if (markers[index]) {
      const match = markers[index].match(/\d+/)
      if (match) {
        const componentIndex = parseInt(match[0])
        parts.push({
          id: `component-${componentIndex}`,
          isComponent: true,
          component: components?.[componentIndex]
        })
      }
    }
  })

  return parts
}

const contentParts = computed(() => {
  if (!post.value) return []
  return processContent(post.value.content, post.value.components || [])
})
</script>

<template>
  <div v-if="post" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <header class="mb-12">
      <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title"
        class="w-full h-[400px] object-cover rounded-xl shadow-lg mb-10" />

      <div class="flex items-center justify-between mb-8 border-b border-primary/20 pb-6 dark:border-primary/10">
        <div v-if="post.author" class="flex items-center">
          <img :src="post.author.img" :alt="post.author.name"
            class="w-12 h-12 rounded-full mr-4 border-2 border-primary/20 dark:border-primary/10 shadow-sm" />
          <div>
            <div class="font-semibold text-primary dark:text-primary-200">{{ post.author.name }}</div>
            <div class="text-sm text-primary/70 dark:text-primary-200/70">
              {{ new Date(post.date).toLocaleDateString() }} · {{ post.readTime }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="post.categories" class="flex flex-wrap gap-2 mb-8">
        <span v-for="category in post.categories" :key="category" class="px-4 py-1.5 bg-primary/5 dark:bg-primary-200/10 text-primary dark:text-primary-200
                 rounded-full text-sm font-medium hover:bg-primary/10 dark:hover:bg-primary-200/20
                 transition-colors">
          {{ category }}
        </span>
      </div>
    </header>

    <article class="prose prose-lg max-w-none prose-primary dark:prose-invert">
      <template v-for="part in contentParts" :key="part.id">
        <component v-if="part.isComponent && part.component" :is="part.component.type" v-bind="part.component.props" />
        <div v-else v-html="part.content"></div>
      </template>
    </article>
  </div>
  <div v-else class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <p class="text-center text-primary/70 dark:text-primary-200/70">Post not found</p>
  </div>
</template>
