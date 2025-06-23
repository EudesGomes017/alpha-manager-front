<script setup lang="ts">
import { useTabs } from "@/app/composables/useTabs";

const props = defineProps<{
  value: string;
}>();

const currentTab = useTabs();

const isActive = () => currentTab.value === props.value;

const setActive = () => {
  currentTab.value = props.value;
};
</script>

<template>
  <button
    :class="[
      'px-4 py-2 text-sm font-medium border-b-2',
      isActive()
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    ]"
    @click="setActive"
  >
    <slot />
  </button>
</template>
