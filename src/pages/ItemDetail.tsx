import { useParams, useNavigate } from 'react-router-dom'
import { mockItems } from '@/data/mockItems'
import { mockBatches } from '@/data/mockBatches'
import { mockUsage } from '@/data/mockUsage'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import StockStatusBadge from '@/components/inventory/StockStatusBadge'
import ExpiryProgressBar from '@/components/inventory/ExpiryProgressBar'
import { ArrowLeft, Package, MapPin, Calendar, AlertTriangle } from 'lucide-react'
import { formatDisplayDate, formatDisplayDateTime } from '@/lib/dateUtils'
import { sortBatchesByFEFO, getStockPercentage } from '@/lib/stockUtils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ItemDetail() {
  const { itemId } = useParams()
  const navigate = useNavigate()

  const item = mockItems.find(i => i.id === itemId)
  if (!item) return (
    <div className="text-center py-20">
      <p className="text-muted-foreground">Item not found.</p>
      <Button variant="link" onClick={() => navigate('/inventory')}>← Back to Inventory</Button>
    </div>
  )

  const batches = sortBatchesByFEFO(mockBatches.filter(b => b.itemId === item.id))
  const usageLogs = mockUsage.filter(u => u.itemId === item.id)
  const pct = getStockPercentage(item.currentStock, item.idealStock)

  const categoryVariant = item.category === 'Consumable' ? 'teal' : item.category === 'Non-Consumable' ? 'info' : 'purple'

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/inventory')} className="gap-1">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <Badge variant={categoryVariant}>{item.category}</Badge>
            <StockStatusBadge status={item.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{item.subcategory} • {item.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Stock Level</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-foreground">{item.currentStock}</span>
              <span className="text-lg text-muted-foreground mb-1">/ {item.idealStock} {item.unit}</span>
            </div>
            <Progress
              value={pct}
              className={`h-2.5 mb-2 ${pct < 30 ? '[&>div]:bg-red-500' : pct < 60 ? '[&>div]:bg-amber-400' : '[&>div]:bg-teal-500'}`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Reorder at: {item.reorderPoint} {item.unit}</span>
              <span>{pct}% of ideal</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Item Details</p>
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Unit:</span>
              <span className="font-medium">{item.unit}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">{item.storageLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Added:</span>
              <span className="font-medium">{formatDisplayDate(item.createdAt)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Notes</p>
            {item.notes ? (
              <p className="text-sm text-foreground">{item.notes}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">No notes recorded.</p>
            )}
            {item.status === 'Critical' && (
              <div className="flex items-center gap-2 mt-3 text-xs text-red-600 bg-red-50 rounded px-2 py-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                Stock critically low — consider reordering immediately
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="batches">
        <TabsList>
          <TabsTrigger value="batches">Batch Records ({batches.length})</TabsTrigger>
          <TabsTrigger value="usage">Usage History ({usageLogs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="batches" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Batch #</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Supplier</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Received</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Qty / Remaining</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Unit Cost</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground w-52">Expiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No batch records found.</td></tr>
                    ) : batches.map((batch, idx) => (
                      <tr key={batch.id} className="border-b last:border-0 hover:bg-muted/10">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {idx === 0 && batch.expiryDate && <Badge variant="warning" className="text-[10px]">FEFO</Badge>}
                            <span className="font-mono text-xs font-medium">{batch.batchNumber}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{batch.invoiceNumber}</p>
                        </td>
                        <td className="px-4 py-3 text-sm">{batch.supplierName}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{formatDisplayDate(batch.dateReceived)}</td>
                        <td className="px-4 py-3">
                          <span className="font-semibold">{batch.remainingQuantity}</span>
                          <span className="text-muted-foreground"> / {batch.quantity} {batch.unit}</span>
                        </td>
                        <td className="px-4 py-3 text-sm">₱{batch.unitCost.toFixed(2)}</td>
                        <td className="px-4 py-3 w-52">
                          <ExpiryProgressBar expiryDate={batch.expiryDate} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Procedure</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Qty Used</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Patient</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Staff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usageLogs.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">No usage records for this item.</td></tr>
                    ) : usageLogs.map(log => (
                      <tr key={log.id} className="border-b last:border-0 hover:bg-muted/10">
                        <td className="px-4 py-3 text-xs text-muted-foreground">{formatDisplayDateTime(log.dateUsed)}</td>
                        <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{log.procedure}</Badge></td>
                        <td className="px-4 py-3 font-semibold">{log.quantity} <span className="text-xs text-muted-foreground font-normal">{log.unit}</span></td>
                        <td className="px-4 py-3 font-mono text-xs">{log.patientCode}</td>
                        <td className="px-4 py-3 text-sm">{log.staffName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
