import { useState } from 'react'
import {
  usePendingSymptomsQuery,
  useCreateHealthRecordMutation,
  useAttendSymptomMutation,
  useAllMedicinesQuery,
  useDispenseMedicineMutation,
  PendingSymptomsDocument,
  AllMedicinesDocument,
} from '@/lib/graphql/generated/graphql'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
} from '@/components/ui/dialog'
import { toastSuccess, toastError } from '@/lib/toast'

export function AdminSymptomsPage() {
  const { data, loading } = usePendingSymptomsQuery()
  const symptoms = data?.pendingSymptoms ?? []

  const { data: medicinesData } = useAllMedicinesQuery()
  const medicines = medicinesData?.allMedicines ?? []

  const [activeSymptomId, setActiveSymptomId] = useState<string | null>(null)
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null)
  const [diagnosis, setDiagnosis] = useState('')
  const [treatmentNotes, setTreatmentNotes] = useState('')
  const [wantsToDispense, setWantsToDispense] = useState(false)
  const [selectedMedicineId, setSelectedMedicineId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [step, setStep] = useState<'diagnose' | 'saving'>('diagnose')

  const [createHealthRecord] = useCreateHealthRecordMutation()
  const [dispenseMedicine] = useDispenseMedicineMutation({
    refetchQueries: [{ query: AllMedicinesDocument }],
  })
  const [attendSymptom] = useAttendSymptomMutation({
    refetchQueries: [{ query: PendingSymptomsDocument }],
  })

  const selectedMedicine = medicines.find((m) => m?.id === selectedMedicineId)
  const selectedMedicineLabel = selectedMedicine
    ? `${selectedMedicine.name} (${selectedMedicine.quantityInStock} ${selectedMedicine.unit} in stock)${
        selectedMedicine.isLowStock ? ' — low stock' : ''
      }`
    : undefined

  function openAttend(symptomId: string, studentId: string) {
    setActiveSymptomId(symptomId)
    setActiveStudentId(studentId)
    setDiagnosis('')
    setTreatmentNotes('')
    setWantsToDispense(false)
    setSelectedMedicineId('')
    setQuantity('')
    setStep('diagnose')
  }

  function closeDialog() {
    setActiveSymptomId(null)
    setActiveStudentId(null)
  }

  async function handleAttend() {
    if (!activeSymptomId || !activeStudentId || !diagnosis.trim()) {
      toastError('Enter a diagnosis')
      return
    }

    if (wantsToDispense && (!selectedMedicineId || !quantity || Number(quantity) <= 0)) {
      toastError('Select a medicine and enter a valid quantity, or turn off dispensing')
      return
    }

    setStep('saving')

    try {
      const { data: recordData } = await createHealthRecord({
        variables: { studentId: activeStudentId, diagnosis, treatmentNotes },
      })

      const healthRecordId = recordData?.createHealthRecord?.healthRecord?.id
      if (!recordData?.createHealthRecord?.success || !healthRecordId) {
        toastError(recordData?.createHealthRecord?.errors?.[0] ?? 'Could not create visit record')
        setStep('diagnose')
        return
      }

      if (wantsToDispense) {
        const { data: dispenseData } = await dispenseMedicine({
          variables: {
            medicineId: selectedMedicineId,
            quantity: Number(quantity),
            healthRecordId,
          },
        })

        if (!dispenseData?.dispenseMedicine?.success) {
          toastError(dispenseData?.dispenseMedicine?.errors?.[0] ?? 'Visit saved, but dispensing failed')
          setStep('diagnose')
          return
        }
      }

      const { data: attendData } = await attendSymptom({
        variables: { symptomId: activeSymptomId, healthRecordId },
      })

      if (attendData?.attendSymptom?.success) {
        toastSuccess(wantsToDispense ? 'Diagnosed, dispensed, and marked attended' : 'Symptom attended')
        closeDialog()
      } else {
        toastError(attendData?.attendSymptom?.errors?.[0] ?? 'Could not mark symptom attended')
        setStep('diagnose')
      }
    } catch (err) {
      console.error('Attend symptom error:', err)
      const message = err instanceof Error ? err.message : 'Could not complete this action'
      toastError(message)
      setStep('diagnose')
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Symptoms queue</h1>
        <p className="text-sm text-ink/60">Pending symptom reports from students</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-3">
          {loading && <p className="text-sm text-ink/50">Loading...</p>}
          {!loading && symptoms.length === 0 && (
            <p className="text-sm text-ink/50">No pending symptoms.</p>
          )}
          {symptoms.map((symptom) => (
            <div
              key={symptom?.id}
              className="border border-sage rounded-lg p-4 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-ink">
                    {symptom?.student.user.fullName}
                  </span>
                  <Badge variant="secondary">{symptom?.severity}</Badge>
                </div>
                <p className="text-sm text-ink/70">{symptom?.description}</p>
                <p className="text-xs text-ink/40">{symptom?.student.admissionNumber}</p>
              </div>
              <Button
                size="sm"
                className="bg-brand hover:bg-brand-deep shrink-0"
                onClick={() => openAttend(symptom!.id, symptom!.student.id)}
              >
                Attend
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={Boolean(activeSymptomId)} onOpenChange={(v) => !v && closeDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Attend symptom</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              label="Diagnosis"
              id="attendDiagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Common cold"
            />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-ink" htmlFor="attendNotes">
                Treatment notes
              </label>
              <Textarea
                id="attendNotes"
                value={treatmentNotes}
                onChange={(e) => setTreatmentNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="border-t border-sage pt-4 space-y-3">
              <button
                type="button"
                onClick={() => setWantsToDispense((v) => !v)}
                className="flex items-center gap-2 text-sm font-medium text-ink"
              >
                <span
                  className={`h-4 w-4 rounded border flex items-center justify-center ${
                    wantsToDispense ? 'bg-brand border-brand' : 'border-sage'
                  }`}
                >
                  {wantsToDispense && <span className="h-2 w-2 rounded-sm bg-white" />}
                </span>
                Dispense medicine for this visit
              </button>

              {wantsToDispense && (
                <div className="space-y-3 pl-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-ink" htmlFor="attendMedicine">
                      Medicine
                    </label>
                    <Select value={selectedMedicineId} onValueChange={(v) => setSelectedMedicineId(v ?? '')}>
                      <SelectTrigger id="attendMedicine" className="w-full">
                        <SelectValue placeholder="Select medicine">
                          {selectedMedicineLabel}
                        </SelectValue>
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
                    id="attendQuantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleAttend} disabled={step === 'saving'} className="bg-brand hover:bg-brand-deep">
              {step === 'saving' ? 'Saving...' : 'Save and mark attended'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}