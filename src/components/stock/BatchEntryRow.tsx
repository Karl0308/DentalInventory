import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2 } from 'lucide-react'
import { STORAGE_LOCATIONS } from '@/lib/constants'

export interface BatchEntryData {
  id: string
  batchNumber: string
  quantity: string
  unitCost: string
  expiryDate: string
  storageLocation: string
  invoiceNumber: string
}

interface BatchEntryRowProps {
  entry: BatchEntryData
  index: number
  canRemove: boolean
  onChange: (id: string, field: keyof BatchEntryData, value: string) => void
  onRemove: (id: string) => void
}

export function BatchEntryRow({ entry, index, canRemove, onChange, onRemove }: BatchEntryRowProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Batch #{index + 1}</span>
        {canRemove && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-destructive"
            onClick={() => onRemove(entry.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Batch Number</Label>
          <Input
            placeholder="e.g. NG-2026-LT84"
            value={entry.batchNumber}
            onChange={e => onChange(entry.id, 'batchNumber', e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label>Quantity</Label>
          <Input
            type="number"
            min="1"
            placeholder="0"
            value={entry.quantity}
            onChange={e => onChange(entry.id, 'quantity', e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label>Unit Cost (₱)</Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={entry.unitCost}
            onChange={e => onChange(entry.id, 'unitCost', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Expiry Date</Label>
          <Input
            type="date"
            value={entry.expiryDate}
            onChange={e => onChange(entry.id, 'expiryDate', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Invoice Number</Label>
          <Input
            placeholder="INV-..."
            value={entry.invoiceNumber}
            onChange={e => onChange(entry.id, 'invoiceNumber', e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Storage Location</Label>
          <Select
            value={entry.storageLocation}
            onValueChange={v => onChange(entry.id, 'storageLocation', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {STORAGE_LOCATIONS.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
