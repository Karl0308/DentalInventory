import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Package, PackagePlus, ClipboardList,
  Bell, BarChart3, ShieldCheck, Truck, Settings,
  Cross, Tag, MapPin, ListChecks
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

interface SidebarProps {
  collapsed: boolean
}

export default function Sidebar({ collapsed }: SidebarProps) {
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
        { label: 'Items', to: '/management/items', icon: <ListChecks className="h-4 w-4" /> },
        { label: 'Categories', to: '/management/categories', icon: <Tag className="h-4 w-4" /> },
        { label: 'Locations', to: '/management/locations', icon: <MapPin className="h-4 w-4" /> },
        { label: 'Suppliers', to: '/suppliers', icon: <Truck className="h-4 w-4" /> },
        { label: 'Audit Log', to: '/audit-log', icon: <ShieldCheck className="h-4 w-4" /> },
      ],
    },
  ]

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <aside className={cn(
      'h-full bg-white border-r border-border flex flex-col transition-all duration-300 shrink-0',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className={cn(
        'flex items-center h-16 border-b border-border',
        collapsed ? 'justify-center' : 'gap-2.5 px-5'
      )}>
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Cross className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-sm text-foreground leading-none">DentaStock</p>
            <p className="text-xs text-muted-foreground mt-0.5">Inventory System</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navGroups.map((group, gi) => (
          <div key={group.title} className="mb-4">
            {!collapsed ? (
              <p className="text-[10px] font-semibold text-muted-foreground tracking-widest px-3 mb-1.5">
                {group.title}
              </p>
            ) : (
              gi > 0 && <Separator className="mb-2 mx-1" />
            )}
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center rounded-md text-sm font-medium transition-colors mb-0.5',
                  collapsed ? 'justify-center py-2.5 px-0' : 'gap-3 px-3 py-2',
                  isActive(item.to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <span className="relative shrink-0">
                  {item.icon}
                  {collapsed && item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </span>
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <Badge variant="critical" className="h-5 min-w-5 text-[10px] px-1.5">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}

        <Separator className="my-2" />

        <NavLink
          to="/settings"
          title={collapsed ? 'Settings' : undefined}
          className={cn(
            'flex items-center rounded-md text-sm font-medium transition-colors',
            collapsed ? 'justify-center py-2.5 px-0' : 'gap-3 px-3 py-2',
            isActive('/settings')
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </nav>
    </aside>
  )
}
