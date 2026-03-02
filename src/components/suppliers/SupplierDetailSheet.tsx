import { Supplier, SupplierOrder } from '@/types/supplier.types'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatDisplayDate } from '@/lib/dateUtils'
import { Building2, Mail, Phone, MapPin, Clock } from 'lucide-react'

interface SupplierDetailSheetProps {
  supplier: Supplier | null
  orders: SupplierOrder[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

function statusVariant(status: Supplier['status']) {
  if (status === 'Active') return 'success'
  if (status === 'On Hold') return 'warning'
  return 'secondary'
}

function orderStatusVariant(status: SupplierOrder['status']) {
  if (status === 'Received') return 'success'
  if (status === 'Partial') return 'warning'
  if (status === 'Cancelled') return 'critical'
  return 'info'
}

export function SupplierDetailSheet({ supplier, orders, open, onOpenChange }: SupplierDetailSheetProps) {
  if (!supplier) return null

  const supplierOrders = orders.filter(o => o.supplierId === supplier.id)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{supplier.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          {/* Status & lead time */}
          <div className="flex items-center gap-3">
            <Badge variant={statusVariant(supplier.status) as any}>{supplier.status}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {supplier.leadTimeDays}-day lead time
            </span>
          </div>

          <Separator />

          {/* Contact info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{supplier.contactPerson}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{supplier.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{supplier.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>{supplier.address}</span>
            </div>
          </div>

          {supplier.notes && (
            <>
              <Separator />
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Notes</p>
                <p className="text-sm">{supplier.notes}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Order history */}
          <div>
            <p className="text-sm font-medium mb-3">Order History ({supplierOrders.length})</p>
            {supplierOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <div className="space-y-2">
                {supplierOrders.map(order => (
                  <div key={order.id} className="border rounded-lg p-3 text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-muted-foreground">{order.invoiceNumber}</span>
                      <Badge variant={orderStatusVariant(order.status) as any} className="text-xs">
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Received {formatDisplayDate(order.receivedDate)}</span>
                      <span>₱{order.totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{order.itemCount} item type(s)</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
