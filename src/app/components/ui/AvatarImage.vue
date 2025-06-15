<script setup lang="ts">
defineProps<{ size?: string }>();
</script>

<template>
  <div
    class="relative inline-flex overflow-hidden rounded-full bg-gray-100"
    :class="size || 'h-10 w-10'"
  >
    <slot />
  </div>
</template>
