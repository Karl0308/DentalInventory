import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import { AlertsTable } from '@/components/alerts/AlertsTable'
import { mockAlerts } from '@/data/mockAlerts'
import { Alert, AlertSeverity, AlertStatus } from '@/types/alert.types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { AlertTriangle, Info } from 'lucide-react'

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'All'>('All')

  const activeCount = alerts.filter(a => a.status === 'Active').length
  const criticalCount = alerts.filter(a => a.severity === 'Critical' && a.status === 'Active').length

  function handleAcknowledge(id: string) {
    setAlerts(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, status: 'Acknowledged' as AlertStatus, acknowledgedBy: 'Current User', acknowledgedAt: new Date().toISOString() }
          : a
      )
    )
  }

  function filterBySeverity(alerts: Alert[]) {
    if (severityFilter === 'All') return alerts
    return alerts.filter(a => a.severity === severityFilter)
  }

  const activeAlerts = filterBySeverity(alerts.filter(a => a.status === 'Active'))
  const acknowledgedAlerts = filterBySeverity(alerts.filter(a => a.status === 'Acknowledged'))
  const allFiltered = filterBySeverity(alerts)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alerts"
        description="Monitor stock and expiry alerts for your inventory."
        actions={
          <div className="flex items-center gap-2">
            {criticalCount > 0 && (
              <Badge variant="critical" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {criticalCount} Critical
              </Badge>
            )}
            <Badge variant="warning" className="flex items-center gap-1">
              <Info className="h-3 w-3" />
              {activeCount} Active
            </Badge>
          </div>
        }
      />

      {/* Severity filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Filter by severity:</span>
        {(['All', 'Critical', 'Warning', 'Info'] as const).map(s => (
          <Button
            key={s}
            size="sm"
            variant={severityFilter === s ? 'default' : 'outline'}
            onClick={() => setSeverityFilter(s)}
          >
            {s}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">
            Active
            {activeAlerts.length > 0 && (
              <Badge variant="critical" className="ml-2 text-xs px-1.5 py-0">
                {activeAlerts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="acknowledged">
            Acknowledged
            {acknowledgedAlerts.length > 0 && (
              <Badge variant="outline" className="ml-2 text-xs px-1.5 py-0">
                {acknowledgedAlerts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">All ({allFiltered.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <AlertsTable alerts={activeAlerts} onAcknowledge={handleAcknowledge} />
        </TabsContent>

        <TabsContent value="acknowledged" className="mt-4">
          <AlertsTable alerts={acknowledgedAlerts} />
        </TabsContent>

        <TabsContent value="all" className="mt-4">
          <AlertsTable alerts={allFiltered} onAcknowledge={handleAcknowledge} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
