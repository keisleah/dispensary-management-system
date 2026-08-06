import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useMeQuery } from '@/lib/graphql/generated/graphql'
import { useAuthStore } from '@/stores/auth-store'

interface AdminRouteProps {
  children: ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const token = useAuthStore((state) => state.token)
  const { data, loading } = useMeQuery({ skip: !token })

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-ink/50">Loading...</div>
  }

  if (data?.me?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}