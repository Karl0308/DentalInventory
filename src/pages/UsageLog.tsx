import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import { UsageLogTable } from '@/components/usage/UsageLogTable'
import { UsageSummaryCard } from '@/components/usage/UsageSummaryCard'
import { LogUsageDialog } from '@/components/usage/LogUsageDialog'
import { mockUsage } from '@/data/mockUsage'
import { UsageLogEntry } from '@/types/usage.types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search } from 'lucide-react'
import { PROCEDURE_TYPES } from '@/lib/constants'

export default function UsageLog() {
  const [entries] = useState<UsageLogEntry[]>(mockUsage)
  const [search, setSearch] = useState('')
  const [procedureFilter, setProcedureFilter] = useState('All')
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = entries.filter(e => {
    const matchesSearch =
      search === '' ||
      e.itemName.toLowerCase().includes(search.toLowerCase()) ||
      e.patientCode.toLowerCase().includes(search.toLowerCase()) ||
      e.staffName.toLowerCase().includes(search.toLowerCase()) ||
      e.batchNumber.toLowerCase().includes(search.toLowerCase())
    const matchesProcedure = procedureFilter === 'All' || e.procedure === procedureFilter
    return matchesSearch && matchesProcedure
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usage Log"
        description="Track consumption of dental supplies by procedure and staff."
        actions={
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Log Usage
          </Button>
        }
      />

      <UsageSummaryCard entries={entries} />

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search item, batch, patient, staff..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={procedureFilter} onValueChange={setProcedureFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Procedures" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Procedures</SelectItem>
            {PROCEDURE_TYPES.map(p => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground ml-auto">
          {filtered.length} of {entries.length} entries
        </span>
      </div>

      <UsageLogTable entries={filtered} />

      <LogUsageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
