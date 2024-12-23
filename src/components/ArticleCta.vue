<script setup lang="ts">
import { Button } from "@/components/ui/button";

defineProps<{
  link: string
  label: string
  description?: string
  ctaLabel: string
  icon?: string
  secondaryLink?: string
  secondaryLabel?: string
}>()
</script>

<template>
  <div
    class="my-8 p-6 bg-primary-50/80 dark:bg-primary-900/30 rounded-2xl shadow-lg border border-primary-100 dark:border-primary-800">
    <div class="flex flex-col gap-4">
      <!-- Content Section -->
      <div class="space-y-2">
        <h3 class="text-2xl font-bold text-primary-950 dark:text-primary-50">
          {{ label }}
        </h3>
        <p v-if="description" class="text-primary-700 dark:text-primary-300 text-base leading-relaxed max-w-2xl">
          {{ description }}
        </p>
      </div>

      <!-- Buttons Section -->
      <div class="flex justify-center items-center flex-wrap gap-2">
        <Button :href="link" variant="default">
          {{ ctaLabel }}
          <i v-if="icon" :class="icon" class="ml-2" />
        </Button>
        <Button v-if="secondaryLink && secondaryLabel" :href="secondaryLink" variant="secondary">
          {{ secondaryLabel }}
        </Button>
      </div>
    </div>
  </div>
</template>
