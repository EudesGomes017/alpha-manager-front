export interface Product {
    id: number;
    name: string;
    price: number;
    barcode: string;
    image: string;
}

export interface CreateProductRequest {
    name: string;
    price: number;
    barcode: string;
    image: string;
}

export interface UpdateProductRequest extends CreateProductRequest {
    id: number;
}
export interface ProductFilters {
    name: string;
    barcode: string;
    sortBy: 'price_asc' | 'price_desc';
    page: number;
    pageSize?: number;
}

// Criar produto: sem ID nem createdAt
export interface CreateProductRequest {
    id: number
    name: string
    price: number
    barcode: string
    image: string
}

// Atualizar produto: todos os campos opcionais
export interface UpdateProductRequest {
    id: number
    name: string
    price: number
    barcode: string
    image: string
}

// Resposta da API genérica
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    totalCount?: number;
}
// Exemplo de produto da Fake Store API (caso use essa fonte de dados)
export interface FakeStoreProduct {
    id: number
    title: string
    price: number
    description: string
    image: string
}

