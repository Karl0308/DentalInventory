import { AuditLogEntry } from '@/types/audit.types'
import { Badge } from '@/components/ui/badge'
import { formatDisplayDateTime } from '@/lib/dateUtils'

interface AuditLogTableProps {
  entries: AuditLogEntry[]
}

function actionVariant(action: AuditLogEntry['action']): string {
  if (action === 'STOCK_RECEIVED') return 'success'
  if (action === 'BATCH_EXPIRED') return 'critical'
  if (action === 'STOCK_ADJUSTED') return 'warning'
  if (action === 'ALERT_ACKNOWLEDGED') return 'info'
  return 'outline'
}

function actionLabel(action: AuditLogEntry['action']): string {
  return action.replace(/_/g, ' ')
}

function roleVariant(role: AuditLogEntry['actorRole']): string {
  if (role === 'System') return 'secondary'
  if (role === 'Admin') return 'teal'
  if (role === 'Dentist') return 'info'
  return 'outline'
}

export function AuditLogTable({ entries }: AuditLogTableProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No audit entries found.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium">Timestamp</th>
            <th className="px-4 py-3 text-left font-medium">Action</th>
            <th className="px-4 py-3 text-left font-medium">Actor</th>
            <th className="px-4 py-3 text-left font-medium">Target</th>
            <th className="px-4 py-3 text-left font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={entry.id} className={`border-b ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
              <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">
                {formatDisplayDateTime(entry.timestamp)}
              </td>
              <td className="px-4 py-3">
                <Badge variant={actionVariant(entry.action) as any} className="text-xs">
                  {actionLabel(entry.action)}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{entry.actorName}</span>
                  <Badge variant={roleVariant(entry.actorRole) as any} className="text-xs w-fit">
                    {entry.actorRole}
                  </Badge>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{entry.targetName}</span>
                  <span className="text-xs text-muted-foreground">{entry.targetType}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground max-w-xs">
                <p className="truncate" title={entry.description}>{entry.description}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
