<template>
  <nav
    class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button
            @click="$emit('toggle-sidebar')"
            class="md:hidden mr-2"
            aria-label="Abrir menu"
          >
            <Menu class="h-5 w-5" />
          </button>
          <h1 class="text-xl font-bold">
            Projeto <span class="text-primary">ALPHA</span>
          </h1>
        </div>
        <div class="flex items-center space-x-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            custom
            v-slot="{ isActive, navigate }"
          >
            <Button
              :variant="isActive ? 'default' : 'ghost'"
              @click="navigate"
              class="flex items-center space-x-2"
            >
              <component :is="item.icon" class="h-4 w-4" />
              <span>{{ item.name }}</span>
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Package, BarChart3, Menu } from "lucide-vue-next";
import Button from "./Button.vue";
defineEmits(["toggle-sidebar"]); // Adicione esta linha

const navItems = ref([
  {
    name: "Produtos",
    href: "/",
    icon: Package,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
]);
</script>
