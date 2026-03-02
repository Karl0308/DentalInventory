import PageHeader from '@/components/layout/PageHeader'
import { ReceiveStockForm } from '@/components/stock/ReceiveStockForm'

export default function ReceiveStock() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Receive Stock"
        description="Record incoming inventory from suppliers using the 3-step form below."
      />
      <div className="max-w-2xl">
        <ReceiveStockForm />
      </div>
    </div>
  )
}
