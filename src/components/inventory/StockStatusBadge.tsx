import { Badge } from '@/components/ui/badge'
import { StockStatus } from '@/types/inventory.types'
import { cn } from '@/lib/utils'

interface StockStatusBadgeProps {
  status: StockStatus
  className?: string
}

const statusConfig: Record<StockStatus, { variant: 'success' | 'warning' | 'critical' | 'secondary' | 'outline'; label: string }> = {
  'In Stock': { variant: 'success', label: 'In Stock' },
  'Low Stock': { variant: 'warning', label: 'Low Stock' },
  'Critical': { variant: 'critical', label: 'Critical' },
  'Out of Stock': { variant: 'secondary', label: 'Out of Stock' },
  'Expired': { variant: 'outline', label: 'Expired' },
}

export default function StockStatusBadge({ status, className }: StockStatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge variant={config.variant} className={cn('text-xs', className)}>
      {config.label}
    </Badge>
  )
}
