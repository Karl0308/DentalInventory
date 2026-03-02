export type AlertType = 'Expiry' | 'Low Stock' | 'Out of Stock' | 'Reorder' | 'Batch Quality'
export type AlertSeverity = 'Critical' | 'Warning' | 'Info'
export type AlertStatus = 'Active' | 'Acknowledged' | 'Resolved'

export interface Alert {
  id: string
  type: AlertType
  severity: AlertSeverity
  status: AlertStatus
  itemId: string
  itemName: string
  batchId?: string
  batchNumber?: string
  message: string
  daysUntilExpiry?: number
  currentStock?: number
  reorderPoint?: number
  createdAt: string
  acknowledgedBy?: string
  acknowledgedAt?: string
}
