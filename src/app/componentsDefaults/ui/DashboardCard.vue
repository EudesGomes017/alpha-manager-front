<template>
  <div class="p-4 bg-white rounded-lg shadow border">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-medium text-gray-700">
        {{ title }}
      </h3>
      <component :is="iconComponent" class="h-4 w-4 text-muted-foreground" />
    </div>
    <div :class="['text-2xl font-bold', color]">
      {{ value }}
    </div>
    <p class="text-xs text-muted-foreground mt-1" v-if="subtext">
      {{ subtext }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Users,
  AlertTriangle,
  Activity,
  Target,
} from "lucide-vue-next";

// ✅ Mapeamento dos ícones
const iconMap = {
  package: Package,
  "dollar-sign": DollarSign,
  "trending-up": TrendingUp,
  "shopping-cart": ShoppingCart,
  users: Users,
  "alert-triangle": AlertTriangle,
  activity: Activity,
  target: Target,
} as const;

// ✅ Tipo seguro para a prop icon
type IconName = keyof typeof iconMap;

// ✅ Props tipadas
const props = defineProps<{
  title: string;
  value: string | number;
  subtext?: string;
  icon: IconName;
  color?: string;
}>();

// ✅ Computed para retornar o componente correto
const iconComponent = computed(() => iconMap[props.icon]);
</script>
