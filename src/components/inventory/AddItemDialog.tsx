import { useState, FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ITEM_CATEGORIES, STORAGE_LOCATIONS } from '@/lib/constants'
import { InventoryItem, ItemCategory, StorageLocation } from '@/types/inventory.types'

interface AddItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (item: InventoryItem) => void
}

const EMPTY_FORM = {
  name: '',
  category: '' as ItemCategory | '',
  subcategory: '',
  unit: '',
  reorderPoint: '',
  idealStock: '',
  storageLocation: '' as StorageLocation | '',
  notes: '',
}

export function AddItemDialog({ open, onOpenChange, onAdd }: AddItemDialogProps) {
  const [form, setForm] = useState(EMPTY_FORM)

  function set(field: keyof typeof EMPTY_FORM, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const now = new Date().toISOString()
    const newItem: InventoryItem = {
      id: `ITEM-${Date.now()}`,
      name: form.name,
      category: form.category as ItemCategory,
      subcategory: form.subcategory,
      unit: form.unit,
      reorderPoint: Number(form.reorderPoint),
      idealStock: Number(form.idealStock),
      currentStock: 0,
      status: 'Out of Stock',
      storageLocation: form.storageLocation as StorageLocation,
      notes: form.notes || undefined,
      createdAt: now,
      updatedAt: now,
    }
    onAdd(newItem)
    setForm(EMPTY_FORM)
    onOpenChange(false)
  }

  const isValid =
    form.name && form.category && form.subcategory &&
    form.unit && form.reorderPoint && form.idealStock && form.storageLocation

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Item Name *</Label>
            <Input
              id="name"
              placeholder="e.g. Nitrile Examination Gloves - Medium"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={v => set('category', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {ITEM_CATEGORIES.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subcategory">Subcategory *</Label>
              <Input
                id="subcategory"
                placeholder="e.g. Protective Equipment"
                value={form.subcategory}
                onChange={e => set('subcategory', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="unit">Unit *</Label>
              <Input
                id="unit"
                placeholder="e.g. Box"
                value={form.unit}
                onChange={e => set('unit', e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reorderPoint">Reorder Point *</Label>
              <Input
                id="reorderPoint"
                type="number"
                min="0"
                placeholder="0"
                value={form.reorderPoint}
                onChange={e => set('reorderPoint', e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="idealStock">Ideal Stock *</Label>
              <Input
                id="idealStock"
                type="number"
                min="1"
                placeholder="0"
                value={form.idealStock}
                onChange={e => set('idealStock', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Storage Location *</Label>
            <Select value={form.storageLocation} onValueChange={v => set('storageLocation', v)}>
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

          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input
              id="notes"
              placeholder="Any relevant notes..."
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
