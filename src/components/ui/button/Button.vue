<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { type ButtonVariants, buttonVariants } from ".";
import { cn } from "@/lib/utils";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});

const element = computed(() => props.href ? 'a' : props.as);
</script>

<template>
  <Primitive :as="element" :as-child="asChild" :href="href" :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </Primitive>
</template>
