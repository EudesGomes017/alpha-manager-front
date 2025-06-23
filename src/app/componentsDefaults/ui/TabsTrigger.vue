<template>
  <button
    :class="[
      'px-4 py-2 rounded',
      currentTab === value
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 text-gray-600',
    ]"
    @click="currentTab = value"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { useTabs } from "../composables/useTabs";

const props = defineProps<{
  value: string;
}>();

const currentTab = useTabs();
</script>
