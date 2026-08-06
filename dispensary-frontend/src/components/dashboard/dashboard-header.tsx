import { useMeQuery } from '@/lib/graphql/generated/graphql'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

function getInitials(fullName?: string | null, email?: string | null) {
  if (fullName) {
    const parts = fullName.trim().split(/\s+/)
    const first = parts[0]?.[0] ?? ''
    const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
    return (first + last).toUpperCase()
  }
  return email?.[0]?.toUpperCase() ?? '?'
}

export function DashboardHeader() {
  const { data } = useMeQuery()
  const { logout } = useAuth()

  const user = data?.me
  const initials = getInitials(user?.fullName, user?.email)

  return (
    <header className="border-b border-sage bg-white">
      <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="font-display text-xl font-semibold text-ink">
          Student Dispensary
        </span>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-brand text-white text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <Button  variant="outline" onClick={logout}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}