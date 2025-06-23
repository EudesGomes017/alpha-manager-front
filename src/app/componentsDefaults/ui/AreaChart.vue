<template>
  <VChart class="h-96 w-full" :option="chartOptions" autoresize />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { VChart } from "vue-echarts";
import type { EChartsOption } from "echarts";

const props = defineProps<{
  data: { periodo: string; produtos: number; crescimento: number }[];
}>();

const chartOptions = computed<EChartsOption>(() => ({
  tooltip: { trigger: "axis" },
  xAxis: { type: "category", data: props.data.map((d) => d.periodo) },
  yAxis: { type: "value" },
  series: [
    {
      name: "Produtos",
      type: "line",
      areaStyle: {},
      data: props.data.map((d) => d.produtos),
    },
    {
      name: "% Crescimento",
      type: "line",
      areaStyle: {},
      data: props.data.map((d) => d.crescimento),
    },
  ],
}));
</script>
