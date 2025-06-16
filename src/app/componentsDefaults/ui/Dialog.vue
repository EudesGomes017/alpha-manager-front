<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="emit('close')"
      ></div>
      <div
        class="relative z-50 bg-background rounded-lg shadow-lg p-6 max-w-lg w-full"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>
