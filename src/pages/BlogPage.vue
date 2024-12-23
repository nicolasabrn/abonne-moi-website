<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBlogPosts } from '../composables/useBlogPosts'

const { posts } = useBlogPosts()
const searchQuery = ref('')
const selectedCategories = ref<string[]>([])

// Récupération des catégories uniques
const allCategories = computed(() => {
  const categories = new Set<string>()
  posts.value.forEach(post => {
    post.categories?.forEach(category => categories.add(category))
  })
  return Array.from(categories)
})

const filteredPosts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post => {
    // Filtre de recherche textuelle
    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.categories?.some(cat => cat.toLowerCase().includes(query)) ||
      post.author?.name.toLowerCase().includes(query)

    // Filtre par catégorie
    const matchesCategories =
      selectedCategories.value.length === 0 ||
      post.categories?.some(cat => selectedCategories.value.includes(cat))

    return matchesSearch && matchesCategories
  })
})

const toggleCategory = (category: string) => {
  const index = selectedCategories.value.indexOf(category)
  if (index === -1) {
    selectedCategories.value.push(category)
  } else {
    selectedCategories.value.splice(index, 1)
  }
}

const clearFilters = () => {
  selectedCategories.value = []
  searchQuery.value = ''
}

const isCategorySelected = (category: string) => selectedCategories.value.includes(category)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <!-- En-tête -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Blog</h1>

      <!-- Barre de recherche -->
      <div class="relative max-w-xl mb-8">
        <input v-model="searchQuery" type="search" placeholder="Rechercher un article..." class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
        <span class="absolute right-3 top-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
      </div>

      <!-- Filtres par catégorie -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Filtrer par catégorie</h2>
        <div class="flex flex-wrap gap-2">
          <button v-for="category in allCategories" :key="category" @click="toggleCategory(category)" :class="[
            'px-3 py-1.5 text-sm font-medium rounded-full transition-colors',
            isCategorySelected(category)
              ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          ]">
            {{ category }}
          </button>
        </div>
        <div class="flex justify-center" v-if="selectedCategories.length > 0 || searchQuery">
          <button @click="clearFilters"
            class="mt-4 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
            Effacer les filtres
          </button>
        </div>
      </div>

      <!-- Nombre de résultats -->
      <p class="mb-8 text-gray-600 dark:text-gray-400">
        {{ filteredPosts.length }} article{{ filteredPosts.length !== 1 && filteredPosts.length !== 0 ? 's' : '' }}
        trouvé{{ filteredPosts.length !== 1 && filteredPosts.length !== 0 ? 's' : '' }}
      </p>
    </div>

    <!-- Grille des articles -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <router-link v-for="post in filteredPosts" :key="post.slug" :to="`/blog/${post.slug}`" class="group">
        <article class="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden
                      hover:shadow-xl dark:hover:shadow-2xl dark:shadow-gray-900/30 transition-all duration-300
                      border border-gray-100 dark:border-gray-700">
          <div class="relative">
            <img :src="post.coverImage" :alt="post.title"
              class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
            <!-- Categories -->
            <div class="absolute bottom-2 left-2 flex flex-wrap gap-2">
              <span v-for="category in post.categories" :key="category"
                class="px-2 py-1 text-xs font-medium bg-gray-900/70 dark:bg-gray-800/70 text-white rounded-full">
                {{ category }}
              </span>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <h2 class="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600
                       dark:group-hover:text-blue-400 transition-colors">
              {{ post.title }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4 flex-1">
              {{ post.excerpt }}
            </p>

            <div class="mt-auto">
              <!-- Author -->
              <div v-if="post.author" class="flex items-center mb-3">
                <img :src="post.author.img" :alt="post.author.name"
                  class="w-8 h-8 rounded-full mr-2 border-2 border-white dark:border-gray-700" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ post.author.name }}</span>
              </div>

              <!-- Meta Info -->
              <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <time>{{ new Date(post.date).toLocaleDateString() }}</time>
                <span>{{ post.readTime }}</span>
              </div>
            </div>
          </div>
        </article>
      </router-link>
    </div>

    <!-- Message aucun résultat -->
    <div v-if="filteredPosts.length === 0" class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400 text-lg">
        Aucun article ne correspond à votre recherche.
      </p>
    </div>
  </div>
</template>

<style scoped>
.router-link-active article {
  @apply ring-2 ring-blue-500 dark:ring-blue-400;
}
</style>
