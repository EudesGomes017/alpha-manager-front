<template>
  <VChart class="h-96 w-full" :option="chartOptions" autoresize />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { VChart } from "vue-echarts";
import type { EChartsOption } from "echarts";

const props = defineProps<{
  data: { month: string; vendas: number; receita: number }[];
}>();

const chartOptions = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Vendas", "Receita"],
  },
  xAxis: {
    type: "category",
    data: props.data.map((d) => d.month),
  },
  yAxis: [
    {
      type: "value",
      name: "Vendas",
    },
    {
      type: "value",
      name: "Receita",
    },
  ],
  series: [
    {
      name: "Vendas",
      type: "line",
      data: props.data.map((d) => d.vendas),
    },
    {
      name: "Receita",
      type: "line",
      yAxisIndex: 1,
      data: props.data.map((d) => d.receita),
    },
  ],
}));
</script>
