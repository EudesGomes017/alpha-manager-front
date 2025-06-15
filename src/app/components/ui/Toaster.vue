<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="bg-background border border-border text-foreground rounded-md px-4 py-2 shadow-lg flex items-center space-x-2"
      :class="toastTypeClass(toast.type)"
    >
      <div class="flex-1">
        <p class="font-semibold">{{ toast.title }}</p>
        <p v-if="toast.description" class="text-sm opacity-80">
          {{ toast.description }}
        </p>
      </div>
      <button
        @click="removeToast(toast.id)"
        class="text-sm opacity-70 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "../../omponents/composables/useToast";

const { toasts, removeToast } = useToast();

const toastTypeClass = (type?: string) => {
  switch (type) {
    case "success":
      return "bg-green-500 text-white";
    case "error":
      return "bg-red-500 text-white";
    case "info":
      return "bg-blue-500 text-white";
    default:
      return "bg-background";
  }
};
</script>
