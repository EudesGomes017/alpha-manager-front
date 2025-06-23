<template>
  <div class="p-4 bg-white rounded-lg shadow border">
    <div class="mb-4">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <p class="text-sm text-muted-foreground">{{ description }}</p>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>
