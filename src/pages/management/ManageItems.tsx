import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import { mockItems } from '@/data/mockItems'
import { InventoryItem, ItemCategory, StorageLocation } from '@/types/inventory.types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useManagement } from '@/context/ManagementContext'
import { Search, Pencil, Trash2, Plus } from 'lucide-react'
import StockStatusBadge from '@/components/inventory/StockStatusBadge'

type ItemForm = {
  name: string
  category: string
  subcategory: string
  unit: string
  reorderPoint: string
  idealStock: string
  storageLocation: string
  notes: string
}

const EMPTY_FORM: ItemForm = {
  name: '', category: '', subcategory: '', unit: '',
  reorderPoint: '', idealStock: '', storageLocation: '', notes: '',
}

export default function ManageItems() {
  const { categories, locations } = useManagement()
  const [items, setItems] = useState<InventoryItem[]>(mockItems)
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<InventoryItem | null>(null)
  const [form, setForm] = useState<ItemForm>(EMPTY_FORM)
  const [deleteTarget, setDeleteTarget] = useState<InventoryItem | null>(null)

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.subcategory.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd() {
    setEditTarget(null)
    setForm(EMPTY_FORM)
    setDialogOpen(true)
  }

  function openEdit(item: InventoryItem) {
    setEditTarget(item)
    setForm({
      name: item.name,
      category: item.category,
      subcategory: item.subcategory,
      unit: item.unit,
      reorderPoint: String(item.reorderPoint),
      idealStock: String(item.idealStock),
      storageLocation: item.storageLocation,
      notes: item.notes ?? '',
    })
    setDialogOpen(true)
  }

  function handleSave() {
    const now = new Date().toISOString()
    if (editTarget) {
      setItems(prev => prev.map(i => i.id === editTarget.id ? {
        ...i,
        name: form.name,
        category: form.category as ItemCategory,
        subcategory: form.subcategory,
        unit: form.unit,
        reorderPoint: Number(form.reorderPoint),
        idealStock: Number(form.idealStock),
        storageLocation: form.storageLocation as StorageLocation,
        notes: form.notes || undefined,
        updatedAt: now,
      } : i))
    } else {
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
      setItems(prev => [newItem, ...prev])
    }
    setDialogOpen(false)
  }

  function handleDelete(item: InventoryItem) {
    setItems(prev => prev.filter(i => i.id !== item.id))
    setDeleteTarget(null)
  }

  function set(field: keyof ItemForm, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  const isValid = form.name && form.category && form.subcategory && form.unit && form.reorderPoint && form.idealStock && form.storageLocation

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Items"
        description="Add, edit, or remove inventory items."
        actions={
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        }
      />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Item</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Unit</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Reorder / Ideal</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Location</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-10 text-muted-foreground">No items found.</td></tr>
                ) : filtered.map((item, i) => (
                  <tr key={item.id} className={`border-b last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                    <td className="px-4 py-3">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.subcategory}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{item.unit}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {item.reorderPoint} / {item.idealStock}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{item.storageLocation}</td>
                    <td className="px-4 py-3"><StockStatusBadge status={item.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(item)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setDeleteTarget(item)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editTarget ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Item Name *</Label>
              <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Nitrile Gloves - Medium" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={v => set('category', v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Subcategory *</Label>
                <Input value={form.subcategory} onChange={e => set('subcategory', e.target.value)} placeholder="e.g. Protective Equipment" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>Unit *</Label>
                <Input value={form.unit} onChange={e => set('unit', e.target.value)} placeholder="Box" />
              </div>
              <div className="space-y-1.5">
                <Label>Reorder Point *</Label>
                <Input type="number" min="0" value={form.reorderPoint} onChange={e => set('reorderPoint', e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Ideal Stock *</Label>
                <Input type="number" min="1" value={form.idealStock} onChange={e => set('idealStock', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Storage Location *</Label>
              <Select value={form.storageLocation} onValueChange={v => set('storageLocation', v)}>
                <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                <SelectContent>
                  {locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Input value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Optional notes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!isValid}>{editTarget ? 'Save Changes' : 'Add Item'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteTarget && handleDelete(deleteTarget)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
