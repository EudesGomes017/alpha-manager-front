<script setup lang="ts">
import { useTabs } from "@/app/composables/useTabs";

const props = defineProps<{
  value: string;
}>();

const currentTab = useTabs();

const isActive = () => currentTab.value === props.value;
</script>

<template>
  <div v-if="isActive()">
    <slot />
  </div>
</template>
