import type {
    Product,
    CreateProductRequest,
    UpdateProductRequest,
    ProductFilters,
    ApiResponse,
    FakeStoreProduct
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7001/api';
const FAKE_STORE_API_URL = 'https://fakestoreapi.com';

class ApiService {
    delete(arg0: string) {
        throw new Error('Method not implemented.');
    }
    put(arg0: string, product: Product) {
        throw new Error('Method not implemented.');
    }
    get(arg0: string, arg1: { params: ProductFilters; }): { data: any; } | PromiseLike<{ data: any; }> {
        throw new Error('Method not implemented.');
    }
    post(arg0: string, product: Omit<Product, "id" | "createdAt">): { data: any; } | PromiseLike<{ data: any; }> {
        throw new Error('Method not implemented.');
    }
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${API_BASE_URL}${endpoint}`;

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            console.log(`API Request: ${config.method || 'GET'} ${url}`);

            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // 🔗 Fallback Fake Store API
    private async getFakeStoreProducts(): Promise<ApiResponse<Product[]>> {
        try {
            const response = await fetch(`${FAKE_STORE_API_URL}/products`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const fakeStoreProducts: FakeStoreProduct[] = await response.json();

            const products: Product[] = fakeStoreProducts.map((product, index) => ({
                id: product.id || index + 1,
                name: product.title,
                price: product.price,
                barcode: `789${String(product.id || index + 1).padStart(10, '0')}`,
                image: product.image,
                createdAt: new Date().toISOString(),
                category: 'default'
            }));

            return {
                data: products,
                success: true,
                message: 'Products loaded from Fake Store API',
                totalCount: products.length,
            };
        } catch (error) {
            console.error('Fake Store API Error:', error);
            throw error;
        }
    }

    // 🟩 CRUD Operations
    async getProducts(filters?: ProductFilters): Promise<ApiResponse<Product[]>> {
        try {
            const queryParams = new URLSearchParams();

            if (filters?.name) queryParams.append('name', filters.name);
            if (filters?.barcode) queryParams.append('barcode', filters.barcode);
            if (filters?.sortBy) queryParams.append('sortBy', filters.sortBy);
            if (filters?.page) queryParams.append('page', filters.page.toString());
            if (filters?.pageSize) queryParams.append('pageSize', filters.pageSize.toString());

            const queryString = queryParams.toString();
            const endpoint = `/products${queryString ? `?${queryString}` : ''}`;

            return await this.request<Product[]>(endpoint);
        } catch (error) {
            console.warn('Local API not available, fallback to Fake Store API');

            const response = await this.getFakeStoreProducts();

            let filteredProducts = response.data;

            if (filters?.name) {
                filteredProducts = filteredProducts.filter(p =>
                    p.name.toLowerCase().includes(filters.name.toLowerCase())
                );
            }

            if (filters?.barcode) {
                filteredProducts = filteredProducts.filter(p =>
                    p.barcode.includes(filters.barcode)
                );
            }

            if (filters?.sortBy) {
                if (filters.sortBy === 'price_asc') {
                    filteredProducts.sort((a, b) => a.price - b.price);
                } else if (filters.sortBy === 'price_desc') {
                    filteredProducts.sort((a, b) => b.price - a.price);
                }
            }

            return {
                ...response,
                data: filteredProducts,
                totalCount: filteredProducts.length,
            };
        }
    }

    async getProduct(id: number): Promise<ApiResponse<Product>> {
        try {
            return await this.request<Product>(`/products/${id}`);
        } catch (error) {
            console.warn('Local API not available, fallback to Fake Store API');

            const response = await fetch(`${FAKE_STORE_API_URL}/products/${id}`);
            const fakeStoreProduct: FakeStoreProduct = await response.json();

            const product: Product = {
                id: fakeStoreProduct.id || id,
                name: fakeStoreProduct.title,
                price: fakeStoreProduct.price,
                barcode: `789${String(id).padStart(10, '0')}`,
                image: fakeStoreProduct.image,
            };

            return {
                data: product,
                success: true,
                message: 'Product loaded from Fake Store API',
            };
        }
    }

    async createProduct(product: CreateProductRequest): Promise<ApiResponse<Product>> {
        try {
            await this.replicateToFakeStore(product);

            return await this.request<Product>('/products', {
                method: 'POST',
                body: JSON.stringify(product),
            });
        } catch (error) {
            console.warn('Local API not available, simulating product creation');

            const newProduct: Product = {
                id: Date.now(),
                name: product.name,
                price: product.price,
                barcode: product.barcode,
                image: product.image,
            };

            await this.replicateToFakeStore(product);

            return {
                data: newProduct,
                success: true,
                message: 'Product created (demo mode - changes not persisted)',
            };
        }
    }

    async updateProduct(product: UpdateProductRequest): Promise<ApiResponse<Product>> {
        try {
            await this.updateInFakeStore(product);

            return await this.request<Product>(`/products/${product.id}`, {
                method: 'PUT',
                body: JSON.stringify(product),
            });
        } catch (error) {
            console.warn('Local API not available, simulating product update');

            const updatedProduct: Product = {
                id: product.id,
                name: product.name,
                price: product.price,
                barcode: product.barcode,
                image: product.image,
            };

            await this.updateInFakeStore(product);

            return {
                data: updatedProduct,
                success: true,
                message: 'Product updated (demo mode - changes not persisted)',
            };
        }
    }

    async deleteProduct(id: number): Promise<ApiResponse<void>> {
        try {
            await this.deleteFromFakeStore(id);

            return await this.request<void>(`/products/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.warn('Local API not available, simulating product deletion');

            await this.deleteFromFakeStore(id);

            return {
                data: undefined,
                success: true,
                message: 'Product deleted (demo mode - changes not persisted)',
            };
        }
    }

    // 🔗 Fake Store API helpers
    private async replicateToFakeStore(product: CreateProductRequest): Promise<void> {
        try {
            const fakeStorePayload: FakeStoreProduct = {
                id: product.id,
                title: product.name,
                price: product.price,
                description: `Produto: ${product.name} - Código: ${product.barcode}`,
                image: product.image || 'https://via.placeholder.com/300',

            };

            await fetch(`${FAKE_STORE_API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fakeStorePayload),
            });
        } catch (error) {
            console.warn('Failed to replicate to Fake Store API:', error);
        }
    }

    private async updateInFakeStore(product: UpdateProductRequest): Promise<void> {
        try {
            const fakeStorePayload: FakeStoreProduct = {
                id: product.id,
                title: product.name,
                price: product.price,
                description: `Produto: ${product.name} - Código: ${product.barcode}`,
                image: product.image || 'https://via.placeholder.com/300',
            };

            await fetch(`${FAKE_STORE_API_URL}/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fakeStorePayload),
            });
        } catch (error) {
            console.warn('Failed to update in Fake Store API:', error);
        }
    }

    private async deleteFromFakeStore(id: number): Promise<void> {
        try {
            await fetch(`${FAKE_STORE_API_URL}/products/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.warn('Failed to delete from Fake Store API:', error);
        }
    }
}

//export const apiService = new ApiService();

const apiService = new ApiService();
export default apiService;