import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <Input type="text" placeholder="Enter company name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select className="w-full p-2 border rounded">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time Zone</label>
              <select className="w-full p-2 border rounded">
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
              </select>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold mb-4">Amazon Integration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Seller ID</label>
              <Input type="text" placeholder="Enter Amazon Seller ID" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <Input type="password" placeholder="Enter API Key" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Secret</label>
              <Input type="password" placeholder="Enter API Secret" />
            </div>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded">
              Test Connection
            </button>
          </div>
        </Card>
      </div>
      <Card>
        <h2 className="text-lg font-semibold mb-4">Email Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Low Stock Alerts</h3>
              <p className="text-sm text-gray-500">Get notified when inventory is low</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Order Updates</h3>
              <p className="text-sm text-gray-500">Get notified about new orders</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
};