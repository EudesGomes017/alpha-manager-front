<script setup lang="ts">
import { provideTabs } from "@/app/composables/useTabs";

defineProps<{
  defaultValue: string;
}>();

const props = defineProps<{ defaultValue: string }>();

provideTabs(props.defaultValue);
</script>

<template>
  <div class="space-y-4">
    <slot />
  </div>
</template>
