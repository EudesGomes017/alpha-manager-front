export interface Product {
    id: number
    name: string
    price: number
    barcode: string
    image: string
    createdAt: string
}

export interface ProductFilters {
    name?: string
    barcode?: string
    sortBy?: 'price_asc' | 'price_desc'
    page?: number
    pageSize?: number
}

