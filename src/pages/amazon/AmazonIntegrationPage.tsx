import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { amazonService } from '@/services/amazon'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Cloud, RefreshCw, Package, ShoppingCart, AlertCircle, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/utils'

export function AmazonIntegrationPage() {
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null)

  const { data: amazonProducts } = useQuery({
    queryKey: ['amazon-products'],
    queryFn: amazonService.getProducts,
  })

  const syncOrdersMutation = useMutation({
    mutationFn: amazonService.syncOrders,
    onSuccess: () => {
      toast.success('Orders synced successfully')
      setLastSyncTime(new Date())
    },
  })

  const syncInventoryMutation = useMutation({
    mutationFn: amazonService.syncInventory,
    onSuccess: () => {
      toast.success('Inventory synced successfully')
      setLastSyncTime(new Date())
    },
  })

  const integrationStatus = {
    connected: true, // This would come from actual API
    lastSync: lastSyncTime || new Date('2024-03-01'),
    pendingOrders: 5,
    syncedProducts: 150,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Amazon Integration</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your Amazon SP-API integration and sync data
        </p>
      </div>

      {/* Status Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>Amazon SP-API connection status and sync information</CardDescription>
            </div>
            <Badge variant={integrationStatus.connected ? 'success' : 'danger'} className="flex items-center space-x-1">
              {integrationStatus.connected ? (
                <><CheckCircle className="h-3 w-3" /> Connected</>
              ) : (
                <><AlertCircle className="h-3 w-3" /> Disconnected</>
              )}
            </Badge>
          </div>
        </CardHeader>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Last Sync</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formatDate(integrationStatus.lastSync)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Orders</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {integrationStatus.pendingOrders}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Synced Products</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {integrationStatus.syncedProducts}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Sync Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 text-gray-400 mr-2" />
              <CardTitle>Order Sync</CardTitle>
            </div>
            <CardDescription>Sync orders from Amazon to your local system</CardDescription>
          </CardHeader>
          <div className="p-6 pt-0">
            <Button
              onClick={() => syncOrdersMutation.mutate()}
              isLoading={syncOrdersMutation.isPending}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Orders
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Package className="h-5 w-5 text-gray-400 mr-2" />
              <CardTitle>Inventory Sync</CardTitle>
            </div>
            <CardDescription>Update inventory levels on Amazon</CardDescription>
          </CardHeader>
          <div className="p-6 pt-0">
            <Button
              onClick={() => syncInventoryMutation.mutate()}
              isLoading={syncInventoryMutation.isPending}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Inventory
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Cloud className="h-5 w-5 text-gray-400 mr-2" />
              <CardTitle>Full Sync</CardTitle>
            </div>
            <CardDescription>Perform a complete sync of all data</CardDescription>
          </CardHeader>
          <div className="p-6 pt-0">
            <Button
              onClick={() => {
                syncOrdersMutation.mutate()
                syncInventoryMutation.mutate()
              }}
              isLoading={syncOrdersMutation.isPending || syncInventoryMutation.isPending}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Full Sync
            </Button>
          </div>
        </Card>
      </div>

      {/* Amazon Products */}
      <Card>
        <CardHeader>
          <CardTitle>Amazon Products</CardTitle>
          <CardDescription>Products currently listed on Amazon</CardDescription>
        </CardHeader>
        <div className="p-6 pt-0">
          {amazonProducts && amazonProducts.length > 0 ? (
            <div className="space-y-4">
              {amazonProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-gray-500">ASIN: {product.asin}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.price}</p>
                    <p className="text-sm text-gray-500">{product.stock} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">
              No Amazon products found. Sync your products to get started.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}