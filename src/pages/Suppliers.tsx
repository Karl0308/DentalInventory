import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import { SupplierTable } from '@/components/suppliers/SupplierTable'
import { SupplierDetailSheet } from '@/components/suppliers/SupplierDetailSheet'
import { mockSuppliers, mockSupplierOrders } from '@/data/mockSuppliers'
import { Supplier } from '@/types/supplier.types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Building2, CheckCircle, Clock } from 'lucide-react'

export default function Suppliers() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const filtered = mockSuppliers.filter(s => {
    const matchesSearch =
      search === '' ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  function handleSelect(supplier: Supplier) {
    setSelectedSupplier(supplier)
    setSheetOpen(true)
  }

  const activeCount = mockSuppliers.filter(s => s.status === 'Active').length
  const onHoldCount = mockSuppliers.filter(s => s.status === 'On Hold').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suppliers"
        description="Manage your dental supply vendors and view order history."
      />

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-teal-600" />
            <div>
              <p className="text-2xl font-bold">{mockSuppliers.length}</p>
              <p className="text-xs text-muted-foreground">Total Suppliers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold">{onHoldCount}</p>
              <p className="text-xs text-muted-foreground">On Hold</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search supplier, contact, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <SupplierTable suppliers={filtered} onSelect={handleSelect} />

      <SupplierDetailSheet
        supplier={selectedSupplier}
        orders={mockSupplierOrders}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}
