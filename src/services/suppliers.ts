import { api } from '@/lib/api'
import { Supplier, SupplierCreate, SupplierUpdate } from '@/types'

export const suppliersService = {
  getAll: async (params?: { skip?: number; limit?: number }) => {
    const { data } = await api.get<Supplier[]>('/suppliers', { params })
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get<Supplier>(`/suppliers/${id}`)
    return data
  },

  create: async (supplier: SupplierCreate) => {
    const { data } = await api.post<Supplier>('/suppliers', supplier)
    return data
  },

  update: async (id: number, supplier: SupplierUpdate) => {
    const { data } = await api.put<Supplier>(`/suppliers/${id}`, supplier)
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete<Supplier>(`/suppliers/${id}`)
    return data
  },
}