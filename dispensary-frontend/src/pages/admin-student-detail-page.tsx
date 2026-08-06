import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useAllStudentsQuery,
  useHealthRecordsByStudentQuery,
  useCreateHealthRecordMutation,
  useAllMedicinesQuery,
  useDispenseMedicineMutation,
  HealthRecordsByStudentDocument,
  AllMedicinesDocument,
} from '@/lib/graphql/generated/graphql'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toastSuccess, toastError } from '@/lib/toast'

export function AdminStudentDetailPage() {
  const { studentId } = useParams<{ studentId: string }>()
  const { data: studentsData } = useAllStudentsQuery()
  const student = studentsData?.allStudents?.find((s) => s?.id === studentId)

  const { data: recordsData, loading: recordsLoading } = useHealthRecordsByStudentQuery({
    variables: { studentId: studentId ?? '' },
    skip: !studentId,
  })
  const records = recordsData?.healthRecordsByStudent ?? []

  const { data: medicinesData } = useAllMedicinesQuery()
  const medicines = medicinesData?.allMedicines ?? []

  const [recordDialogOpen, setRecordDialogOpen] = useState(false)
  const [diagnosis, setDiagnosis] = useState('')
  const [treatmentNotes, setTreatmentNotes] = useState('')

  const [createHealthRecord, { loading: creating }] = useCreateHealthRecordMutation({
    refetchQueries: studentId ? [{ query: HealthRecordsByStudentDocument, variables: { studentId } }] : [],
  })

  const [dispenseForRecordId, setDispenseForRecordId] = useState<string | null>(null)
  const [selectedMedicineId, setSelectedMedicineId] = useState('')
  const [quantity, setQuantity] = useState('')

  const [dispenseMedicine, { loading: dispensing }] = useDispenseMedicineMutation({
    refetchQueries: [{ query: AllMedicinesDocument }],
  })

  async function handleCreateRecord() {
    if (!studentId || !diagnosis.trim()) {
      toastError('Enter a diagnosis')
      return
    }

    try {
      const { data } = await createHealthRecord({
        variables: { studentId, diagnosis, treatmentNotes },
      })
      if (data?.createHealthRecord?.success) {
        toastSuccess('Visit recorded')
        setDiagnosis('')
        setTreatmentNotes('')
        setRecordDialogOpen(false)
      } else {
        toastError(data?.createHealthRecord?.errors?.[0] ?? 'Could not create record')
      }
    } catch (err) {
      console.error('Create health record error:', err)
      const message = err instanceof Error ? err.message : 'Could not create record'
      toastError(message)
    }
  }

  function openDispense(recordId: string) {
    setDispenseForRecordId(recordId)
    setSelectedMedicineId('')
    setQuantity('')
  }

  async function handleDispense() {
    if (!dispenseForRecordId || !selectedMedicineId || !quantity || Number(quantity) <= 0) {
      toastError('Select a medicine and enter a valid quantity')
      return
    }

    try {
      const { data } = await dispenseMedicine({
        variables: {
          medicineId: selectedMedicineId,
          quantity: Number(quantity),
          healthRecordId: dispenseForRecordId,
        },
      })
      if (data?.dispenseMedicine?.success) {
        toastSuccess('Medicine dispensed for this visit')
        setDispenseForRecordId(null)
      } else {
        toastError(data?.dispenseMedicine?.errors?.[0] ?? 'Could not dispense')
      }
    } catch (err) {
      console.error('Dispense error:', err)
      const message = err instanceof Error ? err.message : 'Could not dispense'
      toastError(message)
    }
  }

  if (!student) {
    return <p className="text-sm text-ink/50">Loading student...</p>
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">{student.admissionNumber}</h1>
        <p className="text-sm text-ink/60">{student.user.fullName} · {student.user.email}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <Card>
          <CardContent className="pt-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-ink/50">Guardian</span>
              <span className="text-ink">{student.guardianName || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/50">Guardian phone</span>
              <span className="text-ink">{student.guardianPhone || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/50">Known allergies</span>
              <span className="text-ink">{student.knownAllergies || '—'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-display text-lg">Visit history</CardTitle>
          <Dialog open={recordDialogOpen} onOpenChange={setRecordDialogOpen}>
            <DialogTrigger render={<Button size="sm" className="bg-brand hover:bg-brand-deep" />}>
              Record visit
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Record a visit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  label="Diagnosis"
                  id="diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Common cold"
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-ink" htmlFor="treatmentNotes">
                    Treatment notes
                  </label>
                  <Textarea
                    id="treatmentNotes"
                    value={treatmentNotes}
                    onChange={(e) => setTreatmentNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateRecord} disabled={creating} className="bg-brand hover:bg-brand-deep">
                  {creating ? 'Saving...' : 'Save visit'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-3">
          {recordsLoading && <p className="text-sm text-ink/50">Loading...</p>}
          {!recordsLoading && records.length === 0 && (
            <p className="text-sm text-ink/50">No visits recorded yet.</p>
          )}
          {records.map((record) => (
            <div key={record?.id} className="border border-sage rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">{record?.diagnosis}</p>
                  <p className="text-xs text-ink/60">{record?.treatmentNotes}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => openDispense(record!.id)}>
                  Dispense medicine
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={Boolean(dispenseForRecordId)} onOpenChange={(v) => !v && setDispenseForRecordId(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Dispense medicine</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-ink" htmlFor="dispenseMedicine">
                Medicine
              </label>
              <Select value={selectedMedicineId} onValueChange={(v) => setSelectedMedicineId(v ?? '')}>
                <SelectTrigger id="dispenseMedicine" className="w-full">
                  <SelectValue placeholder="Select medicine" />
                </SelectTrigger>
                <SelectContent>
                  {medicines.map((medicine) => (
                    <SelectItem key={medicine?.id} value={medicine?.id ?? ''}>
                      {medicine?.name} ({medicine?.quantityInStock} {medicine?.unit} in stock)
                      {medicine?.isLowStock ? ' — low stock' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              label="Quantity"
              id="dispenseQuantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
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