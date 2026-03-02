import { useState } from 'react'
import { Button } from '@/components/ui/button'

import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BatchEntryRow, BatchEntryData } from './BatchEntryRow'
import { mockSuppliers } from '@/data/mockSuppliers'
import { mockItems } from '@/data/mockItems'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, ChevronRight, Package, Layers, ClipboardCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

type Step = 1 | 2 | 3

const STEP_LABELS = ['Select Item & Supplier', 'Enter Batch Details', 'Review & Confirm']

interface StepIndicatorProps {
  current: Step
}

function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {STEP_LABELS.map((label, i) => {
        const step = (i + 1) as Step
        const isCompleted = current > step
        const isActive = current === step
        return (
          <div key={step} className="flex items-center gap-2">
            <div className={cn(
              'flex items-center gap-2 text-sm',
              isActive && 'text-primary font-medium',
              isCompleted && 'text-muted-foreground',
              !isActive && !isCompleted && 'text-muted-foreground'
            )}>
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2',
                isActive && 'border-primary bg-primary text-primary-foreground',
                isCompleted && 'border-primary bg-primary text-primary-foreground',
                !isActive && !isCompleted && 'border-muted-foreground/30'
              )}>
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
            )}
          </div>
        )
      })}
    </div>
  )
}

function createEmptyBatch(): BatchEntryData {
  return {
    id: crypto.randomUUID(),
    batchNumber: '',
    quantity: '',
    unitCost: '',
    expiryDate: '',
    storageLocation: '',
    invoiceNumber: '',
  }
}

interface ReceiveStockFormProps {
  onSuccess?: () => void
}

export function ReceiveStockForm({ onSuccess }: ReceiveStockFormProps) {
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)

  // Step 1
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')

  // Step 2
  const [batches, setBatches] = useState<BatchEntryData[]>([createEmptyBatch()])

  function handleBatchChange(id: string, field: keyof BatchEntryData, value: string) {
    setBatches(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b))
  }

  function addBatch() {
    setBatches(prev => [...prev, createEmptyBatch()])
  }

  function removeBatch(id: string) {
    setBatches(prev => prev.filter(b => b.id !== id))
  }

  function handleSubmit() {
    setSubmitted(true)
    onSuccess?.()
  }

  const itemName = mockItems.find(i => i.id === selectedItem)?.name ?? selectedItem
  const supplierName = mockSuppliers.find(s => s.id === selectedSupplier)?.name ?? selectedSupplier
  const totalQty = batches.reduce((sum, b) => sum + Number(b.quantity || 0), 0)
  const totalCost = batches.reduce((sum, b) => sum + (Number(b.quantity || 0) * Number(b.unitCost || 0)), 0)

  if (submitted) {
    return (
      <Card>
        <CardContent className="py-16 text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-teal-600 mx-auto" />
          <h2 className="text-xl font-semibold">Stock Received Successfully</h2>
          <p className="text-muted-foreground">
            {batches.length} batch(es) of <strong>{itemName}</strong> have been recorded.
          </p>
          <Button onClick={() => { setSubmitted(false); setStep(1); setSelectedItem(''); setSelectedSupplier(''); setBatches([createEmptyBatch()]) }}>
            Receive Another
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <StepIndicator current={step} />

      {step === 1 && (
        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Package className="h-4 w-4" />
              Step 1 — Select Item &amp; Supplier
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="item">Item *</Label>
              <Select value={selectedItem} onValueChange={setSelectedItem}>
                <SelectTrigger id="item">
                  <SelectValue placeholder="Select an inventory item..." />
                </SelectTrigger>
                <SelectContent>
                  {mockItems.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="supplier">Supplier *</Label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger id="supplier">
                  <SelectValue placeholder="Select a supplier..." />
                </SelectTrigger>
                <SelectContent>
                  {mockSuppliers.map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedItem || !selectedSupplier}
              >
                Next: Batch Details
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Layers className="h-4 w-4" />
              Step 2 — Enter Batch Details
            </div>
            <div className="space-y-3">
              {batches.map((batch, i) => (
                <BatchEntryRow
                  key={batch.id}
                  entry={batch}
                  index={i}
                  canRemove={batches.length > 1}
                  onChange={handleBatchChange}
                  onRemove={removeBatch}
                />
              ))}
            </div>
            <Button type="button" variant="outline" onClick={addBatch} className="w-full">
              + Add Another Batch
            </Button>
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button
                onClick={() => setStep(3)}
                disabled={batches.some(b => !b.batchNumber || !b.quantity)}
              >
                Next: Review
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <ClipboardCheck className="h-4 w-4" />
              Step 3 — Review &amp; Confirm
            </div>
            <div className="bg-muted/40 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Item</span>
                <span className="font-medium">{itemName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Supplier</span>
                <span className="font-medium">{supplierName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Batches</span>
                <span className="font-medium">{batches.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Qty Received</span>
                <span className="font-medium">{totalQty}</span>
              </div>
              {totalCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Cost</span>
                  <span className="font-medium">₱{totalCost.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Batches</p>
              {batches.map((b, i) => (
                <div key={b.id} className="text-sm flex justify-between border-b pb-1 last:border-0">
                  <span className="text-muted-foreground">#{i + 1} {b.batchNumber}</span>
                  <span>{b.quantity} units {b.expiryDate && `— exp. ${b.expiryDate}`}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handleSubmit}>
                Confirm Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
