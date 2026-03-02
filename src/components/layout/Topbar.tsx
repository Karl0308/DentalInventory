import { Bell, Search, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAlerts } from '@/hooks/useAlerts'
import { useAuth } from '@/context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/inventory': 'Inventory List',
  '/receive-stock': 'Receive Stock',
  '/usage-log': 'Usage Log',
  '/alerts': 'Alerts',
  '/reports': 'Reports',
  '/audit-log': 'Audit Log',
  '/suppliers': 'Suppliers',
  '/settings': 'Settings',
  '/management/items': 'Manage Items',
  '/management/categories': 'Manage Categories',
  '/management/locations': 'Manage Locations',
}

export default function Topbar() {
  const { activeCount } = useAlerts()
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const title = Object.entries(pageTitles).find(([path]) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  )?.[1] ?? 'DentaStock'

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 shrink-0">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search inventory..." className="pl-8 w-56 h-9 text-sm" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => navigate('/alerts')}
        >
          <Bell className="h-5 w-5" />
          {activeCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </Button>

        {/* User avatar + name */}
        <div className="flex items-center gap-2 ml-1">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
            {user?.initials ?? '?'}
          </div>
          <div className="hidden md:block text-sm leading-tight">
            <p className="font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          title="Sign out"
        >
          <LogOut className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </header>
  )
}
