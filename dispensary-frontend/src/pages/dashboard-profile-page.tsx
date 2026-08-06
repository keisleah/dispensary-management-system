import { ProfileCard } from '@/components/dashboard/profile-card'

export function DashboardProfilePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Profile</h1>
        <p className="text-sm text-ink/60">Your admission and guardian details</p>
      </div>

      <ProfileCard />
    </div>
  )
}