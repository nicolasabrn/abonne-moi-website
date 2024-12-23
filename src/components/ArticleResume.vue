<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="my-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
    <p class="text-lg text-gray-700 dark:text-gray-300 italic">
      {{ text }}
    </p>
  </div>
</template>
