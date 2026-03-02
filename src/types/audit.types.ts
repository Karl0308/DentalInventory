export type AuditAction =
  | 'STOCK_RECEIVED' | 'STOCK_ADJUSTED' | 'USAGE_LOGGED'
  | 'ITEM_CREATED' | 'ITEM_UPDATED' | 'ALERT_ACKNOWLEDGED'
  | 'BATCH_EXPIRED' | 'SUPPLIER_ADDED' | 'REPORT_GENERATED'

export type ActorRole = 'Dentist' | 'Assistant' | 'Admin' | 'System'

export interface AuditLogEntry {
  id: string
  action: AuditAction
  actorId: string
  actorName: string
  actorRole: ActorRole
  targetType: 'Item' | 'Batch' | 'Supplier' | 'Alert' | 'Report'
  targetId: string
  targetName: string
  description: string
  previousValue?: string
  newValue?: string
  timestamp: string
  ipAddress: string
}
