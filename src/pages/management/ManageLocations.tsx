import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import { useManagement } from '@/context/ManagementContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react'

export default function ManageLocations() {
  const { locations, addLocation, renameLocation, deleteLocation } = useManagement()

  const [addOpen, setAddOpen] = useState(false)
  const [newName, setNewName] = useState('')

  const [editTarget, setEditTarget] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  function handleAdd() {
    if (newName.trim()) {
      addLocation(newName.trim())
      setNewName('')
      setAddOpen(false)
    }
  }

  function handleRename() {
    if (editTarget && editName.trim()) {
      renameLocation(editTarget, editName.trim())
      setEditTarget(null)
    }
  }

  function handleDelete() {
    if (deleteTarget) {
      deleteLocation(deleteTarget)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Locations"
        description="Add, rename, or remove storage locations."
        actions={
          <Button onClick={() => { setNewName(''); setAddOpen(true) }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        }
      />

      <Card className="max-w-lg">
        <CardContent className="p-0">
          {locations.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">No locations yet.</div>
          ) : (
            <ul className="divide-y">
              {locations.map(loc => (
                <li key={loc} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{loc}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm" variant="ghost"
                      onClick={() => { setEditTarget(loc); setEditName(loc) }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm" variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteTarget(loc)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Add Location</DialogTitle></DialogHeader>
          <Input
            placeholder="Location name..."
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!newName.trim()}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editTarget} onOpenChange={open => !open && setEditTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Rename Location</DialogTitle></DialogHeader>
          <Input
            value={editName}
            onChange={e => setEditName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRename()}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTarget(null)}>Cancel</Button>
            <Button onClick={handleRename} disabled={!editName.trim()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Delete Location</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">
            Delete location <strong>{deleteTarget}</strong>? Items stored here will keep their value but it won't appear in future dropdowns.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
