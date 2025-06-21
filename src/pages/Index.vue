<template>
  <div class="p-6 space-y-8">
    <!-- Título + botão -->
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h1 class="text-3xl font-bold tracking-tight">
          Gerenciamento de Produtos
        </h1>
        <p class="text-muted-foreground">
          Gerencie produtos com integração à Fake Store API
        </p>
      </div>
      <Button @click="openNewProductModal" class="flex items-center gap-2">
        <Plus class="h-4 w-4" />
        Novo Produto
      </Button>
    </div>

    <!-- Filtros -->
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Search class="h-5 w-5" />
          Filtros
        </CardTitle>
        <CardDescription>
          Use os filtros abaixo para encontrar produtos específicos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Nome do Produto</Label>
            <Input v-model="filters.name" placeholder="Digite o nome..." />
          </div>
          <div>
            <Label>Código de Barras</Label>
            <Input v-model="filters.barcode" placeholder="Digite o código..." />
          </div>
          <div>
            <Label>Ordenar por</Label>
            <Select v-model="filters.sortBy">
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc"
                  >Preço (Menor para Maior)</SelectItem
                >
                <SelectItem value="price_desc"
                  >Preço (Maior para Menor)</SelectItem
                >
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-end">
            <Button @click="handleSearch" class="w-full">
              <Search class="h-4 w-4 mr-2" />
              Pesquisar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Lista -->
    <Card>
      <CardHeader>
        <CardTitle class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <Package class="h-5 w-5" />
            Lista de Produtos
          </div>
          <Badge variant="secondary"
            >{{ productStore.products.length }} produtos</Badge
          >
        </CardTitle>
      </CardHeader>
      <CardContent>
        <!-- Loading -->
        <div v-if="productStore.isLoading" class="space-y-4 animate-pulse">
          <div v-for="i in 5" :key="i" class="flex space-x-4">
            <div class="h-4 bg-gray-200 rounded w-full" />
            <div class="h-4 bg-gray-200 rounded w-24" />
            <div class="h-4 bg-gray-200 rounded w-24" />
            <div class="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>

        <!-- Erro -->
        <div
          v-else-if="productStore.error"
          class="text-center py-8 text-red-600"
        >
          <AlertCircle class="h-12 w-12 mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Erro ao carregar produtos</h3>
          <p>Verifique se a API está disponível.</p>
        </div>

        <!-- Lista vazia -->
        <div
          v-else-if="productStore.products.length === 0"
          class="text-center py-8"
        >
          <Package class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
          <p class="text-gray-600 mb-4">Cadastre seu primeiro produto.</p>
          <Button @click="openNewProductModal">
            <Plus class="h-4 w-4 mr-2" />
            Cadastrar Produto
          </Button>
        </div>

        <!-- Lista com produtos -->
        <Table class="w-full table-auto">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-2 text-left">Imagem</th>
              <th class="px-4 py-2 text-left">Nome</th>
              <th class="px-4 py-2 text-left">Preço</th>
              <th class="px-4 py-2 text-left">Código de Barras</th>
              <th class="px-4 py-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in productStore.products"
              :key="product.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="px-4 py-2">
                <img
                  :src="product.image"
                  alt="Imagem"
                  class="w-12 h-12 rounded object-cover"
                  @error="handleImageError"
                />
              </td>
              <td class="px-4 py-2 font-medium">
                {{ product.name }}
              </td>
              <td class="px-4 py-2">R$ {{ product.price.toFixed(2) }}</td>
              <td class="px-4 py-2">
                {{ product.barcode }}
              </td>
              <td class="px-4 py-2">
                <div class="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    @click="editProduct(product)"
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    @click="deleteProduct(product.id)"
                  >
                    🗑️
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </CardContent>
    </Card>

    <!-- Modal -->
    <ProductModal
      :isOpen="isModalOpen"
      :onClose="handleModalClose"
      :onSave="handleSaveProduct"
      :product="editingProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  AlertCircle,
} from "lucide-vue-next";

import ProductModal from "../app/componentsDefaults/ProductModal.vue";

// UI Components
import Button from "../app/componentsDefaults/ui/Button.vue";
import Input from "../app/componentsDefaults/ui/Input.vue";
import Label from "../app/componentsDefaults/ui/Label.vue";
import Card from "@/app/components/ui/card/Card.vue";
import CardHeader from "@/app/components/ui/card/CardHeader.vue";
import CardContent from "@/app/components/ui/card/CardContent.vue";
import CardTitle from "@/app/components/ui/card/CardTitle.vue";
import CardDescription from "@/app/components/ui/card/CardDescription.vue";
import Badge from "@/app/components/ui/badge/Badge.vue";
import Table from "@/app/components/ui/table/Table.vue";
import TableHeader from "@/app/components/ui/table/TableHead.vue";
import TableBody from "@/app/components/ui/table/TableBody.vue";
import TableRow from "@/app/components/ui/table/TableRow.vue";
import TableHead from "@/app/components/ui/table/TableHead.vue";
import TableCell from "@/app/components/ui/table/TableCell.vue";
import Select from "@/app/components/ui/select/Select.vue";
import SelectTrigger from "@/app/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/app/components/ui/select/SelectValue.vue";
import SelectContent from "@/app/components/ui/select/SelectContent.vue";
import SelectItem from "@/app/components/ui/select/SelectItem.vue";

// Pinia store
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();

// Modal state
const isModalOpen = ref(false);
const editingProduct = ref(null);

// Filtros
const filters = ref({
  name: "",
  barcode: "",
  sortBy: "price_asc",
  page: 1,
  pageSize: 10,
});

// Fetch inicial
onMounted(() => {
  productStore.fetchProducts(filters.value);
});

// Refetch on filters change
watch(
  filters,
  () => {
    productStore.fetchProducts(filters.value);
  },
  { deep: true }
);

// Ações
const handleSearch = () => {
  filters.value.page = 1;
};

const openNewProductModal = () => {
  editingProduct.value = null;
  isModalOpen.value = true;
};

const editProduct = (product: any) => {
  editingProduct.value = product;
  isModalOpen.value = true;
};

const deleteProduct = (id: number) => {
  if (confirm("Deseja realmente excluir este produto?")) {
    productStore.deleteProduct(id);
  }
};

const handleSaveProduct = (product: any) => {
  if (editingProduct.value) {
    productStore.updateProduct({ ...product, id: editingProduct.value.id });
  } else {
    productStore.createProduct(product);
  }
  isModalOpen.value = false;
  editingProduct.value = null;
};

const handleModalClose = () => {
  isModalOpen.value = false;
  editingProduct.value = null;
};

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).style.display = "none";
};
</script>
