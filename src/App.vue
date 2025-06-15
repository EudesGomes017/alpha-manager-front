<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <RouterView class="flex-1" />
  </div>
</template>

<script setup lang="ts">
import Navigation from "./app/omponents/Navigation.vue";
</script>
