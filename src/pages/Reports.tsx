
import PageHeader from '@/components/layout/PageHeader'
import { ConsumptionChart } from '@/components/reports/ConsumptionChart'
import { ExpiryReport } from '@/components/reports/ExpiryReport'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  monthlyConsumption,
  categoryBreakdown,
  topConsumedItems,
  byProcedureConsumption,
  expiryReportItems,
} from '@/data/mockReports'
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer

} from 'recharts'
import { Download, TrendingDown, PieChartIcon, AlertTriangle, Stethoscope, Package } from 'lucide-react'



export default function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Inventory analytics, consumption trends, and expiry reports."
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        }
      />

      <Tabs defaultValue="consumption">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="consumption" className="flex items-center gap-1.5">
            <TrendingDown className="h-3.5 w-3.5" />
            Consumption
          </TabsTrigger>
          <TabsTrigger value="category" className="flex items-center gap-1.5">
            <PieChartIcon className="h-3.5 w-3.5" />
            By Category
          </TabsTrigger>
          <TabsTrigger value="top-items" className="flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5" />
            Top Items
          </TabsTrigger>
          <TabsTrigger value="by-procedure" className="flex items-center gap-1.5">
            <Stethoscope className="h-3.5 w-3.5" />
            By Procedure
          </TabsTrigger>
          <TabsTrigger value="expiry" className="flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" />
            Expiry
          </TabsTrigger>
        </TabsList>

        {/* Consumption Tab */}
        <TabsContent value="consumption" className="mt-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Received (6 mo)', value: monthlyConsumption.reduce((s, m) => s + m.received, 0) },
              { label: 'Total Consumed (6 mo)', value: monthlyConsumption.reduce((s, m) => s + m.consumed, 0) },
              { label: 'Net Stock Change', value: monthlyConsumption.reduce((s, m) => s + m.received - m.consumed, 0) },
            ].map(stat => (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <ConsumptionChart data={monthlyConsumption} type="bar" />
          <ConsumptionChart data={monthlyConsumption} type="line" />
        </TabsContent>

        {/* Category Tab */}
        <TabsContent value="category" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Inventory by Category</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                  >
                    {categoryBreakdown.map((entry) => (
                      <Cell key={entry.category} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 min-w-[180px]">
                {categoryBreakdown.map(c => (
                  <div key={c.category} className="flex items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                      <span>{c.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{c.count}</span>
                      <Badge variant="outline">{c.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Top Items Tab */}
        <TabsContent value="top-items" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Consumed Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topConsumedItems.map((item, i) => (
                  <div key={item.itemName} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.itemName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} {item.unit} — ₱{item.totalCost.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="w-32">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{ width: `${(item.quantity / topConsumedItems[0].quantity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* By Procedure Tab */}
        <TabsContent value="by-procedure" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Consumption by Procedure</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={byProcedureConsumption}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="label" type="category" tick={{ fontSize: 12 }} width={120} />
                  <Tooltip />
                  <Bar dataKey="value" name="Units Used" fill="#14b8a6" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expiry Tab */}
        <TabsContent value="expiry" className="mt-4">
          <ExpiryReport items={expiryReportItems} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
