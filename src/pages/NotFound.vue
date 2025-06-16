<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-4">Oops! Página não encontrada</p>
      <RouterLink to="/" class="text-blue-500 hover:text-blue-700 underline">
        Voltar para o Início
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  console.error(
    "404 Error: Usuário tentou acessar uma rota inexistente:",
    route.path
  );
});
</script>
