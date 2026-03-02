export interface ChartDataPoint {
  label: string
  value: number
}

export interface CategoryBreakdown {
  category: string
  count: number
  percentage: number
  color: string
}

export interface MonthlyConsumption {
  month: string
  received: number
  consumed: number
}

export interface TopConsumedItem {
  itemName: string
  quantity: number
  unit: string
  totalCost: number
}

export interface ExpiryReportItem {
  itemId: string
  itemName: string
  batchNumber: string
  expiryDate: string
  daysUntilExpiry: number
  remainingQuantity: number
  unit: string
  estimatedValue: number
  action: 'Use First' | 'Return to Supplier' | 'Dispose'
}
