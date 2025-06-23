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
          subtext="Preço médio: R$ {{ averagePrice.toFixed(2) }}"
          icon="dollar-sign"
        />
        <DashboardCard
          title="Vendas do Mês"
          value="3,521"
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

      <!-- Cards adicionais -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Maior Preço"
          :value="`R$ ${highestPrice.toFixed(2)}`"
          subtext="Produto premium"
          icon="trending-up"
        />
        <DashboardCard
          title="Menor Preço"
          :value="`R$ ${lowestPrice.toFixed(2)}`"
          subtext="Produto acessível"
          icon="shopping-cart"
        />
        <DashboardCard
          title="Conversão"
          value="3.2%"
          subtext="Taxa de conversão média"
          icon="target"
        />
        <DashboardCard
          title="Clientes Ativos"
          value="1,429"
          subtext="+7% este mês"
          icon="users"
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

        <TabsContent v-if="activeTab === 'overview'">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Distribuição por Preço"
              description="Quantidade de produtos por faixa"
            >
              <BarChart :data="priceRanges" />
            </ChartCard>

            <ChartCard
              title="Produtos por Categoria"
              description="Distribuição por categoria"
            >
              <PieChart :data="categoryData" />
            </ChartCard>
          </div>
        </TabsContent>

        <TabsContent v-if="activeTab === 'sales'">
          <ChartCard
            title="Vendas Mensais"
            description="Evolução das vendas e receita"
          >
            <LineChart :data="salesData" />
          </ChartCard>
        </TabsContent>

        <TabsContent v-if="activeTab === 'products'">
          <ChartCard
            title="Análise de Produtos"
            description="Portfólio de produtos"
          >
            <BarChart :data="priceRanges" />
          </ChartCard>
        </TabsContent>

        <TabsContent v-if="activeTab === 'growth'">
          <ChartCard
            title="Crescimento do Catálogo"
            description="Evolução ao longo do tempo"
          >
            <AreaChart :data="growthData" />
          </ChartCard>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import DashboardCard from "@/app/componentsDefaults/DashboardCard.vue";
import ChartCard from "@/app/componentsDefaults/ChartCard.vue";
import Tabs from "@/app/componentsDefaults/ui/Tabs.vue";
import TabsList from "@/app/componentsDefaults/ui/TabsList.vue";
import TabsTrigger from "../app/componentsDefaults/ui/TabsTrigger.vue";
import TabsContent from "../app/componentsDefaults/ui/";
import Navigation from "../app/componentsDefaults/Navigation.vue";

// UI Components
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";

// Composables
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const activeTab = ref("overview");

onMounted(() => {
  productStore.fetchProducts();
});

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

// Dados de gráficos
const priceRanges = computed(() => [
  {
    range: "0-50",
    count: products.value.filter((p) => p.price <= 50).length,
    color: "#8884d8",
  },
  {
    range: "51-100",
    count: products.value.filter((p) => p.price > 50 && p.price <= 100).length,
    color: "#82ca9d",
  },
  {
    range: "101-200",
    count: products.value.filter((p) => p.price > 100 && p.price <= 200).length,
    color: "#ffc658",
  },
  {
    range: "201-500",
    count: products.value.filter((p) => p.price > 200 && p.price <= 500).length,
    color: "#ff7300",
  },
  {
    range: "500+",
    count: products.value.filter((p) => p.price > 500).length,
    color: "#8dd1e1",
  },
]);

const categoryData = computed(() => [
  {
    name: "Eletrônicos",
    value: Math.floor(totalProducts.value * 0.35),
    color: "#8884d8",
  },
  {
    name: "Roupas",
    value: Math.floor(totalProducts.value * 0.25),
    color: "#82ca9d",
  },
  {
    name: "Casa & Jardim",
    value: Math.floor(totalProducts.value * 0.2),
    color: "#ffc658",
  },
  {
    name: "Esportes",
    value: Math.floor(totalProducts.value * 0.15),
    color: "#ff7300",
  },
  {
    name: "Outros",
    value: Math.floor(totalProducts.value * 0.05),
    color: "#8dd1e1",
  },
]);

const salesData = ref([
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
]);

const growthData = ref([
  { periodo: "Q1 2023", produtos: 150, crescimento: 5 },
  { periodo: "Q2 2023", produtos: 180, crescimento: 20 },
  { periodo: "Q3 2023", produtos: 220, crescimento: 22 },
  { periodo: "Q4 2023", produtos: 280, crescimento: 27 },
  { periodo: "Q1 2024", produtos: 350, crescimento: 25 },
  { periodo: "Q2 2024", produtos: totalProducts.value, crescimento: 30 },
]);
</script>
