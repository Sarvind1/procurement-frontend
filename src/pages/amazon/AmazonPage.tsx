import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export const AmazonPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Amazon Integration</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Sync Data
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Sales</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Orders</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span>Average Order Value</span>
              <span className="font-medium">$0.00</span>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold mb-4">Inventory Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>FBA Stock</span>
              <span className="font-medium">0 units</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Orders</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span>Low Stock Items</span>
              <span className="font-medium">0</span>
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center" colSpan={6}>
                  No recent orders found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}; 