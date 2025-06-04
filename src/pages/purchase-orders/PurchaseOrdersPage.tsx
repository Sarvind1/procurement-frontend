import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export const PurchaseOrdersPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Order
        </button>
      </div>
      <div className="flex gap-4">
        <Input placeholder="Search orders..." className="flex-1" />
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Order #</th>
                <th className="px-4 py-2">Supplier</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-center" colSpan={6}>
                  No purchase orders found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}; 