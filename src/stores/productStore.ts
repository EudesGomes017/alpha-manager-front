// src/stores/productStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product, ProductFilters } from '../types/api'
import api from '../services/api'
import { useToast } from '../app/componentsDefaults/composables/useToast'

export const useProductStore = defineStore('product', () => {
    const products = ref<Product[]>([])
    const totalCount = ref(0)
    const isLoading = ref(false)
    const error = ref<Error | null>(null)

    const { addToast } = useToast()

    const fetchProducts = async (filters: ProductFilters) => {
        isLoading.value = true
        error.value = null

        try {
            const { data } = await api.get('/products', { params: filters })
            products.value = data.items
            totalCount.value = data.totalCount
        } catch (err: any) {
            error.value = err
            addToast({
                title: 'Erro ao carregar produtos',
                description: err.message,
                type: 'error',
            })
        } finally {
            isLoading.value = false
        }
    }

    const createProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
        const { data } = await api.post('/products', product)
        products.value.unshift(data)
        totalCount.value++
        addToast({ title: 'Produto criado com sucesso', type: 'success' })
    }

    const updateProduct = async (product: Product) => {
        await api.put(`/products/${product.id}`, product)
        const index = products.value.findIndex(p => p.id === product.id)
        if (index !== -1) products.value[index] = product
        addToast({ title: 'Produto atualizado', type: 'success' })
    }

    const deleteProduct = async (id: number) => {
        await api.delete(`/products/${id}`)
        products.value = products.value.filter(p => p.id !== id)
        totalCount.value--
        addToast({ title: 'Produto excluído', type: 'success' })
    }

    return {
        products,
        totalCount,
        isLoading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    }
})
