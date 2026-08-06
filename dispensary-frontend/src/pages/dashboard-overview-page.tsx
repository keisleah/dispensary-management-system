import { useMyProfileQuery } from '@/lib/graphql/generated/graphql'
import { ProfileCard } from '@/components/dashboard/profile-card'
import { ReportSymptomCard } from '@/components/dashboard/report-symptom-card'

export function DashboardOverviewPage() {
  const { data } = useMyProfileQuery()
  const hasProfile = Boolean(data?.myProfile)

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Overview</h1>
        <p className="text-sm text-ink/60">Your profile and quick actions</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ProfileCard />
        {hasProfile && <ReportSymptomCard />}
      </div>
    </div>
  )
}