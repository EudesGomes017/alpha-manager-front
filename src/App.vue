<template>
  <div class="min-h-screen flex">
    <Sidebar
      :isOpen="isSidebarOpen"
      :toggle="toggleSidebar"
      :items="menuItems"
    />

    <div class="flex flex-col flex-1">
      <Navigation @toggle-sidebar="toggleSidebar" />

      <!-- ✅ Renderiza aqui o conteúdo da rota atual -->
      <RouterView class="flex-1 p-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { RouterView } from "vue-router";

import Navigation from "@/app/componentsDefaults/Navigation.vue";

import Sidebar from "@/app/componentsDefaults/ui/Sidebar/Sidebar.vue";

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: () => h("i", { class: "i-lucide-home" }),
  },
  {
    name: "Produtos",
    href: "/",
    icon: () => h("i", { class: "i-lucide-package" }),
  },
];
</script>
