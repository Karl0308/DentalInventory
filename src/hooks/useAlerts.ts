import { useMemo } from 'react'
import { mockAlerts } from '@/data/mockAlerts'
import { AlertStatus, AlertType } from '@/types/alert.types'

export function useAlerts(statusFilter?: AlertStatus, typeFilter?: AlertType) {
  const filtered = useMemo(() => {
    return mockAlerts.filter(a => {
      const matchesStatus = !statusFilter || a.status === statusFilter
      const matchesType = !typeFilter || a.type === typeFilter
      return matchesStatus && matchesType
    })
  }, [statusFilter, typeFilter])

  const activeCount = mockAlerts.filter(a => a.status === 'Active').length
  const criticalCount = mockAlerts.filter(a => a.severity === 'Critical' && a.status === 'Active').length
  const warningCount = mockAlerts.filter(a => a.severity === 'Warning' && a.status === 'Active').length
  const infoCount = mockAlerts.filter(a => a.severity === 'Info' && a.status === 'Active').length

  return { alerts: filtered, allAlerts: mockAlerts, activeCount, criticalCount, warningCount, infoCount }
}
