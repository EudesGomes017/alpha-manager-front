<template>
  <RouterLink :to="to" custom v-slot="{ isActive, navigate }">
    <button
      @click="navigate"
      class="flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors"
      :class="{
        'bg-secondary text-secondary-foreground': isActive,
        'hover:bg-accent hover:text-accent-foreground': !isActive,
      }"
    >
      <component :is="icon" class="mr-3 h-4 w-4" />
      <span class="flex-1 text-left"><slot /></span>
      <span
        v-if="badge"
        class="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground"
      >
        {{ badge }}
      </span>
    </button>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { RouterLink } from "vue-router";

defineProps<{
  to: string;
  icon: Component;
  badge?: string;
}>();
</script>
