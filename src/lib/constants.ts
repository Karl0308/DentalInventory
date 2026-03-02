export const ITEM_CATEGORIES = ['Consumable', 'Non-Consumable', 'Bulk Supply'] as const
export const STOCK_STATUSES = ['In Stock', 'Low Stock', 'Critical', 'Out of Stock', 'Expired'] as const
export const STORAGE_LOCATIONS = ['Cabinet A', 'Cabinet B', 'Refrigerator', 'Supply Room', 'Treatment Room 1', 'Treatment Room 2'] as const
export const PROCEDURE_TYPES = [
  'Routine Cleaning', 'Filling', 'Root Canal', 'Extraction',
  'Crown Placement', 'Whitening', 'Orthodontic Adjustment',
  'Implant Surgery', 'Denture Fitting', 'Emergency'
] as const
export const ALERT_TYPES = ['Expiry', 'Low Stock', 'Out of Stock', 'Reorder', 'Batch Quality'] as const
export const AUDIT_ACTIONS = [
  'STOCK_RECEIVED', 'STOCK_ADJUSTED', 'USAGE_LOGGED', 'ITEM_CREATED',
  'ITEM_UPDATED', 'ALERT_ACKNOWLEDGED', 'BATCH_EXPIRED', 'SUPPLIER_ADDED', 'REPORT_GENERATED'
] as const
