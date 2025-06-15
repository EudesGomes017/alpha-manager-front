import { ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import type { ProductFilters, Product } from '../../../types/api'
import { useToast } from '../composables/useToast'
import api from '../../../services/api' // Ajuste para seu httpClient/axios

export function useProducts(filters: Ref<ProductFilters>) {
    const { addToast } = useToast()

    const products = ref<Product[]>([])
    const totalCount = ref(0)
    const isLoading = ref(false)
    const error = ref<Error | null>(null)

    const isCreating = ref(false)
    const isUpdating = ref(false)
    const isDeleting = ref(false)

    // ✅ Fetch produtos
    const fetchProducts = async () => {
        isLoading.value = true
        error.value = null

        try {
            const { data } = await api.get('/products', {
                params: filters.value,
            })

            products.value = data.items
            totalCount.value = data.totalCount
        } catch (err: any) {
            error.value = err
            addToast({
                title: 'Erro ao carregar produtos',
                description: err.message || 'Não foi possível buscar os dados.',
                type: 'error',
            })
        } finally {
            isLoading.value = false
        }
    }

    watch(filters, fetchProducts, { immediate: true })

    // ✅ Criar
    const createProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
        isCreating.value = true
        try {
            await api.post('/products', product)
            addToast({ title: 'Produto cadastrado com sucesso', type: 'success' })
            await fetchProducts()
        } catch (err: any) {
            addToast({ title: 'Erro ao cadastrar produto', description: err.message, type: 'error' })
        } finally {
            isCreating.value = false
        }
    }

    // ✅ Atualizar
    const updateProduct = async (product: Product) => {
        isUpdating.value = true
        try {
            await api.put(`/products/${product.id}`, product)
            addToast({ title: 'Produto atualizado', type: 'success' })
            await fetchProducts()
        } catch (err: any) {
            addToast({ title: 'Erro ao atualizar', description: err.message, type: 'error' })
        } finally {
            isUpdating.value = false
        }
    }

    // ✅ Deletar
    const deleteProduct = async (id: number) => {
        isDeleting.value = true
        try {
            await api.delete(`/products/${id}`)
            addToast({ title: 'Produto excluído', type: 'success' })
            await fetchProducts()
        } catch (err: any) {
            addToast({ title: 'Erro ao excluir', description: err.message, type: 'error' })
        } finally {
            isDeleting.value = false
        }
    }

    return {
        products,
        totalCount,
        isLoading,
        error,
        isCreating,
        isUpdating,
        isDeleting,
        createProduct,
        updateProduct,
        deleteProduct,
    }
}
