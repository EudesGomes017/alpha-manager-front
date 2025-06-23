<template>
  <VChart class="h-80 w-full" :option="chartOptions" autoresize />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { VChart } from "vue-echarts";
import type { EChartsOption } from "echarts";

const props = defineProps<{
  data: { range: string; count: number; color: string }[];
}>();

const chartOptions = computed<EChartsOption>(() => ({
  tooltip: {},
  xAxis: {
    type: "category",
    data: props.data.map((d) => d.range),
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "bar",
      data: props.data.map((d) => ({
        value: d.count,
        itemStyle: { color: d.color },
      })),
    },
  ],
}));
</script>
