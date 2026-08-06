import { AuthLayout } from '@/components/auth/auth-layout'
import { LoginForm } from '@/components/auth/login-form'

export function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Student portal"
      title="Every visit, remembered."
      description="Sign in to report symptoms, track visits to the dispensary, and see what was prescribed and when."
    >
      <LoginForm />
    </AuthLayout>
  )
}