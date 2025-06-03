import { api } from '@/lib/api'
import { PurchaseOrder, PurchaseOrderCreate } from '@/types'

export const purchaseOrdersService = {
  getAll: async (params?: { skip?: number; limit?: number }) => {
    const { data } = await api.get<PurchaseOrder[]>('/purchase-orders', { params })
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get<PurchaseOrder>(`/purchase-orders/${id}`)
    return data
  },

  create: async (order: PurchaseOrderCreate) => {
    const { data } = await api.post<PurchaseOrder>('/purchase-orders', order)
    return data
  },

  update: async (id: number, order: Partial<PurchaseOrderCreate>) => {
    const { data } = await api.put<PurchaseOrder>(`/purchase-orders/${id}`, order)
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete<PurchaseOrder>(`/purchase-orders/${id}`)
    return data
  },
}