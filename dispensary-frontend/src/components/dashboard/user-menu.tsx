import { useState } from 'react'
import { useMeQuery } from '@/lib/graphql/generated/graphql'
import { useAuth } from '@/hooks/use-auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

function getInitials(fullName?: string | null, email?: string | null) {
  if (fullName) {
    const parts = fullName.trim().split(/\s+/)
    const first = parts[0]?.[0] ?? ''
    const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
    return (first + last).toUpperCase()
  }
  return email?.[0]?.toUpperCase() ?? '?'
}

export function UserMenu() {
  const { data } = useMeQuery()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  const user = data?.me
  const initials = getInitials(user?.fullName, user?.email)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<button className="flex items-center gap-2 outline-none" />}>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-brand text-white text-xs font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-2">
        <p className="text-sm text-ink/60 px-2 py-1.5">
          {user?.fullName ?? user?.email}
        </p>
        <div className="h-px bg-sage my-1" />
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-600 hover:text-red-600 hover:bg-red-50"
          onClick={() => {
            setOpen(false)
            logout()
          }}
        >
          <LogOut className="size-4" />
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  )
}