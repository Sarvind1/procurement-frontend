import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/authStore'
import { Key, User, Bell, Database } from 'lucide-react'
import toast from 'react-hot-toast'

export function SettingsPage() {
  const user = useAuthStore((state) => state.user)

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-8">
        {/* User Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <CardTitle>User Profile</CardTitle>
            </div>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <div className="p-6 pt-0 space-y-4">
            <Input
              label="Username"
              value={user?.username || ''}
              disabled
            />
            <Input
              label="Email"
              type="email"
              value={user?.email || ''}
            />
            <Input
              label="Full Name"
              placeholder="Enter your full name"
            />
            <Button onClick={handleSaveSettings}>
              Save Changes
            </Button>
          </div>
        </Card>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Key className="h-5 w-5 text-gray-400 mr-2" />
              <CardTitle>API Configuration</CardTitle>
            </div>
            <CardDescription>
              Configure your Amazon SP-API credentials
            </CardDescription>
          </CardHeader>
          <div className="p-6 pt-0 space-y-4">
            <Input
              label="Amazon Refresh Token"
              type="password"
              placeholder="Enter your Amazon refresh token"
            />
            <Input
              label="Client ID"
              placeholder="Enter your client ID"
            />
            <Input
              label="Client Secret"
              type="password"
              placeholder="Enter your client secret"
            />
            <Input
              label="Marketplace ID"
              placeholder="Enter your marketplace ID"
              defaultValue="ATVPDKIKX0DER"
            />
            <Button onClick={handleSaveSettings}>
              Save API Settings
            </Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-400 mr-2" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <div className="p-6 pt-0 space-y-4">
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Low stock alerts
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Order status updates
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Amazon sync notifications
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Daily summary emails
                </span>
              </label>
            </div>
            <Button onClick={handleSaveSettings}>
              Save Preferences
            </Button>
          </div>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Database className="h-5 w-5 text-gray-400 mr-2" />
              <CardTitle>System Information</CardTitle>
            </div>
            <CardDescription>
              System status and information
            </CardDescription>
          </CardHeader>
          <div className="p-6 pt-0">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Version</span>
                <span className="text-sm font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">API Status</span>
                <span className="text-sm font-medium text-green-600">Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Database</span>
                <span className="text-sm font-medium">PostgreSQL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Last Backup</span>
                <span className="text-sm font-medium">2 hours ago</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}