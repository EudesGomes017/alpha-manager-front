import api from './api'
import type { Product, ProductFilters } from '../types/api'

export const productService = {
    async getProducts(filters?: ProductFilters) {
        const { data } = await api.get('/products', { params: filters })
        return data
    },

    async getProduct(id: string) {
        const { data } = await api.get<Product>(`/products/${id}`)
        return data
    },

    async createProduct(product: Omit<Product, 'id' | 'createdAt'>) {
        const { data } = await api.post<Product>('/products', product)
        return data
    },

    async updateProduct(product: Product) {
        await api.put(`/products/${product.id}`, product)
    },

    async deleteProduct(id: number | string) {
        await api.delete(`/products/${id}`)
    },

    async syncFromFakeStore() {
        try {
            const { data } = await api.post('/products/sync-fakestore')
            console.log('✅ Sincronização concluída:', data)
            return data
        } catch (error) {
            console.error('❌ Erro ao sincronizar com Fake Store:', error)
            throw error
        }
    }
}

export default productService
