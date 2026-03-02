import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockAlerts } from '@/data/mockAlerts'

import { Button } from '@/components/ui/button'

export default function ExpiryAlertBanner() {
  const [dismissed, setDismissed] = useState(false)
  const navigate = useNavigate()

  const criticalExpiry = mockAlerts.filter(
    a => a.type === 'Expiry' && a.severity === 'Critical' && a.status === 'Active'
  )

  if (dismissed || criticalExpiry.length === 0) return null

  return (
    <div className="flex items-center justify-between gap-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-red-800">
            {criticalExpiry.length} item{criticalExpiry.length > 1 ? 's' : ''} expiring within 14 days
          </p>
          <p className="text-xs text-red-600 mt-0.5">
            {criticalExpiry.map(a => `${a.itemName} (${a.daysUntilExpiry}d)`).join(' • ')}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-red-700 border-red-300 hover:bg-red-100 text-xs" onClick={() => navigate('/alerts')}>
          View Alerts
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-100" onClick={() => setDismissed(true)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
