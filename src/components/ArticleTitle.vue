<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="my-8">
    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
      {{ text }}
    </h1>
  </div>
</template>
