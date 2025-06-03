import { api } from '@/lib/api'
import { AmazonProduct } from '@/types'

export const amazonService = {
  getProducts: async () => {
    const { data } = await api.get<AmazonProduct[]>('/amazon')
    return data
  },

  syncOrders: async () => {
    const { data } = await api.post('/amazon/sync-orders')
    return data
  },

  syncInventory: async () => {
    const { data } = await api.post('/amazon/sync-inventory')
    return data
  },

  updateInventory: async (sku: string, quantity: number) => {
    const { data } = await api.post('/amazon/update-inventory', { sku, quantity })
    return data
  },
}