import { useMyProfileQuery } from '@/lib/graphql/generated/graphql'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { ProfileCard } from '@/components/dashboard/profile-card'
import { ReportSymptomCard } from '@/components/dashboard/report-symptom-card'
import { SymptomsList } from '@/components/dashboard/symptoms-list'
import { HealthRecordsList } from '@/components/dashboard/health-records-list'

export function DashboardPage() {
  const { data } = useMyProfileQuery()
  const hasProfile = Boolean(data?.myProfile)

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <ProfileCard />
          {hasProfile && <ReportSymptomCard />}
        </div>
        {hasProfile && (
          <div className="grid md:grid-cols-2 gap-6">
            <SymptomsList />
            <HealthRecordsList />
          </div>
        )}
      </main>
    </div>
  )
}