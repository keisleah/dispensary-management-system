import { ReportSymptomCard } from '@/components/dashboard/report-symptom-card'
import { SymptomsList } from '@/components/dashboard/symptoms-list'

export function DashboardSymptomsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Symptoms</h1>
        <p className="text-sm text-ink/60">Report new symptoms and track their status</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <ReportSymptomCard />
        <SymptomsList />
      </div>
    </div>
  )
}