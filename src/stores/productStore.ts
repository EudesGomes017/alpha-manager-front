import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product, ProductFilters } from '../types/api'
import productService from '../services/productService'
import { useToast } from '../app/componentsDefaults/composables/useToast'

export const useProductStore = defineStore('product', () => {
    const products = ref<Product[]>([])
    const totalCount = ref(0)
    const isLoading = ref(false)
    const error = ref<Error | null>(null)

    const { addToast } = useToast()

    // 🔍 Buscar Produtos
    const fetchProducts = async (filters?: ProductFilters) => {
        isLoading.value = true
        error.value = null

        try {
            const data = await productService.getProducts(filters)
            products.value = data
            totalCount.value = data.length
        } catch (err: any) {
            error.value = err
            products.value = []
            totalCount.value = 0
            addToast({
                title: 'Erro ao carregar produtos',
                description: err.message,
                type: 'error',
            })
        } finally {
            isLoading.value = false
        }
    }

    // 🔄 Sincronizar com Fake Store
    const syncProducts = async () => {
        try {
            await productService.syncFromFakeStore()
            await fetchProducts()
            addToast({ title: 'Sincronização concluída', type: 'success' })
        } catch (err) {
            addToast({ title: 'Erro na sincronização', type: 'error' })
        }
    }

    // 🆕 Criar Produto
    const createProduct = async (product: Omit<Product, 'id'>) => {
        try {
            const data = await productService.createProduct(product)
            await fetchProducts()
            const exists = products.value.find(p => p.id === data.id)
            if (!exists) {
                products.value.unshift(data)
                totalCount.value++
            }
            addToast({ title: 'Produto criado com sucesso', type: 'success' })
        } catch (err: any) {
            error.value = err
            addToast({
                title: 'Erro ao criar produto',
                description: err.message,
                type: 'error',
            })
        }
    }

    // 🔁 Atualizar Produto
    const updateProduct = async (product: Product) => {
        await productService.updateProduct(product)
        await fetchProducts()
        const index = products.value.findIndex(p => p.id === product.id)
        if (index !== -1) products.value[index] = product
        addToast({ title: 'Produto atualizado', type: 'success' })
    }

    // ❌ Deletar Produto
    const deleteProduct = async (id: number) => {
        await productService.deleteProduct(id.toString())
        await fetchProducts()
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
        syncProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    }
})
