// User types
export interface User {
  id: number
  username: string
  email: string
  is_active: boolean
  is_superuser: boolean
  created_at: string
  updated_at?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

// Product types
export interface Product {
  id: number
  sku: string
  asin?: string
  name: string
  description?: string
  price: number
  cost: number
  quantity: number
  min_quantity: number
  is_active: boolean
  created_at: string
  updated_at?: string
}

export interface ProductCreate {
  sku: string
  asin?: string
  name: string
  description?: string
  price: number
  cost: number
  quantity: number
  min_quantity: number
  is_active?: boolean
}

export interface ProductUpdate {
  name?: string
  description?: string
  price?: number
  cost?: number
  quantity?: number
  min_quantity?: number
  is_active?: boolean
}

// Inventory types
export interface InventoryMovement {
  id: number
  product_id: number
  quantity: number
  movement_type: 'purchase' | 'sale' | 'adjustment' | 'return'
  reference_id?: string
  notes?: string
  created_at: string
  product?: Product
}

export interface InventoryMovementCreate {
  product_id: number
  quantity: number
  movement_type: 'purchase' | 'sale' | 'adjustment' | 'return'
  reference_id?: string
  notes?: string
}

// Purchase Order types
export enum PurchaseOrderStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  ORDERED = 'ordered',
  RECEIVED = 'received',
  CANCELLED = 'cancelled',
}

export interface PurchaseOrderItem {
  id: number
  purchase_order_id: number
  product_id: number
  quantity: number
  unit_price: number
  total_price: number
  received_quantity: number
  created_at: string
  updated_at?: string
  product?: Product
}

export interface PurchaseOrderItemCreate {
  product_id: number
  quantity: number
  unit_price: number
  total_price: number
}

export interface PurchaseOrder {
  id: number
  po_number: string
  supplier_id: number
  status: PurchaseOrderStatus
  total_amount: number
  currency: string
  expected_delivery_date?: string
  notes?: string
  created_at: string
  updated_at?: string
  items: PurchaseOrderItem[]
  supplier?: Supplier
}

export interface PurchaseOrderCreate {
  po_number: string
  supplier_id: number
  status?: PurchaseOrderStatus
  total_amount: number
  currency?: string
  expected_delivery_date?: string
  notes?: string
  items: PurchaseOrderItemCreate[]
}

// Supplier types
export interface Supplier {
  id: number
  name: string
  contact_name?: string
  email?: string
  phone?: string
  address?: string
  is_active: boolean
  created_at: string
  updated_at?: string
}

export interface SupplierCreate {
  name: string
  contact_name?: string
  email?: string
  phone?: string
  address?: string
  is_active?: boolean
}

export interface SupplierUpdate {
  name?: string
  contact_name?: string
  email?: string
  phone?: string
  address?: string
  is_active?: boolean
}

// Amazon types
export interface AmazonProduct {
  id: number
  asin: string
  title: string
  price: number
  stock: number
}

// API Response types
export interface ApiError {
  detail: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  size: number
  pages: number
} 