<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
  </div>
  <RouterView class="flex-1" />
</template>

<script setup lang="ts">
import Navigation from "./app/omponents/Navigation.vue";
</script>
