import { useNavigate } from 'react-router-dom'
import { mockAuditLog } from '@/data/mockAuditLog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, ArrowRight } from 'lucide-react'
import { formatRelativeDate } from '@/lib/dateUtils'

const actionColors: Record<string, string> = {
  STOCK_RECEIVED: 'success',
  USAGE_LOGGED: 'info',
  STOCK_ADJUSTED: 'warning',
  ALERT_ACKNOWLEDGED: 'purple',
  ITEM_UPDATED: 'teal',
  BATCH_EXPIRED: 'critical',
  SUPPLIER_ADDED: 'teal',
  REPORT_GENERATED: 'secondary',
  ITEM_CREATED: 'teal',
}

const actionLabels: Record<string, string> = {
  STOCK_RECEIVED: 'Stock In',
  USAGE_LOGGED: 'Used',
  STOCK_ADJUSTED: 'Adjusted',
  ALERT_ACKNOWLEDGED: 'Acknowledged',
  ITEM_UPDATED: 'Updated',
  BATCH_EXPIRED: 'Expired',
  SUPPLIER_ADDED: 'New Supplier',
  REPORT_GENERATED: 'Report',
  ITEM_CREATED: 'New Item',
}

export default function RecentActivityFeed() {
  const navigate = useNavigate()
  const recent = mockAuditLog.slice(0, 6)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs text-primary h-7" onClick={() => navigate('/audit-log')}>
            Full log <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {recent.map(entry => (
            <div key={entry.id} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
                {entry.actorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug line-clamp-1">{entry.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant={actionColors[entry.action] as 'success' | 'info' | 'warning' | 'critical' | 'teal' | 'purple' | 'secondary' || 'secondary'} className="text-[10px] px-1.5 py-0">
                    {actionLabels[entry.action] ?? entry.action}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{formatRelativeDate(entry.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
