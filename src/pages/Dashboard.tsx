import { Package, AlertTriangle, CalendarX, Activity } from 'lucide-react'
import StatsCard from '@/components/dashboard/StatsCard'
import ExpiryAlertBanner from '@/components/dashboard/ExpiryAlertBanner'
import LowStockWidget from '@/components/dashboard/LowStockWidget'
import RecentActivityFeed from '@/components/dashboard/RecentActivityFeed'
import InventoryByCategory from '@/components/dashboard/InventoryByCategory'
import StockTrendChart from '@/components/dashboard/StockTrendChart'
import { mockItems } from '@/data/mockItems'
import { useAlerts } from '@/hooks/useAlerts'
import { mockBatches } from '@/data/mockBatches'
import { getDaysUntilExpiry } from '@/lib/dateUtils'

export default function Dashboard() {
  const { activeCount, criticalCount } = useAlerts()

  const totalItems = mockItems.length
  const inStockItems = mockItems.filter(i => i.status === 'In Stock').length
  const lowStockItems = mockItems.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length
  const expiringBatches = mockBatches.filter(b => b.expiryDate && getDaysUntilExpiry(b.expiryDate) <= 30 && getDaysUntilExpiry(b.expiryDate) >= 0).length

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">Inventory overview — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <ExpiryAlertBanner />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Items"
          value={totalItems}
          subtitle="Across all categories"
          icon={<Package className="h-6 w-6" />}
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
        />
        <StatsCard
          title="In Stock"
          value={inStockItems}
          subtitle={`${lowStockItems} items need attention`}
          icon={<Activity className="h-6 w-6" />}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Expiring Soon"
          value={expiringBatches}
          subtitle="Batches within 30 days"
          icon={<CalendarX className="h-6 w-6" />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          trend={{ value: 'Requires immediate attention', positive: false }}
        />
        <StatsCard
          title="Active Alerts"
          value={activeCount}
          subtitle={`${criticalCount} critical`}
          icon={<AlertTriangle className="h-6 w-6" />}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        <div className="xl:col-span-2">
          <StockTrendChart />
        </div>
        <div>
          <InventoryByCategory />
        </div>
      </div>

      {/* Widgets Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <LowStockWidget />
        <RecentActivityFeed />
      </div>
    </div>
  )
}
