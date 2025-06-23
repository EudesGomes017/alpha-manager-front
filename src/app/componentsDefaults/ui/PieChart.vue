<template>
  <VChart class="h-80 w-full" :option="chartOptions" autoresize />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { VChart } from "vue-echarts";
import type { EChartsOption } from "echarts";

const props = defineProps<{
  data: { name: string; value: number; color: string }[];
}>();

const chartOptions = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      name: "Categorias",
      type: "pie",
      radius: "60%",
      data: props.data.map((d) => ({
        value: d.value,
        name: d.name,
        itemStyle: { color: d.color },
      })),
      label: {
        formatter: "{b}: {d}%",
      },
    },
  ],
}));
</script>
