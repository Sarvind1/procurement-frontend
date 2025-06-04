import React from 'react'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReactTable, getCoreRowModel, ColumnDef } from '@tanstack/react-table'
import { inventoryService } from '@/services/inventory'
import { productsService } from '@/services/products'
import { InventoryMovement, InventoryMovementCreate, Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
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

  const { data: movements, isLoading } = useQuery({
    queryKey: ['inventory-movements'],
    queryFn: () => inventoryService.getMovements(),
  })

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.getAll(),
  })

  const createMutation = useMutation({
    mutationFn: inventoryService.createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory-movements'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Inventory movement recorded successfully')
      setIsCreateOpen(false)
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

  const table = useReactTable({
    data: movements || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Movement
        </button>
      </div>
      <div className="flex gap-4">
        <Input placeholder="Search inventory..." className="flex-1" />
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Reference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center" colSpan={5}>
                  No inventory movements found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
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
  } = useForm<InventoryMovementCreate>()

  const handleFormSubmit = (data: InventoryMovementCreate) => {
    onSubmit({
      ...data,
      product_id: Number(data.product_id),
      quantity: Number(data.quantity),
    })
    reset()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Inventory Movement"
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Select
          label="Product"
          options={products.map(p => ({ value: p.id, label: `${p.name} (${p.sku})` }))}
          {...register('product_id', { required: 'Product is required' })}
          error={errors.product_id?.message}
        />

        <Select
          label="Movement Type"
          options={[
            { value: 'purchase', label: 'Purchase' },
            { value: 'sale', label: 'Sale' },
            { value: 'adjustment', label: 'Adjustment' },
            { value: 'return', label: 'Return' },
          ]}
          {...register('movement_type', { required: 'Movement type is required' })}
          error={errors.movement_type?.message}
        />

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
          <Button variant="outline" onClick={onClose}>
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