import { useQuery } from '@tanstack/react-query'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { productsService } from '@/services/products'
import { purchaseOrdersService } from '@/services/purchase-orders'
import { suppliersService } from '@/services/suppliers'
import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export function DashboardPage() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.getAll({ limit: 100 }),
  })

  const { data: purchaseOrders } = useQuery({
    queryKey: ['purchaseOrders'],
    queryFn: () => purchaseOrdersService.getAll({ limit: 100 }),
  })

  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => suppliersService.getAll({ limit: 100 }),
  })

  const stats = [
    {
      name: 'Total Products',
      value: products?.length || 0,
      icon: Package,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Purchase Orders',
      value: purchaseOrders?.length || 0,
      icon: ShoppingCart,
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'Active Suppliers',
      value: suppliers?.filter(s => s.is_active).length || 0,
      icon: Users,
      change: '0%',
      changeType: 'neutral',
    },
    {
      name: 'Inventory Value',
      value: formatCurrency(
        products?.reduce((sum, p) => sum + p.quantity * p.cost, 0) || 0
      ),
      icon: TrendingUp,
      change: '+23%',
      changeType: 'positive',
    },
  ]

  const lowStockProducts = products?.filter(p => p.quantity <= p.min_quantity) || []

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your procurement and inventory system
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} padding="sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold">
                      <span
                        className={cn(
                          stat.changeType === 'positive' && 'text-green-600',
                          stat.changeType === 'negative' && 'text-red-600',
                          stat.changeType === 'neutral' && 'text-gray-500'
                        )}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <CardTitle>Low Stock Alert</CardTitle>
            </div>
          </CardHeader>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.min_quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={product.quantity === 0 ? 'danger' : 'warning'}>
                        {product.quantity === 0 ? 'Out of Stock' : 'Low Stock'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Purchase Orders</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {purchaseOrders?.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.po_number}</p>
                  <p className="text-sm text-gray-500">
                    {order.supplier?.name || 'Unknown Supplier'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(order.total_amount)}
                  </p>
                  <Badge variant="default" size="sm">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products by Value</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {products
              ?.sort((a, b) => b.quantity * b.cost - a.quantity * a.cost)
              .slice(0, 5)
              .map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(product.quantity * product.cost)}
                    </p>
                    <p className="text-sm text-gray-500">{product.quantity} units</p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}