import { useMyProfileQuery } from '@/lib/graphql/generated/graphql'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateProfileCard } from '@/components/dashboard/create-profile-card'
import { EditProfileDialog } from '@/components/dashboard/edit-profile-dialog'

export function ProfileCard() {
  const { data, loading } = useMyProfileQuery()
  const profile = data?.myProfile

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-ink/50">Loading profile...</p>
        </CardContent>
      </Card>
    )
  }

  if (!profile) {
    return <CreateProfileCard />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-display text-xl">{profile.admissionNumber}</CardTitle>
        <EditProfileDialog profile={profile} />
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-ink/50">Date of birth</span>
          <span className="text-ink">{profile.dateOfBirth || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink/50">Gender</span>
          <span className="text-ink">{profile.gender || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink/50">Guardian</span>
          <span className="text-ink">{profile.guardianName || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink/50">Guardian phone</span>
          <span className="text-ink">{profile.guardianPhone || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink/50">Known allergies</span>
          <span className="text-ink">{profile.knownAllergies || '—'}</span>
        </div>
      </CardContent>
    </Card>
  )
}