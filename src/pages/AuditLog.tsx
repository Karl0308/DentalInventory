import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import { AuditLogTable } from '@/components/audit/AuditLogTable'
import { mockAuditLog } from '@/data/mockAuditLog'
import { ActorRole } from '@/types/audit.types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AUDIT_ACTIONS } from '@/lib/constants'
import { Search } from 'lucide-react'

const ROLES: ActorRole[] = ['Dentist', 'Assistant', 'Admin', 'System']

export default function AuditLog() {
  const [search, setSearch] = useState('')
  const [actionFilter, setActionFilter] = useState('All')
  const [roleFilter, setRoleFilter] = useState('All')

  const filtered = mockAuditLog.filter(entry => {
    const matchesSearch =
      search === '' ||
      entry.actorName.toLowerCase().includes(search.toLowerCase()) ||
      entry.targetName.toLowerCase().includes(search.toLowerCase()) ||
      entry.description.toLowerCase().includes(search.toLowerCase())
    const matchesAction = actionFilter === 'All' || entry.action === actionFilter
    const matchesRole = roleFilter === 'All' || entry.actorRole === roleFilter
    return matchesSearch && matchesAction && matchesRole
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Log"
        description="Complete history of all inventory actions and system events."
      />

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search actor, target, description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Actions</SelectItem>
            {AUDIT_ACTIONS.map(a => (
              <SelectItem key={a} value={a}>{a.replace(/_/g, ' ')}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Roles</SelectItem>
            {ROLES.map(r => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground ml-auto">
          {filtered.length} of {mockAuditLog.length} entries
        </span>
      </div>

      <AuditLogTable entries={filtered} />
    </div>
  )
}
