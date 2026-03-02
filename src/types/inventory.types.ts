export type ItemCategory = 'Consumable' | 'Non-Consumable' | 'Bulk Supply'
export type StockStatus = 'In Stock' | 'Low Stock' | 'Critical' | 'Out of Stock' | 'Expired'
export type StorageLocation = 'Cabinet A' | 'Cabinet B' | 'Refrigerator' | 'Supply Room' | 'Treatment Room 1' | 'Treatment Room 2'

export interface InventoryItem {
  id: string
  name: string
  category: ItemCategory
  subcategory: string
  unit: string
  reorderPoint: number
  idealStock: number
  currentStock: number
  status: StockStatus
  storageLocation: StorageLocation
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface BatchRecord {
  id: string
  itemId: string
  itemName: string
  batchNumber: string
  supplierId: string
  supplierName: string
  quantity: number
  remainingQuantity: number
  unit: string
  unitCost: number
  totalCost: number
  dateReceived: string
  expiryDate: string | null
  receivedBy: string
  invoiceNumber: string
  storageLocation: StorageLocation
  notes?: string
}
