import { Badge } from '@/components/ui/badge'
import { AlertSeverity, AlertStatus, AlertType } from '@/types/alert.types'

export function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  const variant =
    severity === 'Critical' ? 'critical' :
    severity === 'Warning' ? 'warning' : 'info'
  return <Badge variant={variant as any}>{severity}</Badge>
}

export function StatusBadge({ status }: { status: AlertStatus }) {
  const variant =
    status === 'Active' ? 'critical' :
    status === 'Acknowledged' ? 'warning' : 'success'
  return <Badge variant={variant as any}>{status}</Badge>
}

export function TypeBadge({ type }: { type: AlertType }) {
  return <Badge variant="outline">{type}</Badge>
}
