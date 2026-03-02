import { MonthlyConsumption, CategoryBreakdown, TopConsumedItem, ExpiryReportItem } from '@/types/report.types'

export const monthlyConsumption: MonthlyConsumption[] = [
  { month: 'Sep 2025', received: 18, consumed: 12 },
  { month: 'Oct 2025', received: 22, consumed: 18 },
  { month: 'Nov 2025', received: 15, consumed: 20 },
  { month: 'Dec 2025', received: 30, consumed: 22 },
  { month: 'Jan 2026', received: 25, consumed: 19 },
  { month: 'Feb 2026', received: 12, consumed: 15 },
]

export const categoryBreakdown: CategoryBreakdown[] = [
  { category: 'Consumable', count: 10, percentage: 67, color: '#14b8a6' },
  { category: 'Non-Consumable', count: 3, percentage: 20, color: '#3b82f6' },
  { category: 'Bulk Supply', count: 2, percentage: 13, color: '#8b5cf6' },
]

export const topConsumedItems: TopConsumedItem[] = [
  { itemName: 'Nitrile Examination Gloves - Medium', quantity: 12, unit: 'Box', totalCost: 2220.00 },
  { itemName: 'Lidocaine HCl 2% Cartridge', quantity: 42, unit: 'Cartridge', totalCost: 1890.00 },
  { itemName: 'Composite Resin - Shade A2', quantity: 8, unit: 'Syringe', totalCost: 4960.00 },
  { itemName: 'Surgical Face Mask - Type IIR', quantity: 6, unit: 'Box', totalCost: 570.00 },
  { itemName: 'Disposable Suction Tips', quantity: 9, unit: 'Pack', totalCost: 675.00 },
  { itemName: 'Sterilization Pouches - Small', quantity: 4, unit: 'Pack', totalCost: 1000.00 },
]

export const byProcedureConsumption = [
  { label: 'Routine Cleaning', value: 28 },
  { label: 'Filling', value: 22 },
  { label: 'Root Canal', value: 18 },
  { label: 'Extraction', value: 14 },
  { label: 'Crown Placement', value: 10 },
  { label: 'Others', value: 8 },
]

export const expiryReportItems: ExpiryReportItem[] = [
  { itemId: 'ITEM-008', itemName: 'Glass Ionomer Cement - Luting', batchNumber: 'GIC-2025-K19', expiryDate: '2026-03-05T00:00:00Z', daysUntilExpiry: 5, remainingQuantity: 5, unit: 'Kit', estimatedValue: 4450.00, action: 'Use First' },
  { itemId: 'ITEM-002', itemName: 'Composite Resin - Shade A2', batchNumber: 'CR-A2-250901', expiryDate: '2026-03-10T00:00:00Z', daysUntilExpiry: 10, remainingQuantity: 9, unit: 'Syringe', estimatedValue: 5580.00, action: 'Use First' },
  { itemId: 'ITEM-006', itemName: 'Lidocaine HCl 2% Cartridge', batchNumber: 'LDC-2025-P77', expiryDate: '2026-03-25T00:00:00Z', daysUntilExpiry: 25, remainingQuantity: 14, unit: 'Cartridge', estimatedValue: 630.00, action: 'Use First' },
  { itemId: 'ITEM-010', itemName: 'Alginate Impression Material', batchNumber: 'ALG-2025-R06', expiryDate: '2026-07-10T00:00:00Z', daysUntilExpiry: 132, remainingQuantity: 4, unit: 'Bag (500g)', estimatedValue: 1520.00, action: 'Use First' },
  { itemId: 'ITEM-014', itemName: 'Dental X-Ray Film - Periapical', batchNumber: 'XRF-2025-E22', expiryDate: '2026-09-01T00:00:00Z', daysUntilExpiry: 185, remainingQuantity: 3, unit: 'Pack (100)', estimatedValue: 3600.00, action: 'Use First' },
]
