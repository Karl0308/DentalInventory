import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PROCEDURE_TYPES } from '@/lib/constants'

interface LogUsageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: any) => void
}

export function LogUsageDialog({ open, onOpenChange, onSubmit }: LogUsageDialogProps) {
  const [form, setForm] = useState({
    itemName: '',
    batchNumber: '',
    quantity: '',
    procedure: '',
    patientCode: '',
    notes: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.(form)
    onOpenChange(false)
    setForm({ itemName: '', batchNumber: '', quantity: '', procedure: '', patientCode: '', notes: '' })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Log Usage</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="itemName">Item</Label>
            <Input
              id="itemName"
              placeholder="Search item..."
              value={form.itemName}
              onChange={e => setForm(f => ({ ...f, itemName: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="batchNumber">Batch Number</Label>
            <Input
              id="batchNumber"
              placeholder="e.g. NG-2026-LT84"
              value={form.batchNumber}
              onChange={e => setForm(f => ({ ...f, batchNumber: e.target.value }))}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="0"
                value={form.quantity}
                onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="patientCode">Patient Code</Label>
              <Input
                id="patientCode"
                placeholder="PT-XXXX"
                value={form.patientCode}
                onChange={e => setForm(f => ({ ...f, patientCode: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="procedure">Procedure</Label>
            <Select
              value={form.procedure}
              onValueChange={v => setForm(f => ({ ...f, procedure: v }))}
            >
              <SelectTrigger id="procedure">
                <SelectValue placeholder="Select procedure" />
              </SelectTrigger>
              <SelectContent>
                {PROCEDURE_TYPES.map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input
              id="notes"
              placeholder="Any relevant notes..."
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Log Usage</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
