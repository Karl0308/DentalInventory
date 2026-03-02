
import { useNavigate } from 'react-router-dom'
import { useInventory } from '@/hooks/useInventory'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import StockStatusBadge from '@/components/inventory/StockStatusBadge'
import { Search, Package, PackagePlus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockBatches } from '@/data/mockBatches'
import { getDaysUntilExpiry, formatDisplayDate } from '@/lib/dateUtils'
import { getStockPercentage } from '@/lib/stockUtils'
import { Progress } from '@/components/ui/progress'
import { ItemCategory, StockStatus } from '@/types/inventory.types'
import { STORAGE_LOCATIONS } from '@/lib/constants'

export default function InventoryList() {
  const { items, filters, setFilters } = useInventory()
  const navigate = useNavigate()

  const getNearestExpiry = (itemId: string) => {
    const batches = mockBatches.filter(b => b.itemId === itemId && b.expiryDate)
    if (batches.length === 0) return null
    const sorted = batches.sort((a, b) => new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime())
    return sorted[0].expiryDate
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Inventory List</h2>
          <p className="text-sm text-muted-foreground mt-1">{items.length} items found</p>
        </div>
        <Button onClick={() => navigate('/receive-stock')} className="gap-2">
          <PackagePlus className="h-4 w-4" />
          Receive Stock
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or category..."
                className="pl-8"
                value={filters.search}
                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
              />
            </div>
            <Select value={filters.category} onValueChange={v => setFilters(f => ({ ...f, category: v as ItemCategory | 'All' }))}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Consumable">Consumable</SelectItem>
                <SelectItem value="Non-Consumable">Non-Consumable</SelectItem>
                <SelectItem value="Bulk Supply">Bulk Supply</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={v => setFilters(f => ({ ...f, status: v as StockStatus | 'All' }))}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.location} onValueChange={v => setFilters(f => ({ ...f, location: v }))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Locations</SelectItem>
                {STORAGE_LOCATIONS.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(filters.search || filters.category !== 'All' || filters.status !== 'All' || filters.location !== 'All') && (
              <Button variant="ghost" size="sm" onClick={() => setFilters({ search: '', category: 'All', status: 'All', location: 'All' })}>
                Clear filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Item Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Stock Level</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nearest Expiry</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Location</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-muted-foreground">
                      <Package className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      No items match your filters
                    </td>
                  </tr>
                ) : (
                  items.map(item => {
                    const nearestExpiry = getNearestExpiry(item.id)
                    const daysLeft = nearestExpiry ? getDaysUntilExpiry(nearestExpiry) : null
                    const pct = getStockPercentage(item.currentStock, item.idealStock)

                    return (
                      <tr
                        key={item.id}
                        className="border-b last:border-0 hover:bg-muted/20 cursor-pointer transition-colors"
                        onClick={() => navigate(`/inventory/${item.id}`)}
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.subcategory}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={item.category === 'Consumable' ? 'teal' : item.category === 'Non-Consumable' ? 'info' : 'purple'}
                            className="text-xs"
                          >
                            {item.category}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 w-36">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground">{item.currentStock}</span>
                            <span className="text-xs text-muted-foreground">/ {item.idealStock} {item.unit}</span>
                          </div>
                          <Progress
                            value={pct}
                            className={`h-1.5 ${pct < 30 ? '[&>div]:bg-red-500' : pct < 60 ? '[&>div]:bg-amber-400' : '[&>div]:bg-teal-500'}`}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <StockStatusBadge status={item.status} />
                        </td>
                        <td className="px-4 py-3">
                          {nearestExpiry ? (
                            <span className={
                              daysLeft !== null && daysLeft <= 7 ? 'text-red-600 font-semibold text-xs' :
                              daysLeft !== null && daysLeft <= 30 ? 'text-amber-600 font-medium text-xs' :
                              'text-xs text-muted-foreground'
                            }>
                              {daysLeft !== null && daysLeft < 0 ? 'Expired' : formatDisplayDate(nearestExpiry)}
                              {daysLeft !== null && daysLeft >= 0 && daysLeft <= 30 && ` (${daysLeft}d)`}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">N/A</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-muted-foreground">{item.storageLocation}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" className="text-xs text-primary h-7">
                            Details →
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
