<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="bg-white dark:bg-zinc-900 border border-border text-foreground rounded-lg px-5 py-3 shadow-lg flex items-center space-x-4"
    >
      <div class="flex-1">
        <p class="font-semibold">{{ toast.title }}</p>
        <p v-if="toast.description" class="text-sm opacity-80">
          {{ toast.description }}
        </p>
      </div>
      <button
        @click="removeToast(toast.id)"
        class="text-xl opacity-70 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "../../omponents/composables/useToast";

const { toasts, removeToast } = useToast();
</script>
