import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Package, PackagePlus, ClipboardList,
  Bell, BarChart3, ShieldCheck, Truck, Settings,
  Cross, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { useAlerts } from '@/hooks/useAlerts'
import { Separator } from '@/components/ui/separator'

interface NavItem {
  label: string
  to: string
  icon: React.ReactNode
  badge?: number
}

interface NavGroup {
  title: string
  items: NavItem[]
}

export default function Sidebar() {
  const { activeCount } = useAlerts()
  const location = useLocation()

  const navGroups: NavGroup[] = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', to: '/', icon: <LayoutDashboard className="h-4 w-4" /> },
      ],
    },
    {
      title: 'INVENTORY',
      items: [
        { label: 'Inventory List', to: '/inventory', icon: <Package className="h-4 w-4" /> },
        { label: 'Receive Stock', to: '/receive-stock', icon: <PackagePlus className="h-4 w-4" /> },
        { label: 'Usage Log', to: '/usage-log', icon: <ClipboardList className="h-4 w-4" /> },
      ],
    },
    {
      title: 'MONITORING',
      items: [
        { label: 'Alerts', to: '/alerts', icon: <Bell className="h-4 w-4" />, badge: activeCount },
        { label: 'Reports', to: '/reports', icon: <BarChart3 className="h-4 w-4" /> },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { label: 'Audit Log', to: '/audit-log', icon: <ShieldCheck className="h-4 w-4" /> },
        { label: 'Suppliers', to: '/suppliers', icon: <Truck className="h-4 w-4" /> },
      ],
    },
  ]

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <aside className="w-64 h-full bg-white border-r border-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Cross className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="font-bold text-sm text-foreground leading-none">DentaStock</p>
          <p className="text-xs text-muted-foreground mt-0.5">Inventory System</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest px-3 mb-1.5">
              {group.title}
            </p>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors mb-0.5',
                  isActive(item.to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <Badge variant="critical" className="h-5 min-w-5 text-[10px] px-1.5">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            ))}
          </div>
        ))}

        <Separator className="my-2" />

        <NavLink
          to="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
            isActive('/settings')
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* User */}
      <Separator />
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
          AR
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">Dr. Ana Reyes</p>
          <p className="text-xs text-muted-foreground">Admin</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </aside>
  )
}
