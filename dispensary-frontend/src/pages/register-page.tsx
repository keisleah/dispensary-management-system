import { AuthLayout } from '@/components/auth/auth-layout'
import { RegisterForm } from '@/components/auth/register-form'

export function RegisterPage() {
  return (
    <AuthLayout
      eyebrow="Student portal"
      title="Your health record, in one place."
      description="Create an account to start logging symptoms and keep a running history of every dispensary visit."
    >
      <RegisterForm />
    </AuthLayout>
  )
}