<template>
  <button
    @click="$emit('toggle')"
    class="rounded-md p-1 hover:bg-accent"
    aria-label="Fechar menu"
  >
    <X class="h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";
defineEmits(["toggle"]);
</script>
