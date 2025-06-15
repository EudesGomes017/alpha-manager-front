<template>
  <!-- Overlay para fechar ao clicar fora -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-40 bg-black/40 md:hidden"
    @click="toggle"
  />

  <!-- Sidebar -->
  <aside
    class="fixed inset-y-0 left-0 z-50 w-64 border-r bg-white dark:bg-gray-900 transition-transform duration-300"
    :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
  >
    <div class="flex h-full flex-col p-4">
      <!-- Cabeçalho -->
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Menu</h2>
        <button @click="toggle" class="md:hidden" aria-label="Fechar menu">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Itens do Menu -->
      <nav class="flex-1 space-y-1">
        <SidebarItem
          v-for="item in items"
          :key="item.name"
          :to="item.href"
          :icon="item.icon"
          :badge="item.badge"
        >
          {{ item.name }}
        </SidebarItem>
      </nav>

      <!-- Rodapé -->
      <div class="mt-auto pt-4">
        <UserProfileDropdown />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";
import type { Component } from "vue";

import { SidebarItem } from "../../ui/Sidebar";

defineProps<{
  isOpen: boolean;
  toggle: () => void;
  items: Array<{
    name: string;
    href: string;
    icon: Component;
    badge?: string;
  }>;
}>();
</script>
