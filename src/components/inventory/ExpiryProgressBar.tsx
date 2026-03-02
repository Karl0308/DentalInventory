import { Progress } from '@/components/ui/progress'
import { getDaysUntilExpiry, getExpiryStatus, formatDisplayDate } from '@/lib/dateUtils'
import { cn } from '@/lib/utils'

interface ExpiryProgressBarProps {
  expiryDate: string | null
  showLabel?: boolean
}

export default function ExpiryProgressBar({ expiryDate, showLabel = true }: ExpiryProgressBarProps) {
  if (!expiryDate) {
    return <span className="text-xs text-muted-foreground">N/A</span>
  }

  const days = getDaysUntilExpiry(expiryDate)
  const status = getExpiryStatus(days)


  const maxDays = 365
  const progress = status === 'expired' ? 0 : Math.min((days / maxDays) * 100, 100)

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs mb-1">
          <span className={cn(
            'font-medium',
            status === 'expired' ? 'text-rose-600' :
            status === 'critical' ? 'text-red-600' :
            status === 'warning' ? 'text-amber-600' : 'text-muted-foreground'
          )}>
            {status === 'expired' ? `Expired ${Math.abs(days)}d ago` : `${days}d left`}
          </span>
          <span className="text-muted-foreground">{formatDisplayDate(expiryDate)}</span>
        </div>
      )}
      <Progress
        value={progress}
        className={cn('h-1.5 [&>div]:transition-none', {
          '[&>div]:bg-rose-600': status === 'expired',
          '[&>div]:bg-red-500': status === 'critical',
          '[&>div]:bg-amber-400': status === 'warning',
          '[&>div]:bg-teal-500': status === 'ok',
        })}
      />
    </div>
  )
}
