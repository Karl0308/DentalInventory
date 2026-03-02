import { differenceInDays, format, parseISO } from 'date-fns'

export function getDaysUntilExpiry(expiryDate: string): number {
  return differenceInDays(parseISO(expiryDate), new Date())
}

export function getExpiryStatus(daysUntilExpiry: number): 'expired' | 'critical' | 'warning' | 'ok' {
  if (daysUntilExpiry < 0) return 'expired'
  if (daysUntilExpiry <= 7) return 'critical'
  if (daysUntilExpiry <= 30) return 'warning'
  return 'ok'
}

export function formatDisplayDate(isoString: string): string {
  return format(parseISO(isoString), 'MMM d, yyyy')
}

export function formatDisplayDateTime(isoString: string): string {
  return format(parseISO(isoString), 'MMM d, yyyy h:mm a')
}

export function formatRelativeDate(isoString: string): string {
  const days = differenceInDays(new Date(), parseISO(isoString))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return format(parseISO(isoString), 'MMM d, yyyy')
}
