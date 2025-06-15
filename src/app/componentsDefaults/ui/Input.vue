<template>
  <input
    :id="id"
    :type="type || 'text'"
    :step="step"
    :placeholder="placeholder"
    :class="['base-input', customClass]"
    :value="modelValue"
    @input="event => emit('update:modelValue', (event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | number;
  placeholder?: string;
  id?: string;
  type?: string;
  step?: string;
  customClass?:
    | string
    | Record<string, boolean>
    | (string | Record<string, boolean>)[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
</script>

<style scoped>
.base-input {
  @apply w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring;
}
</style>
