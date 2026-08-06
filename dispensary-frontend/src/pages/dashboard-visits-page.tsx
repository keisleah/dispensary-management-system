import { HealthRecordsList } from '@/components/dashboard/health-records-list'

export function DashboardVisitsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Visit history</h1>
        <p className="text-sm text-ink/60">Every dispensary visit and what was recorded</p>
      </div>

      <HealthRecordsList />
    </div>
  )
}