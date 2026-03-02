import { Alert } from '@/types/alert.types'
import { AlertCard } from './AlertCard'

interface AlertsTableProps {
  alerts: Alert[]
  onAcknowledge?: (id: string) => void
}

export function AlertsTable({ alerts, onAcknowledge }: AlertsTableProps) {
  if (alerts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No alerts match the current filter.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {alerts.map(alert => (
        <AlertCard key={alert.id} alert={alert} onAcknowledge={onAcknowledge} />
      ))}
    </div>
  )
}
