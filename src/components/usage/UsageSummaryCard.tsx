import { UsageLogEntry } from '@/types/usage.types'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingDown, Users, Stethoscope, Package } from 'lucide-react'

interface UsageSummaryCardProps {
  entries: UsageLogEntry[]
}

export function UsageSummaryCard({ entries }: UsageSummaryCardProps) {
  const totalEntries = entries.length
  const uniqueItems = new Set(entries.map(e => e.itemId)).size
  const uniqueStaff = new Set(entries.map(e => e.staffId)).size
  const uniqueProcedures = new Set(entries.map(e => e.procedure)).size

  const stats = [
    { label: 'Total Entries', value: totalEntries, icon: TrendingDown, color: 'text-teal-600' },
    { label: 'Items Used', value: uniqueItems, icon: Package, color: 'text-blue-600' },
    { label: 'Staff Members', value: uniqueStaff, icon: Users, color: 'text-purple-600' },
    { label: 'Procedures', value: uniqueProcedures, icon: Stethoscope, color: 'text-orange-600' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map(stat => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
