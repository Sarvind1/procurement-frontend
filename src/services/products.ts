import { api } from '@/lib/api'
import { Product, ProductCreate, ProductUpdate } from '@/types'

export const productsService = {
  getAll: async (params?: { skip?: number; limit?: number }) => {
    const { data } = await api.get<Product[]>('/products', { params })
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  },

  create: async (product: ProductCreate) => {
    const { data } = await api.post<Product>('/products', product)
    return data
  },

  update: async (id: number, product: ProductUpdate) => {
    const { data } = await api.put<Product>(`/products/${id}`, product)
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete<Product>(`/products/${id}`)
    return data
  },
}