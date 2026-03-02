import { BatchRecord, InventoryItem, StockStatus } from '@/types/inventory.types'

export function sortBatchesByFEFO(batches: BatchRecord[]): BatchRecord[] {
  return [...batches].sort((a, b) => {
    if (!a.expiryDate) return 1
    if (!b.expiryDate) return -1
    return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
  })
}

export function computeStockStatus(item: InventoryItem): StockStatus {
  if (item.currentStock === 0) return 'Out of Stock'
  if (item.currentStock <= item.reorderPoint * 0.5) return 'Critical'
  if (item.currentStock <= item.reorderPoint) return 'Low Stock'
  return 'In Stock'
}

export function getStockPercentage(current: number, ideal: number): number {
  if (ideal === 0) return 0
  return Math.min(Math.round((current / ideal) * 100), 100)
}
