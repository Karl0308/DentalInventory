export type SupplierStatus = 'Active' | 'Inactive' | 'On Hold'

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  status: SupplierStatus
  leadTimeDays: number
  notes?: string
  createdAt: string
  lastOrderDate: string
  totalOrders: number
}

export interface SupplierOrder {
  id: string
  supplierId: string
  invoiceNumber: string
  orderDate: string
  receivedDate: string
  totalAmount: number
  itemCount: number
  status: 'Pending' | 'Received' | 'Partial' | 'Cancelled'
}
