import { UsageLogEntry } from '@/types/usage.types'
import { formatDisplayDateTime } from '@/lib/dateUtils'
import { Badge } from '@/components/ui/badge'

interface UsageLogTableProps {
  entries: UsageLogEntry[]
}

export function UsageLogTable({ entries }: UsageLogTableProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No usage entries found.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium">Date</th>
            <th className="px-4 py-3 text-left font-medium">Item</th>
            <th className="px-4 py-3 text-left font-medium">Batch</th>
            <th className="px-4 py-3 text-left font-medium">Qty</th>
            <th className="px-4 py-3 text-left font-medium">Procedure</th>
            <th className="px-4 py-3 text-left font-medium">Patient</th>
            <th className="px-4 py-3 text-left font-medium">Staff</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={entry.id} className={`border-b ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                {formatDisplayDateTime(entry.dateUsed)}
              </td>
              <td className="px-4 py-3 font-medium">{entry.itemName}</td>
              <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                {entry.batchNumber}
              </td>
              <td className="px-4 py-3">
                {entry.quantity} {entry.unit}
              </td>
              <td className="px-4 py-3">
                <Badge variant="outline">{entry.procedure}</Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{entry.patientCode}</td>
              <td className="px-4 py-3">{entry.staffName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
