import { api } from '@/lib/api'
import { InventoryMovement, InventoryMovementCreate } from '@/types'

export const inventoryService = {
  getMovements: async (params?: { skip?: number; limit?: number }) => {
    const { data } = await api.get<InventoryMovement[]>('/inventory', { params })
    return data
  },

  createMovement: async (movement: InventoryMovementCreate) => {
    const { data } = await api.post<InventoryMovement>('/inventory', movement)
    return data
  },
}