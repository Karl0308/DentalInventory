import { useState, useMemo } from 'react'
import { mockAuditLog } from '@/data/mockAuditLog'
import { AuditAction, ActorRole } from '@/types/audit.types'

interface AuditFilters {
  search: string
  action: AuditAction | 'All'
  role: ActorRole | 'All'
}

export function useAuditLog() {
  const [filters, setFilters] = useState<AuditFilters>({
    search: '',
    action: 'All',
    role: 'All',
  })

  const filtered = useMemo(() => {
    return mockAuditLog.filter(entry => {
      const matchesSearch =
        entry.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        entry.actorName.toLowerCase().includes(filters.search.toLowerCase()) ||
        entry.targetName.toLowerCase().includes(filters.search.toLowerCase())
      const matchesAction = filters.action === 'All' || entry.action === filters.action
      const matchesRole = filters.role === 'All' || entry.actorRole === filters.role
      return matchesSearch && matchesAction && matchesRole
    })
  }, [filters])

  return { entries: filtered, filters, setFilters }
}
