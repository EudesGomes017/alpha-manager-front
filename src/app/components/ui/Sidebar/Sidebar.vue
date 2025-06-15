<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300"
    :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }"
  >
    <div class="flex h-full flex-col p-4">
      <!-- Cabeçalho -->
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-lg font-semibold">Menu</h2>
        <SidebarToggle @toggle="toggle" />
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

      <!-- Rodapé (opcional) -->
      <div class="mt-auto pt-4">
        <UserProfileDropdown />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { SidebarToggle, SidebarItem } from "./";
import UserProfileDropdown from "../UserProfileDropdown.vue";

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
