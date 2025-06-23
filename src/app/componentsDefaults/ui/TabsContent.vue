<template>
  <div v-if="currentTab === value">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useTabs } from "../composables/useTabs";

const props = defineProps<{
  value: string;
}>();

const currentTab = useTabs();
</script>
