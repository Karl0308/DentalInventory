import { useNavigate } from 'react-router-dom'
import { mockItems } from '@/data/mockItems'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PackageX, ArrowRight } from 'lucide-react'

export default function LowStockWidget() {
  const navigate = useNavigate()
  const lowItems = mockItems.filter(i => i.status === 'Critical' || i.status === 'Low Stock' || i.status === 'Out of Stock')

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <PackageX className="h-4 w-4 text-red-500" />
            Low Stock Items
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs text-primary h-7" onClick={() => navigate('/inventory')}>
            View all <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {lowItems.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">All items are well-stocked</p>
        ) : (
          <div className="space-y-3">
            {lowItems.slice(0, 6).map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.subcategory} • {item.storageLocation}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold text-foreground">
                    {item.currentStock} <span className="text-xs text-muted-foreground font-normal">{item.unit}</span>
                  </span>
                  <Badge variant={item.status === 'Critical' || item.status === 'Out of Stock' ? 'critical' : 'warning'} className="text-[10px]">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
