<template>
  <div class="min-h-screen flex">
    <Sidebar
      :isOpen="isSidebarOpen"
      :toggle="toggleSidebar"
      :items="menuItems"
    />

    <div class="flex flex-col flex-1">
      <Navigation @toggle-sidebar="toggleSidebar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
//import { RouterView } from "vue-router";

import Navigation from "./app/components/ui/Navigation.vue";
import Sidebar from "./app/components/ui/Sidebar/Sidebar.vue";

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
