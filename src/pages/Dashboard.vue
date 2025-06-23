<template>
  <div class="min-h-screen bg-gray-50">
    <Navigation />

    <div class="container mx-auto p-6 space-y-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Dashboard ALPHA</h1>
          <p class="text-muted-foreground">
            Visão completa do gerenciamento de produtos e vendas
          </p>
        </div>
      </div>

      <!-- Cards principais -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total de Produtos"
          :value="totalProducts"
          icon="package"
        />
        <DashboardCard
          title="Valor do Estoque"
          :value="`R$ ${totalInventoryValue.toLocaleString('pt-BR')}`"
          :subtext="`Preço médio: R$ ${averagePrice.toFixed(2)}`"
          icon="dollar-sign"
        />
        <DashboardCard
          title="Vendas do Mês"
          value="3.521"
          subtext="+18% comparado ao mês anterior"
          icon="trending-up"
        />
        <DashboardCard
          title="Fora de Estoque"
          :value="outOfStockItems"
          :subtext="`${lowStockItems} com estoque baixo`"
          icon="alert-triangle"
          color="text-red-600"
        />
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="growth">Crescimento</TabsTrigger>
        </TabsList>

        <!-- Overview -->
        <TabsContent value="overview">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Distribuição por Preço">
              <VChart :option="barChartOption" style="height: 300px" />
            </ChartCard>
            <ChartCard title="Produtos por Categoria">
              <VChart :option="pieChartOption" style="height: 300px" />
            </ChartCard>
          </div>
        </TabsContent>

        <!-- Sales -->
        <TabsContent value="sales">
          <ChartCard title="Vendas Mensais">
            <VChart :option="lineChartOption" style="height: 400px" />
          </ChartCard>
        </TabsContent>

        <!-- Products -->
        <TabsContent value="products">
          <ChartCard title="Análise de Produtos">
            <VChart :option="barChartOption" style="height: 400px" />
          </ChartCard>
        </TabsContent>

        <!-- Growth -->
        <TabsContent value="growth">
          <ChartCard title="Crescimento do Catálogo">
            <VChart :option="areaChartOption" style="height: 400px" />
          </ChartCard>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import VChart from "vue-echarts";

import DashboardCard from "@/app/componentsDefaults/ui/DashboardCard.vue";
import ChartCard from "@/app/componentsDefaults/ui/ChartCard.vue";

import Tabs from "@/app/componentsDefaults/ui/Tabs.vue";
import TabsList from "@/app/componentsDefaults/ui/TabsList.vue";
import TabsTrigger from "@/app/componentsDefaults/ui/TabsTrigger.vue";
import TabsContent from "@/app/componentsDefaults/ui/TabsContent.vue";

import Navigation from "@/app/componentsDefaults/Navigation.vue";

import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const activeTab = ref("overview");

onMounted(() => {
  productStore.fetchProducts();
});

// =================== 📊 Dados ===================
const products = computed(() => productStore.products);
const totalProducts = computed(() => products.value.length);
const averagePrice = computed(() =>
  products.value.length > 0
    ? products.value.reduce((sum, p) => sum + p.price, 0) /
      products.value.length
    : 0
);
const highestPrice = computed(() =>
  products.value.length > 0
    ? Math.max(...products.value.map((p) => p.price))
    : 0
);
const lowestPrice = computed(() =>
  products.value.length > 0
    ? Math.min(...products.value.map((p) => p.price))
    : 0
);
const totalInventoryValue = computed(() =>
  products.value.reduce((sum, p) => sum + p.price, 0)
);
const outOfStockItems = computed(() => Math.floor(totalProducts.value * 0.15));
const lowStockItems = computed(() => Math.floor(totalProducts.value * 0.25));

// =================== 📈 Dados Gráficos ===================
const priceRanges = computed(() => [
  { range: "0-50", count: products.value.filter((p) => p.price <= 50).length },
  {
    range: "51-100",
    count: products.value.filter((p) => p.price > 50 && p.price <= 100).length,
  },
  {
    range: "101-200",
    count: products.value.filter((p) => p.price > 100 && p.price <= 200).length,
  },
  {
    range: "201-500",
    count: products.value.filter((p) => p.price > 200 && p.price <= 500).length,
  },
  { range: "500+", count: products.value.filter((p) => p.price > 500).length },
]);

const categoryData = computed(() => [
  { name: "Eletrônicos", value: Math.floor(totalProducts.value * 0.35) },
  { name: "Roupas", value: Math.floor(totalProducts.value * 0.25) },
  { name: "Casa & Jardim", value: Math.floor(totalProducts.value * 0.2) },
  { name: "Esportes", value: Math.floor(totalProducts.value * 0.15) },
  { name: "Outros", value: Math.floor(totalProducts.value * 0.05) },
]);

const salesData = [
  { month: "Jan", vendas: 1200, receita: 45000 },
  { month: "Fev", vendas: 1800, receita: 52000 },
  { month: "Mar", vendas: 1500, receita: 48000 },
  { month: "Abr", vendas: 2200, receita: 67000 },
  { month: "Mai", vendas: 1900, receita: 58000 },
  { month: "Jun", vendas: 2500, receita: 75000 },
  { month: "Jul", vendas: 2800, receita: 82000 },
  { month: "Ago", vendas: 2100, receita: 63000 },
  { month: "Set", vendas: 2400, receita: 71000 },
  { month: "Out", vendas: 2700, receita: 79000 },
  { month: "Nov", vendas: 3100, receita: 89000 },
  { month: "Dez", vendas: 3500, receita: 95000 },
];

const growthData = [
  { periodo: "Q1 2023", produtos: 150, crescimento: 5 },
  { periodo: "Q2 2023", produtos: 180, crescimento: 20 },
  { periodo: "Q3 2023", produtos: 220, crescimento: 22 },
  { periodo: "Q4 2023", produtos: 280, crescimento: 27 },
  { periodo: "Q1 2024", produtos: 350, crescimento: 25 },
  { periodo: "Q2 2024", produtos: totalProducts.value, crescimento: 30 },
];

// =================== 📊 Opções de Gráficos ===================
const barChartOption = computed(() => ({
  tooltip: {},
  xAxis: {
    type: "category",
    data: priceRanges.value.map((p) => p.range),
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: priceRanges.value.map((p) => p.count),
      type: "bar",
      itemStyle: { color: "#8884d8" },
    },
  ],
}));

const pieChartOption = computed(() => ({
  tooltip: { trigger: "item" },
  series: [
    {
      type: "pie",
      radius: "60%",
      data: categoryData.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
}));

const lineChartOption = {
  tooltip: { trigger: "axis" },
  xAxis: { type: "category", data: salesData.map((i) => i.month) },
  yAxis: {},
  series: [
    { name: "Vendas", type: "line", data: salesData.map((i) => i.vendas) },
    { name: "Receita", type: "line", data: salesData.map((i) => i.receita) },
  ],
};

const areaChartOption = {
  tooltip: { trigger: "axis" },
  xAxis: { type: "category", data: growthData.map((i) => i.periodo) },
  yAxis: {},
  series: [
    {
      name: "Produtos",
      type: "line",
      areaStyle: {},
      data: growthData.map((i) => i.produtos),
    },
    {
      name: "% Crescimento",
      type: "line",
      areaStyle: {},
      data: growthData.map((i) => i.crescimento),
    },
  ],
};
</script>
