import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts'
import { MonthlyConsumption } from '@/types/report.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ConsumptionChartProps {
  data: MonthlyConsumption[]
  type?: 'bar' | 'line'
}

export function ConsumptionChart({ data, type = 'bar' }: ConsumptionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Monthly Stock Movement</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="received" name="Received" fill="#14b8a6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="consumed" name="Consumed" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="received" name="Received" stroke="#14b8a6" strokeWidth={2} dot />
              <Line type="monotone" dataKey="consumed" name="Consumed" stroke="#3b82f6" strokeWidth={2} dot />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
