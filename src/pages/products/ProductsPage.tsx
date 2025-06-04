import React from 'react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export const ProductsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>
      <div className="flex gap-4">
        <Input placeholder="Search products..." className="flex-1" />
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">SKU</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Stock</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center" colSpan={5}>
                  No products found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}