<template>
  <div class="w-full">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Ref, watch } from "vue";
import { provideTabs } from "../composables/useTabs";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// Fornece o estado atual dos tabs
const { currentTab } = provideTabs(props.modelValue);

// Faz a reatividade dos tabs com o v-model
watch(currentTab, (newVal: string) => {
  emit("update:modelValue", newVal);
});

watch(
  () => props.modelValue,
  (newVal: string) => {
    currentTab.value = newVal;
  }
);
</script>
