<!-- SidebarToggle.vue -->
<template>
  <button @click="$emit('toggle')">
    <IconMenu />
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: "toggle"): void;
}>();
</script>
