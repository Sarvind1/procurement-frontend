import React from 'react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReactTable, getCoreRowModel, ColumnDef } from '@tanstack/react-table'
import { inventoryService } from '@/services/inventory'
import { productsService } from '@/services/products'
import { InventoryMovement, InventoryMovementCreate, Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { DataTable } from '@/components/ui/DataTable'
import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatDate, getMovementTypeColor } from '@/lib/utils'
import { Plus, TrendingUp, TrendingDown, RefreshCw, Undo } from 'lucide-react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

export const InventoryPage: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data: movements, isLoading, error } = useQuery({
    queryKey: ['inventory-movements'],
    queryFn: () => inventoryService.getMovements(),
    retry: 1,
  })

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.getAll(),
    retry: 1,
  })

  const createMutation = useMutation({
    mutationFn: inventoryService.createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-movements'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Inventory movement recorded successfully')
      setIsCreateOpen(false)
    },
    onError: (error: any) => {
      console.error('Error creating movement:', error)
      toast.error(error.response?.data?.detail || 'Failed to create movement')
    },
  })

  const movementTypeIcons = {
    purchase: TrendingUp,
    sale: TrendingDown,
    adjustment: RefreshCw,
    return: Undo,
  }

  const columns: ColumnDef<InventoryMovement>[] = [
    {
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => {
        const product = products?.find(p => p.id === row.original.product_id)
        return (
          <div>
            <p className="font-medium">{product?.name || 'Unknown'}</p>
            <p className="text-sm text-gray-500">{product?.sku}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'movement_type',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.original.movement_type
        const Icon = movementTypeIcons[type]
        return (
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4" />
            <Badge className={getMovementTypeColor(type)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => {
        const qty = row.original.quantity
        const isPositive = row.original.movement_type === 'purchase' || row.original.movement_type === 'return'
        return (
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
            {isPositive ? '+' : ''}{qty}
          </span>
        )
      },
    },
    {
      accessorKey: 'reference_id',
      header: 'Reference',
      cell: ({ row }) => row.original.reference_id || '-',
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }) => row.original.notes || '-',
    },
  ]

  // Calculate stats
  const stats = {
    totalMovements: movements?.length || 0,
    purchases: movements?.filter(m => m.movement_type === 'purchase').length || 0,
    sales: movements?.filter(m => m.movement_type === 'sale').length || 0,
    adjustments: movements?.filter(m => m.movement_type === 'adjustment').length || 0,
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Movement
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Movements</CardTitle>
            <p className="text-2xl font-bold">{stats.totalMovements}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Purchases</CardTitle>
            <p className="text-2xl font-bold text-green-600">{stats.purchases}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales</CardTitle>
            <p className="text-2xl font-bold text-blue-600">{stats.sales}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Adjustments</CardTitle>
            <p className="text-2xl font-bold text-yellow-600">{stats.adjustments}</p>
          </CardHeader>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading inventory data: {error.message}
        </div>
      )}

      {/* Data Table */}
      <Card>
        <DataTable 
          columns={columns} 
          data={movements || []} 
          isLoading={isLoading}
        />
      </Card>

      {/* Create Movement Modal */}
      <MovementFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        isLoading={createMutation.isPending}
        products={products || []}
      />
    </div>
  )
}

interface MovementFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: InventoryMovementCreate) => void
  isLoading: boolean
  products: Product[]
}

function MovementFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  products,
}: MovementFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<InventoryMovementCreate>()

  const movementType = watch('movement_type')

  const handleFormSubmit = (data: InventoryMovementCreate) => {
    onSubmit({
      ...data,
      product_id: Number(data.product_id),
      quantity: Number(data.quantity),
    })
    reset()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Record Inventory Movement"
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product
          </label>
          <select
            {...register('product_id', { required: 'Product is required' })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a product</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.sku})
              </option>
            ))}
          </select>
          {errors.product_id && (
            <p className="mt-1 text-sm text-red-500">{errors.product_id.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Movement Type
          </label>
          <select
            {...register('movement_type', { required: 'Movement type is required' })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select movement type</option>
            <option value="purchase">Purchase</option>
            <option value="sale">Sale</option>
            <option value="adjustment">Adjustment</option>
            <option value="return">Return</option>
          </select>
          {errors.movement_type && (
            <p className="mt-1 text-sm text-red-500">{errors.movement_type.message}</p>
          )}
        </div>

        <Input
          label="Quantity"
          type="number"
          {...register('quantity', {
            required: 'Quantity is required',
            min: { value: 1, message: 'Quantity must be at least 1' },
          })}
          error={errors.quantity?.message}
        />

        <Input
          label="Reference ID (Optional)"
          placeholder="e.g., PO-2024-001"
          {...register('reference_id')}
        />

        <Input
          label="Notes (Optional)"
          {...register('notes')}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Record Movement
          </Button>
        </div>
      </form>
    </Modal>
  )
}