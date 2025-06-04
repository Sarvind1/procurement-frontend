import React from 'react';
import { Card } from '@/components/ui/Card';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <h3 className="font-semibold">Total Products</h3>
          <p className="text-2xl">0</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Low Stock Items</h3>
          <p className="text-2xl">0</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Pending Orders</h3>
          <p className="text-2xl">0</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Total Suppliers</h3>
          <p className="text-2xl">0</p>
        </Card>
      </div>
    </div>
  );
};