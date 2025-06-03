import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import {
  Home,
  Package,
  Warehouse,
  ShoppingCart,
  Users,
  Cloud,
  FileUp,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Inventory', href: '/inventory', icon: Warehouse },
  { name: 'Purchase Orders', href: '/purchase-orders', icon: ShoppingCart },
  { name: 'Suppliers', href: '/suppliers', icon: Users },
  { name: 'Amazon Integration', href: '/amazon', icon: Cloud },
  { name: 'Import/Export', href: '/import-export', icon: FileUp },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={cn('lg:hidden', sidebarOpen ? 'block' : 'hidden')}>
        <div className="fixed inset-0 flex z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-gray-900">Procurement System</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )
                    }
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">{user?.username}</p>
                  <p className="text-xs font-medium text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="ml-auto flex-shrink-0 p-2 rounded-md hover:bg-gray-100"
                >
                  <LogOut className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-gray-900">Procurement System</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div>
                  <p className="text-sm font-medium text-gray-700">{user?.username}</p>
                  <p className="text-xs font-medium text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="ml-auto flex-shrink-0 p-2 rounded-md hover:bg-gray-100"
                >
                  <LogOut className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}