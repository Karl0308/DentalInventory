import { Alert } from '@/types/alert.types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SeverityBadge, StatusBadge, TypeBadge } from './AlertBadge'
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { formatRelativeDate } from '@/lib/dateUtils'

interface AlertCardProps {
  alert: Alert
  onAcknowledge?: (id: string) => void
}

function SeverityIcon({ severity }: { severity: Alert['severity'] }) {
  if (severity === 'Critical') return <AlertTriangle className="h-4 w-4 text-red-500" />
  if (severity === 'Warning') return <AlertTriangle className="h-4 w-4 text-yellow-500" />
  return <Clock className="h-4 w-4 text-blue-500" />
}

export function AlertCard({ alert, onAcknowledge }: AlertCardProps) {
  return (
    <Card className={`border-l-4 ${
      alert.severity === 'Critical' ? 'border-l-red-500' :
      alert.severity === 'Warning' ? 'border-l-yellow-500' :
      'border-l-blue-500'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <SeverityIcon severity={alert.severity} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-medium text-sm">{alert.itemName}</span>
                <TypeBadge type={alert.type} />
                <SeverityBadge severity={alert.severity} />
                <StatusBadge status={alert.status} />
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span>{formatRelativeDate(alert.createdAt)}</span>
                {alert.acknowledgedBy && (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Acknowledged by {alert.acknowledgedBy}
                  </span>
                )}
              </div>
            </div>
          </div>
          {alert.status === 'Active' && onAcknowledge && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAcknowledge(alert.id)}
              className="shrink-0"
            >
              Acknowledge
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
