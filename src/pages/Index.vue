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
          Use os filtros abaixo para encontrar produtos específicos
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
                <SelectValue />
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
          <Badge variant="secondary">
            {{ totalCount }} produto<span v-if="totalCount !== 1">s</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="isLoading" class="space-y-4 animate-pulse">
          <div v-for="i in 5" :key="i" class="flex space-x-4">
            <div class="h-4 bg-gray-200 rounded w-full" />
            <div class="h-4 bg-gray-200 rounded w-24" />
            <div class="h-4 bg-gray-200 rounded w-24" />
            <div class="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>

        <div v-else-if="error" class="text-center py-8 text-red-600">
          <AlertCircle class="h-12 w-12 mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Erro ao carregar produtos</h3>
          <p>Verifique se a API está disponível.</p>
        </div>

        <div v-else-if="products.length === 0" class="text-center py-8">
          <Package class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
          <p class="text-gray-600 mb-4">Cadastre seu primeiro produto.</p>
          <Button @click="openNewProductModal">
            <Plus class="h-4 w-4 mr-2" />
            Cadastrar Produto
          </Button>
        </div>

        <Table v-else>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="product in products" :key="product.id">
              <TableCell>
                <img
                  :src="product.image"
                  alt=""
                  class="w-12 h-12 rounded object-cover"
                  @error="handleImageError($event)"
                />
              </TableCell>
              <TableCell class="font-medium">{{ product.name }}</TableCell>
              <TableCell>R$ {{ product.price.toFixed(2) }}</TableCell>
              <TableCell>{{ product.barcode }}</TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    @click="editProduct(product)"
                  >
                    <Edit class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    @click="deleteProduct(product.id)"
                  >
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
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
import { ref } from "vue";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  AlertCircle,
} from "lucide-vue-next";
import ProductModal from "../app/componentsDefaults/ProductModal.vue";

import Button from "../app/componentsDefaults/ui/Button.vue";
import Input from "../app/componentsDefaults/ui/Input.vue";
import Label from "../app/componentsDefaults/ui/Label.vue";
import Card from "@/app/components/ui/card/Card.vue";
import CardHeader from "@/app/components/ui/card/CardHeader.vue";
import CardContent from "@/app/components/ui/card/CardContent.vue";
import CardTitle from "@/app/components/ui//card/CardTitle.vue";
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

import { useProducts } from "@/app/componentsDefaults/composables/useProducts";

const isModalOpen = ref(false);
const editingProduct = ref(null);

const filters = ref({
  name: "",
  barcode: "",
  sortBy: "price_asc",
  page: 1,
  pageSize: 10,
});

const {
  products,
  totalCount,
  isLoading,
  error,
  createProduct,
  updateProduct,
  deleteProduct,
} = useProducts(filters);

const handleSearch = () => {
  filters.value.page = 1;
};

const editProduct = (product: any) => {
  editingProduct.value = product;
  isModalOpen.value = true;
};

const deleteProductHandler = (id: number) => {
  if (confirm("Deseja realmente excluir?")) {
    deleteProduct(id);
  }
};

const handleModalClose = () => {
  isModalOpen.value = false;
  editingProduct.value = null;
};

const handleSaveProduct = (product: any) => {
  if (editingProduct.value) {
    updateProduct({ ...product, id: editingProduct.value.id });
  } else {
    createProduct(product);
  }
  handleModalClose();
};

const openNewProductModal = () => {
  editingProduct.value = null;
  isModalOpen.value = true;
};

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).style.display = "none";
};
</script>
