export type ProcedureType =
  | 'Routine Cleaning' | 'Filling' | 'Root Canal' | 'Extraction'
  | 'Crown Placement' | 'Whitening' | 'Orthodontic Adjustment'
  | 'Implant Surgery' | 'Denture Fitting' | 'Emergency'

export interface UsageLogEntry {
  id: string
  itemId: string
  itemName: string
  batchId: string
  batchNumber: string
  quantity: number
  unit: string
  procedure: ProcedureType
  patientCode: string
  staffId: string
  staffName: string
  dateUsed: string
  notes?: string
}
