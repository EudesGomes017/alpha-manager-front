<template>
  <nav
    class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-bold">Projeto ALPHA</h1>
        </div>
        <div class="flex items-center space-x-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            class="flex items-center space-x-2"
            :class="{
              'bg-primary text-primary-foreground': route.path === item.href,
            }"
          >
            <Button
              :variant="route.path === item.href ? 'default' : 'ghost'"
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
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import { Package, BarChart3 } from "lucide-vue-next"; // Biblioteca equivalente ao lucide-react
import Button from "../omponents/ui/Button.vue"; // Componente Button no padrão Vue

const route = useRoute();

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
