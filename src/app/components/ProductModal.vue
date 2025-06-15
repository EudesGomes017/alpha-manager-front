<template>
  <Dialog :open="isOpen" @close="onClose">
    <DialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle class="flex items-center space-x-2">
          <Camera class="h-5 w-5" />
          <span>{{ product ? 'Editar Produto' : 'Novo Produto' }}</span>
        </DialogTitle>
      </DialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Coluna Esquerda -->
          <div class="space-y-4">
            <div>
              <Label for="name">Nome do Produto *</Label>
              <Input
                id="name"
                v-model="formData.name"
                :class="{ 'border-red-500': errors.name }"
                placeholder="Ex: Smartphone Galaxy S24"
              />
              <p v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name }}</p>
            </div>

            <div>
              <Label for="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                v-model="formData.price"
                :class="{ 'border-red-500': errors.price }"
                placeholder="Ex: 899.99"
              />
              <p v-if="errors.price" class="text-sm text-red-500 mt-1">{{ errors.price }}</p>
            </div>

            <div>
              <Label for="barcode">Código de Barras *</Label>
              <Input
                id="barcode"
                v-model="formData.barcode"
                maxlength="13"
                :class="{ 'border-red-500': errors.barcode }"
                placeholder="Ex: 7891234567890"
              />
              <p class="text-xs text-gray-500 mt-1">13 dígitos numéricos</p>
              <p v-if="errors.barcode" class="text-sm text-red-500 mt-1">{{ errors.barcode }}</p>
            </div>

            <div>
              <Label for="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                v-model="formData.image"
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <p class="text-xs text-gray-500 mt-1">Cole o link de uma imagem online</p>
            </div>
          </div>

          <!-- Coluna Direita -->
          <div class="space-y-4">
            <div>
              <Label>Imagem do Produto</Label>
              <div class="space-y-3">
                <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                  <img
                    v-if="imagePreview"
                    :src="imagePreview"
                    alt="Preview"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="flex flex-col items-center justify-center h-full text-gray-400"
                  >
                    <Camera class="h-12 w-12 mb-2" />
                    <p class="text-sm">Nenhuma imagem</p>
                  </div>
                </div>

                <div class="relative">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    @change="handleImageChange"
                    class="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    @click="() => $refs.imageUpload.click()"
                    class="w-full"
                  >
                    <Upload class="h-4 w-4 mr-2" />
                    Upload de Imagem
                  </Button>
                </div>

                <Button
                  v-if="imagePreview"
                  type="button"
                  variant="ghost"
                  size="sm"
                  @click="removeImage"
                  class="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X class="h-4 w-4 mr-2" />
                  Remover Imagem
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 class="font-medium text-green-900 mb-2">Integração Backend C# API</h4>
          <div class="text-sm text-green-700 space-y-1">
            <p>• Dados salvos no SQL Server via .NET Core API</p>
            <p>• Integração automática com Fake Store API</p>
            <p>• Validações de segurança contra SQL Injection</p>
            <p>• API RESTful com documentação Swagger</p>
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" variant="outline" @click="onClose">
            Cancelar
          </Button>
          <Button type="submit" class="bg-blue-600 hover:bg-blue-700">
            {{ product ? 'Atualizar' : 'Cadastrar' }} Produto
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { Camera, Upload, X } from 'lucide-vue-next';
import Button from '@/components/ui/Button.vue';
import Input from '@/components/ui/Input.vue';
import Label from '@/components/ui/Label.vue';
import Dialog from '@/components/ui/Dialog.vue';
import DialogContent from '@/components/ui/DialogContent.vue';
import DialogHeader from '@/components/ui/DialogHeader.vue';
import DialogTitle from '@/components/ui/DialogTitle.vue';
import { useToast } from '@/composables/useToast';

interface Product {
  id: number;
  name: string;
  price: number;
  barcode: string;
  image: string;
  createdAt: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  product: Product | null;
}

const props = defineProps<ProductModalProps>();

const { addToast } = useToast();

const formData = reactive({
  name: '',
  price: '',
  barcode: '',
  image: '',
});

const errors = reactive<Record<string, string>>({});
const imagePreview = ref('');

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      formData.name = newProduct.name;
      formData.price = newProduct.price.toString();
      formData.barcode = newProduct.barcode;
      formData.image = newProduct.image;
      imagePreview.value = newProduct.image;
    } else {
      formData.name = '';
      formData.price = '';
      formData.barcode = '';
      formData.image = '';
      imagePreview.value = '';
    }
    Object.keys(errors).forEach((key) => (errors[key] = ''));
  },
  { immediate: true }
);

const validateForm = () => {
  const newErrors: Record<string, string> = {};

  if (!formData.name.trim()) {
    newErrors.name = 'Nome do produto é obrigatório';
  }

  if (!formData.price || parseFloat(formData.price) <= 0) {
    newErrors.price = 'Preço deve ser maior que zero';
  }

  if (!formData.barcode.trim()) {
    newErrors.barcode = 'Código de barras é obrigatório';
  } else if (!/^\d{13}$/.test(formData.barcode)) {
    newErrors.barcode = 'Código de barras deve ter 13 dígitos';
  }

  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (!validateForm()) {
    addToast({
      title: 'Erro de validação',
      description: 'Por favor, corrija os campos obrigatórios.',
      type: 'error',
    });
    return;
  }

  const productData = {
    name: formData.name.trim(),
    price: parseFloat(formData.price),
    barcode: formData.barcode.trim(),
    image: imagePreview.value || 'https://via.placeholder.com/300?text=Sem+Imagem',
  };

  props.onSave(productData);
};

const handleImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      addToast({
        title: 'Arquivo muito grande',
        description: 'A imagem deve ter no máximo 5MB.',
        type: 'error',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      imagePreview.value = result;
      formData.image = result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  imagePreview.value = '';
  formData.image = '';
};
</script>
