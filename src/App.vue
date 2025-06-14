<script setup lang="ts">
  import Header from './layout/Header.vue'
  import Footer from './layout/Footer.vue'
</script>

<template>
<div class="min-h-screen flex flex-col bg-white text-gray-800 dark:text-gray-100 overflow-x-hidden">
  <Header />
  <router-view class="flex-1"/>
  <Footer />
</div>

</template>

