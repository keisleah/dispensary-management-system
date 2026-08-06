import { useState } from 'react'
import {
  useAllMedicinesQuery,
  useCreateMedicineMutation,
  useDispenseMedicineMutation,
  AllMedicinesDocument,
} from '@/lib/graphql/generated/graphql'
import { Card, CardContent} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toastSuccess, toastError } from '@/lib/toast'

export function AdminInventoryPage() {
  const { data, loading } = useAllMedicinesQuery()
  const medicines = data?.allMedicines ?? []

  const [addOpen, setAddOpen] = useState(false)
  const [name, setName] = useState('')
  const [quantityInStock, setQuantityInStock] = useState('')
  const [unit, setUnit] = useState('')
  const [reorderLevel, setReorderLevel] = useState('')

  const [createMedicine, { loading: creating }] = useCreateMedicineMutation({
    refetchQueries: [{ query: AllMedicinesDocument }],
  })

  const [dispenseOpen, setDispenseOpen] = useState<string | null>(null)
  const [quantity, setQuantity] = useState('')

  const [dispenseMedicine, { loading: dispensing }] = useDispenseMedicineMutation({
    refetchQueries: [{ query: AllMedicinesDocument }],
  })

  async function handleCreateMedicine() {
    if (!name.trim()) {
      toastError('Enter a medicine name')
      return
    }

    try {
      const { data: result } = await createMedicine({
        variables: {
          name,
          quantityInStock: quantityInStock ? Number(quantityInStock) : undefined,
          unit,
          reorderLevel: reorderLevel ? Number(reorderLevel) : undefined,
        },
      })
      if (result?.createMedicine?.success) {
        toastSuccess('Medicine added')
        setName('')
        setQuantityInStock('')
        setUnit('')
        setReorderLevel('')
        setAddOpen(false)
      } else {
        toastError(result?.createMedicine?.errors?.[0] ?? 'Could not add medicine')
      }
    } catch (err) {
      console.error('Create medicine error:', err)
      const message = err instanceof Error ? err.message : 'Could not add medicine'
      toastError(message)
    }
  }

  async function handleDispense() {
    if (!dispenseOpen || !quantity || Number(quantity) <= 0) {
      toastError('Enter a valid quantity')
      return
    }

    try {
      const { data: result } = await dispenseMedicine({
        variables: { medicineId: dispenseOpen, quantity: Number(quantity) },
      })
      if (result?.dispenseMedicine?.success) {
        toastSuccess('Medicine dispensed')
        setQuantity('')
        setDispenseOpen(null)
      } else {
        toastError(result?.dispenseMedicine?.errors?.[0] ?? 'Could not dispense')
      }
    } catch (err) {
      console.error('Dispense error:', err)
      const message = err instanceof Error ? err.message : 'Could not dispense'
      toastError(message)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Inventory</h1>
          <p className="text-sm text-ink/60">Medicine stock and dispensing</p>
        </div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger render={<Button className="bg-brand hover:bg-brand-deep" />}>
            Add medicine
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">Add medicine</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input label="Name" id="medName" value={name} onChange={(e) => setName(e.target.value)} />
              <Input
                label="Quantity in stock"
                id="medQty"
                type="number"
                value={quantityInStock}
                onChange={(e) => setQuantityInStock(e.target.value)}
              />
              <Input
                label="Unit"
                id="medUnit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="tablets, ml, bottles"
              />
              <Input
                label="Reorder level"
                id="medReorder"
                type="number"
                value={reorderLevel}
                onChange={(e) => setReorderLevel(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleCreateMedicine} disabled={creating} className="bg-brand hover:bg-brand-deep">
                {creating ? 'Saving...' : 'Add medicine'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          {loading && <p className="text-sm text-ink/50">Loading...</p>}
          {!loading && medicines.length === 0 && (
            <p className="text-sm text-ink/50">No medicines added yet.</p>
          )}

          {medicines.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead />
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicines.map((medicine) => (
                  <TableRow key={medicine?.id}>
                    <TableCell className="font-medium">{medicine?.name}</TableCell>
                    <TableCell>{medicine?.quantityInStock}</TableCell>
                    <TableCell>{medicine?.unit}</TableCell>
                    <TableCell>
                      {medicine?.isLowStock && <Badge variant="destructive">Low stock</Badge>}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDispenseOpen(medicine!.id)}
                      >
                        Dispense
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(dispenseOpen)} onOpenChange={(v) => !v && setDispenseOpen(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Dispense medicine</DialogTitle>
          </DialogHeader>
          <Input
            label="Quantity"
            id="dispenseQty"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleDispense} disabled={dispensing} className="bg-brand hover:bg-brand-deep">
              {dispensing ? 'Dispensing...' : 'Dispense'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}