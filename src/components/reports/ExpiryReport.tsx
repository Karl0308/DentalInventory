import { ExpiryReportItem } from '@/types/report.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDisplayDate } from '@/lib/dateUtils'

interface ExpiryReportProps {
  items: ExpiryReportItem[]
}

function urgencyVariant(days: number) {
  if (days <= 10) return 'critical'
  if (days <= 30) return 'warning'
  return 'info'
}

export function ExpiryReport({ items }: ExpiryReportProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Upcoming Expiry Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Item</th>
                <th className="pb-2 text-left font-medium">Batch</th>
                <th className="pb-2 text-left font-medium">Expires</th>
                <th className="pb-2 text-left font-medium">Days Left</th>
                <th className="pb-2 text-left font-medium">Qty</th>
                <th className="pb-2 text-left font-medium">Value (₱)</th>
                <th className="pb-2 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.batchNumber} className="border-b last:border-0">
                  <td className="py-2 font-medium">{item.itemName}</td>
                  <td className="py-2 font-mono text-xs text-muted-foreground">{item.batchNumber}</td>
                  <td className="py-2 text-muted-foreground">{formatDisplayDate(item.expiryDate)}</td>
                  <td className="py-2">
                    <Badge variant={urgencyVariant(item.daysUntilExpiry) as any}>
                      {item.daysUntilExpiry}d
                    </Badge>
                  </td>
                  <td className="py-2">{item.remainingQuantity} {item.unit}</td>
                  <td className="py-2">{item.estimatedValue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                  <td className="py-2">
                    <Badge variant="outline">{item.action}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
