import { Supplier } from '@/types/supplier.types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDisplayDate } from '@/lib/dateUtils'
import { ChevronRight } from 'lucide-react'

interface SupplierTableProps {
  suppliers: Supplier[]
  onSelect: (supplier: Supplier) => void
}

function statusVariant(status: Supplier['status']) {
  if (status === 'Active') return 'success'
  if (status === 'On Hold') return 'warning'
  return 'secondary'
}

export function SupplierTable({ suppliers, onSelect }: SupplierTableProps) {
  if (suppliers.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No suppliers found.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium">Supplier</th>
            <th className="px-4 py-3 text-left font-medium">Contact</th>
            <th className="px-4 py-3 text-left font-medium">Lead Time</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Last Order</th>
            <th className="px-4 py-3 text-left font-medium">Total Orders</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s, i) => (
            <tr key={s.id} className={`border-b ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.id}</p>
                </div>
              </td>
              <td className="px-4 py-3">
                <div>
                  <p>{s.contactPerson}</p>
                  <p className="text-xs text-muted-foreground">{s.email}</p>
                </div>
              </td>
              <td className="px-4 py-3">{s.leadTimeDays} days</td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(s.status) as any}>{s.status}</Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDisplayDate(s.lastOrderDate)}
              </td>
              <td className="px-4 py-3">{s.totalOrders}</td>
              <td className="px-4 py-3">
                <Button size="sm" variant="ghost" onClick={() => onSelect(s)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
