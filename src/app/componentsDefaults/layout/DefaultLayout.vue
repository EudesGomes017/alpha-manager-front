<script setup lang="ts">
import { h, ref } from "vue";
import Sidebar from "../../components/ui/Sidebar/Sidebar.vue";

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
    href: "/products",
    icon: () => h("i", { class: "i-lucide-package" }),
    badge: "3",
  },
];
</script>

<template>
  <div class="flex">
    <Sidebar
      :isOpen="isSidebarOpen"
      :toggle="toggleSidebar"
      :items="menuItems"
    />
    <main class="flex-1 p-6">
      <slot />
    </main>
  </div>
</template>
